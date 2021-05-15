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
        let styleUrls =[]
        await page.on('response', async response => {
          const matches = /.*\.(css)$/.exec(response.url())
          if(matches != null){styleUrls.push(matches[0])}
        });
        await page.goto(url,{waitUntil: 'networkidle0', timeout:10000})

        let allStyles ={}
        async function markFix(){
          return new Promise(async (resolve, reject)=>{
            try {
               (async function(){
                for await(let link of styleUrls){
                  logger.log("navigating to", link)
             let tab = await browser.newPage().catch(err => {logger.error(err);return})
             await tab.goto(link, {waitUntil: "networkidle0", timeout:5000}).catch(err=> logger.error(err))
                  let rawStyle = await tab.$eval('pre', elm => elm.innerText)
                  let lastIndex = 0
                  for(let i =0; i < rawStyle.length; i++){
                    let char = rawStyle[i]
                    let brackets = 0
                    switch(char){
                    case '{':
                      brackets++
                      break;
                    case '}':
                      brackets--
                      if(brackets == 0){
                        let rule = rawStyle.slice(lastIndex, i).trim()
                        let selector = rule.slice(0,rule.indexOf('{')).trim()
                        if(selector.includes('@')){
                          logger.log(selector, rule)
                        }
                        let style = rule.slice(rule.indexOf('{')+1).split(';').map(e => e+= ';')
                        style
                        if (allStyles[selector]){
                          allStyles[selector] = [...allStyles[selector],...style]
                        } else {
                          allStyles[selector] = style
                        }
                        lastIndex = i+1
                      }
                      break;
                    }
                  }
                  await tab.close()
              }
               })();
            resolve()
          } catch (error) {
            reject(error)
          }
        })
        }

        res.send({
          message: 'Looks like we found ' + styleUrls.length + ' style sheets, we are compiling them, this will take about ' +(styleUrls.length * 3) + ' seconds',
        })
        // SECTION wait for tabs
        await markFix()
        logger.log('waiting', styleUrls.length* 3)
        await page.waitForTimeout(styleUrls.length * 3000)
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
