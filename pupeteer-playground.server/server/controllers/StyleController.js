import puppeteer from 'puppeteer';
import socketService from '../services/SocketService';
import BaseController from '../utils/BaseController';
import { calculatePercent, hexCode, urlCheck } from '../utils/Cleaners';
import { logger } from '../utils/Logger';

const chromeOptions = {headless: true, defaultViewport: null,   args: [
  "--incognito",
  "--no-sandbox",
]}

export class StyleController extends BaseController {
  constructor() {
    super('api/style')
    logger.log('style controller registered')
    this.router
      .put('/sheet', this.getStyleSheet)
      .put('/color', this.getColors)
  }
  async getStyleSheet(req, res, next) {
    try {
      logger.log('steal style', req.body.url)
        let url = urlCheck(req.body.url)
        let socketRoom = req.body.socketRoom
        const browser = await puppeteer.launch(chromeOptions);
        const page = await browser.newPage();
        page.on('console', msg => console.log('PAGE LOG:', msg.text));
        await page.goto(url,{waitUntil: 'networkidle0', timeout:30000})
        let allStyles = await page.evaluate(async ()=>{
            let elementNames = ["div", "body","a", "b", "p", "h1", "h2","h3","h4","h5", "span", "ul", "li", "button", "article", "main", "header", "footer"] // Put all the tags you want colors for here

            let elementStyles= []
            let sheets = document.styleSheets
            for(let i =0; i < sheets.length; i++){
              let sheet = sheets[i]
              for (let j = 0; j < sheet.cssRules.length; j++){
                let rule = sheet.cssRules[j]
                elementStyles.push(rule.cssText)
              }
            }

            // elementNames.forEach( function(tagName) {
            //   let tags = document.querySelectorAll(tagName);
            //   tags.forEach(elm => {
            //     let styles = elm.classList
            //     for(let key in styles){
            //       let style = styles[key]
            //       elementStyles.push({[style]: document.styleSheets})
            //     }
            //   })
            //   });
              return elementStyles
            })

        res.send({
          message: 'Looks like we found some classes, we are compiling them, this will take about FIXME seconds', allStyles
        })
        // SECTION wait for tabs
        await page.waitForTimeout( 3000)
        logger.warn(allStyles)
        socketService.messageRoom(socketRoom, 'style:sheet', allStyles)
        socketService.messageRoom(socketRoom, 'action:done')
        // grab stylesheets
        browser.close()
    } catch (error) {
      next(error)
    }
  }

  async getColors(req,res, next){
try {
  logger.log('steal site style', req.body.url)
        let url = urlCheck(req.body.url)
        let socketRoom = req.body.socketRoom
        const browser = await puppeteer.launch(chromeOptions);
        const page = await browser.newPage();
        await page.goto(url, {waitUntil: 'networkidle0', timeout:30000}).catch(err => {logger.log(err), browser.close()})
        let elements = await page.evaluate(()=>{
          let elementNames = ["div", "body","a", "b", "p", "h1", "h2","h3","h4","h5", "span", "ul", "li", "button", "article", "main", "header", "footer"] // Put all the tags you want colors for here
          let elementStyles= {}
          elementNames.forEach( function(tagName) {
            let tags = document.querySelectorAll(tagName);
            tags.forEach(elm => {
              let styles = getComputedStyle(elm)
              for(let key in styles){
                let style = styles[key]
                if( style == 'background-color' || style == 'color') {
                  let color = styles.getPropertyValue(style)
                  if(elementStyles[color] ){
                    elementStyles[color] += 1
                  } else {
                    elementStyles[color] = 1
                  }
                }
              }
            })
            });
            return elementStyles
          })
          logger.log(elements)
          elements = hexCode(elements)
          elements = calculatePercent(elements)
          logger.warn(elements)
          browser.close()
          res.send({message: 'done', colors: elements})
          socketService.messageRoom(socketRoom, 'style:colors', elements)
          socketService.messageRoom(socketRoom, 'action:done')
} catch (error) {
  next(error)
}
  }
}
