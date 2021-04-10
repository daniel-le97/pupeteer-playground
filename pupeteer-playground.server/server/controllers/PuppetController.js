import puppeteer from 'puppeteer';
import { stlService } from '../services/SaveLocalService';
import socketService from '../services/SocketService';
import BaseController from '../utils/BaseController';
import { logger } from '../utils/Logger';
const fs = require('fs')
const path = require('path')



// cleans urls
function _cleanUrl(str){
  let staged = str.split('://')[1].split('.')
  return staged[0] + '.' + staged[1]
}
function _urlCheck(str =''){
  let out = str.startsWith('https://',0)
  return out ? str : 'https://'+ str
}
function _cleanPath(str=''){
  let out = ''
  if(str[0] != '/') out += '/' + str
  if(!str.endsWith('/')) out += '/'
  return out
}


export class PuppetController extends BaseController {
  constructor() {
    logger.log('puppet controller registered')
    super('api/puppet')
    this.router
      .put('', this.getSiteImage)
      .put('/scrape', this.scrapeImages)
  }

  async getSiteImage(req, res, next){
    try {
      let url = _urlCheck(req.body.url)
      let filePath = _cleanPath(req.body.filePath)
      const browser = await puppeteer.launch({headless: false, defaultViewport: null,   args: [
        '--window-size=1920,1080',
      ]});
      const page = await browser.newPage();
      await page.goto(url);
      page.waitForTimeout(5000)
      await page.evaluate(() => document.body.style.background = 'transparent')
      await page.screenshot({ path: filePath + _cleanUrl(url) +'.png', fullPage: true, omitBackground: true});
      await browser.close();
      res.send('screen shot of ' + url + ' taken')
    } catch (error) {
     next(error)
    }
  }

  async scrapeImages(req, res,next ){
    try {
      let filePath = _cleanPath(req.body.filePath)
      let url = _urlCheck(req.body.url)
      let socketRoom = req.body.socketRoom
      let imagesSaved = []
      let imagesFailed = []
        const browser = await puppeteer.launch({headless: true, defaultViewport: null,   args: [
          '--window-size=1920,1080',
        ]});
        const page = await browser.newPage();


        // Get images from resources
        let rtImages = []
        await page.on('response', async response => {
          const matches = /.*\.(jpg|png|svg|gif)$/.exec(response.url());
          if (matches != null) {
            // logger.log(matches[0])
           rtImages.push(matches[0])
          }
      });

      await page.goto(url, {waitUntil: 'networkidle0'});
      await page.evaluate(() => {
        return Promise.resolve(window.scrollTo(0,document.body.scrollHeight));
    });
      await page.waitForTimeout(2000)
      // logger.log("rtImages",rtImages)

        // Get images
        const images = await page.evaluate(() => Array.from(document.images, e =>  e.src));
        // logger.log("srcImages",images)
        images.forEach(i => socketService.messageRoom(socketRoom, 'found:image', i))
        //SECTION Get Background images
    const bgImages = await page.evaluate(()=>{
      let elementNames = ["div", "body"] // Put all the tags you want bg images for here
      let backgroundURLs = new Array();
      elementNames.forEach( function(tagName) {
        let tags = document.querySelectorAll(tagName);
      for (let i = 0; i < tags.length; i++) {
         let tag = getComputedStyle(tags[i]);
         if (tag.background.match('url')) {
           let bg = tag.background;
             backgroundURLs.push(bg.substr(bg.indexOf("url") + 5, bg.lastIndexOf(")") - (bg.indexOf("url") + 6) ) );
            }
          }
        });
        return backgroundURLs
      })

//SECTION Get Images from links (thumbnail grab)
let imageLinks = await page.evaluate(()=> {
  let tags = new Array()
  document.querySelectorAll('a').forEach(a => tags.push(a))
  tags = tags.filter( l => {
    let hasThumb = l.querySelector('img')
    return hasThumb != null ? true: false
  })
  let links = []
  tags.forEach(t =>{
    if(t.href.includes('http')) links.push(t.href)
  })
  return links
})

logger.log("thumbs",imageLinks)
let openTabs = imageLinks.length

async function markFix(){
  return new Promise(async (resolve, reject)=>{
    try {
     let thumbImages = [];
       (async function(){
        for await(let link of imageLinks){
          logger.log("navigating to", link)
     let tab = await browser.newPage()
     await tab.goto(link, {waitUntil: "networkidle0"}).catch(err=> console.log(err))
     await tab.waitForTimeout(500)
     let images = await tab.evaluate(() => Array.from(document.images, e => {return {url: e.src, height: e.height, width: e.width}}));
     if(images == undefined) return
     logger.log("linked images", images)
     let bigImage = ''
     let maxSize = 0
     images.forEach(image => {
       if ((image.width * image.height) >= maxSize){
         bigImage = image.url
         maxSize = image.width * image.height
        }
      })
      if(maxSize > 180000)thumbImages.push(bigImage)
      logger.log("big image",maxSize,bigImage)
      await tab.close()
      openTabs--
      logger.log("remaining tabs", openTabs)
        }

       })();
    resolve(thumbImages)
  } catch (error) {
    reject(error)
  }
})
}

let thumbImages = await markFix()
logger.log("Waitng for",(openTabs * 6)/60, 'minutes')
await page.waitForTimeout((openTabs * 6000))
logger.log("all big pictures",thumbImages)
logger.log("browser pages",openTabs)


      // logger.log(images,bgImages)
      let allImages = [...images, ...bgImages,...thumbImages]
      for (let i = 0; i < allImages.length; i++) {
        let image = await stlService.download(allImages[i],_cleanUrl(url), filePath, i)
        if(image.status == 'ok') {imagesSaved.push(image)}else{
          imagesFailed.push(image)
        }
    }
    await browser.close();
    res.send({downloadedImages: imagesSaved, failedImages:imagesFailed, resourceImages: rtImages})
  } catch (error) {
    next(error)
  }
  }
}
