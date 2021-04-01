import puppeteer from 'puppeteer';
import { stlService } from '../services/SaveLocalService';
import BaseController from '../utils/BaseController';
import { logger } from '../utils/Logger';
const fs = require('fs')



// cleans urls
function _cleanUrl(str){
  let staged = str.split('://')[1].split('.')
  return staged[0] + '.' + staged[1]
}
function _urlCheck(str =''){
  let out = str.startsWith('http://',0)
  return out ? str : 'http://'+ str
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
      let imagesSaved = []
      let imagesFailed = []
        const browser = await puppeteer.launch({headless: true, defaultViewport: null,   args: [
          '--window-size=1920,1080',
        ]});
        const page = await browser.newPage();
        await page.goto(url);
        await page.waitForTimeout(5000)


        // Get images
        const images = await page.evaluate(() => Array.from(document.images, e => e.src));
        // Get Background images
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

      logger.log(images,bgImages)
      let allImages = [...images, ...bgImages]
      for (let i = 0; i < allImages.length; i++) {
        let image = await stlService.download(allImages[i],_cleanUrl(url), filePath, i)
        if(image.status == 'ok') {imagesSaved.push(image)}else{
          imagesFailed.push(image)
        }
    }
    await browser.close();
    res.send({downloadedImages: imagesSaved, failedImages:imagesFailed})
  } catch (error) {
    next(error)
  }
  }
}
