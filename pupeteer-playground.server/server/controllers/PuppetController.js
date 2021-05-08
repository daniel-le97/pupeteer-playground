import puppeteer from 'puppeteer';
import { stlService } from '../services/SaveLocalService';
import socketService from '../services/SocketService';
import BaseController from '../utils/BaseController';
import { logger } from '../utils/Logger';
const fs = require('fs')
const path = require('path')

const chromeOptions = {headless: true, defaultViewport: null,   args: [
  "--incognito",
  "--no-sandbox",
  '--disable-setuid-sandbox',
  "--no-zygote"
]}



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
  if(!str.endsWith('/')) out += '/'
  return out
}


export class PuppetController extends BaseController {
  constructor() {
    logger.log('puppet controller registered')
    super('api/puppet')
    this.router
      .put('', this.getSiteImage)
      .put('/scrape/images', this.scrapeImageTags)
      .put('/scrape/backgrounds', this.scrapeBackgrounds)
      .put('/scrape/thumbnails', this.scrapeThumbnails)
  }

  async getSiteImage(req, res, next){
    try {
      let url = _urlCheck(req.body.url)
      let filePath = _cleanPath(req.body.filePath)
      const browser = await puppeteer.launch(chromeOptions);
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



  async scrapeImageTags(req,res,next){
    logger.log('image tags', req.body.url)
    let filePath = _cleanPath(req.body.filePath)
      let url = _urlCheck(req.body.url)
      let socketRoom = req.body.socketRoom
      const browser = await puppeteer.launch(chromeOptions);
      const page = await browser.newPage();
       // SECTION Get images from resources
       let rtImages = []
       await page.on('response', async response => {
         const matches = /.*\.(jpg|png|svg|gif)$/.exec(response.url());
         if (matches != null && !rtImages.includes(matches[0])) {
          rtImages.push(matches[0])
         }
     });
     await page.goto(url, {waitUntil: 'networkidle0'});
     await page.evaluate(() => {
       return Promise.resolve(window.scrollTo(0,document.body.scrollHeight));
   });
     await page.waitForTimeout(2000)
       // Get images
       let images = await page.evaluate(() => Array.from(document.images, e =>  e.src));
       images = images.filter(i => i.includes('http'))
       res.send({message: "We found some images", count: images.length, resources: rtImages})
        browser.close()
        // Downloading
       for (let i = 0; i < images.length; i++) {
        let image = await stlService.download(images[i],_cleanUrl(url), filePath, i)
        socketService.messageRoom(socketRoom, 'download:image', image)
    }
    socketService.messageRoom(socketRoom, 'action:done', {})
  }
  //--------------------------------------------------------------------------

  async scrapeBackgrounds(req, res,next){
    logger.log('backgrounds', req.body.url)
    let filePath = _cleanPath(req.body.filePath)
    let url = _urlCheck(req.body.url)
    let socketRoom = req.body.socketRoom
    const backgroundBrowser = await puppeteer.launch(chromeOptions);
    const page = await backgroundBrowser.newPage();

   await page.goto(url, {waitUntil: 'networkidle0'});
   await page.evaluate(() => {
     return Promise.resolve(window.scrollTo(0,document.body.scrollHeight));
 });
   await page.waitForTimeout(2000)
     // Get images
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
     res.send({message: "We found some background images", count: bgImages.length})
     backgroundBrowser.close()
      // Downloading
     for (let i = 0; i < bgImages.length; i++) {
      let image = await stlService.download(bgImages[i],_cleanUrl(url), filePath, i)
      socketService.messageRoom(socketRoom, 'download:image', image)
  }
  socketService.messageRoom(socketRoom, 'action:done', {})
 }


 async scrapeThumbnails(req, res, next){
  logger.log('thumbnails', req.body.url)
  let filePath = _cleanPath(req.body.filePath)
  let url = _urlCheck(req.body.url)
  let socketRoom = req.body.socketRoom
  const thumbBrowser = await puppeteer.launch(chromeOptions);
  const page = await thumbBrowser.newPage();
  await page.goto(url)

  let imageLinks = await page.evaluate(()=> {
    let tags = new Array()
    document.querySelectorAll('a').forEach(a => tags.push(a))
    tags = tags.filter( l => {
      let hasThumb = l.querySelector('img')
      return hasThumb != null ? true: false
    })
    let links = []
    tags.forEach(t =>{
      if(t.href.includes('http') && !links.includes(t.href)) links.push(t.href)
    })
    return links
  })
  let openTabs = imageLinks.length
  async function markFix(){
    return new Promise(async (resolve, reject)=>{
      try {
         (async function(){
          for await(let link of imageLinks){
            logger.log("navigating to", link)
       let tab = await thumbBrowser.newPage().catch(err => {logger.error(err);return})
       await tab.goto(link, {waitUntil: "networkidle0", timeout:5000}).catch(err=> logger.error(err))
       let images = await tab.evaluate(() => Array.from(document.images, e => {return {url: e.src, height: e.height, width: e.width}}));
       if(!images) continue
       let bigImage = ''
       let maxSize = 0
       images.forEach(image => {
         if ((image.width * image.height) >= maxSize){
           bigImage = image.url
           maxSize = image.width * image.height
          }
        })
        if(maxSize > 180000){
          let image = await stlService.download(bigImage,_cleanUrl(url), filePath, imageLinks.indexOf(link))
          socketService.messageRoom(socketRoom, 'download:image', image)
        }
        await tab.close()
        await page.waitForTimeout(200)
        openTabs--
        logger.log("remaining tabs", openTabs)
        if(openTabs <= 0){
          socketService.messageRoom(socketRoom, 'action:done', {})
          page.close()
          thumbBrowser.close()
          }
        }

         })();
      resolve()
    } catch (error) {
      reject(error)
    }
  })
  }

  res.send({
    message: 'Looks like we found some thumbnails for larger images. Crawling these will take appoximately ' +(openTabs * 3)/60 + ' minutes',
    count: imageLinks.length
  })
  // SECTION wait for tabs
  await markFix()
  logger.warn("Waitng for",(openTabs * 6)/60, 'minutes')
  await page.waitForTimeout((openTabs * 6000)).catch(err => logger.error(err))
  logger.warn("times up closing browser")
  thumbBrowser.close()
  socketService.messageRoom(socketRoom, 'action:done', {})
}



  async scrapeImages(req, res,next ){
    try {
      let filePath = _cleanPath(req.body.filePath)
      let url = _urlCheck(req.body.url)
      let socketRoom = req.body.socketRoom
      let imagesSaved = []
      let imagesFailed = []
        const browser = await puppeteer.launch(chromeOptions);
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
    if(t.href.includes('http') && !links.includes(t.href)) links.push(t.href)
  })
  return links
})

logger.log("thumbs",imageLinks.length)
let openTabs = imageLinks.length

async function markFix(){
  return new Promise(async (resolve, reject)=>{
    try {
     let thumbImages = [];
       (async function(){
        for await(let link of imageLinks){
          logger.log("navigating to", link)
     let tab = await browser.newPage()
     await tab.goto(link, {waitUntil: "networkidle0", timeout:3000}).catch(err=> console.log(err))
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
      if(maxSize > 180000){
        thumbImages.push(bigImage)
        logger.log("big image",maxSize,bigImage)
      }
      tab.close()
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

res.send({
  message: 'Looks like we found '+ imageLinks.length + images.length + bgImages.length + 'images crawling, the download proccess will take appoximately ' +(openTabs * 3)/60 + ' minutes'
})
// SECTION wait for tabs
let thumbImages = await markFix()
logger.log("Waitng for",(openTabs * 3)/60, 'minutes')
await page.waitForTimeout((openTabs * 3000))


      // logger.log(images,bgImages)
      let allImages = [...images, ...bgImages,...thumbImages]
      for (let i = 0; i < allImages.length; i++) {
        logger.log("downloading")
        let image = await stlService.download(allImages[i],_cleanUrl(url), filePath, i)
        if(image.status == 'ok') {imagesSaved.push(image)}else{
          imagesFailed.push(image)
        }
    }
    await browser.close();
    logger.log("done")
  } catch (error) {
    next(error)
  }
  }
}
