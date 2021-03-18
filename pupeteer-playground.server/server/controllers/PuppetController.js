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
      let url = req.body.url
      let filePath = req.body.filePath
      const browser = await puppeteer.launch({headless: false, defaultViewport: null,   args: [
        '--window-size=1920,1080',
      ]});
      const page = await browser.newPage();
      await page.goto(url);
      page.waitForTimeout(5000)
      await page.evaluate(() => document.body.style.background = 'transparent')
      await page.screenshot({ path: '/Users/beast/Pictures/puppeteer/'+ _cleanUrl(url) +'.png', fullPage: true, omitBackground: true});
      await browser.close();
      res.send('screen shot of ' + url + ' taken')
    } catch (error) {
     next(error)
    }
  }

  async scrapeImages(req, res,next ){
      let filePath = req.body.filePath
      let url = req.body.url
      let imageCount = 0
      const browser = await puppeteer.launch({headless: false, defaultViewport: null,   args: [
      '--window-size=1920,1080',
    ]});
    const page = await browser.newPage();

    await page.goto(url);
    const images = await page.evaluate(() => Array.from(document.images, e => e.src));


    for (let i = 0; i < images.length; i++) {
      logger.log(images[i])
      imageCount += await stlService.download(images[i],_cleanUrl(url), i)
    }

    await browser.close();
    res.send('downloaded ' + imageCount + ' images from '+ url)
  }



}
