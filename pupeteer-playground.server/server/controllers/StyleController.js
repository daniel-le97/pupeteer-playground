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
        // get all rawStyleSheets as page loads from network resources
        await page.on('response', async response => {
          const matches = /.*\.(css)$/.exec(response.url())
          if(matches != null){styleUrls.push(matches[0])}
        });
        await page.goto(url,{waitUntil: 'networkidle0', timeout:30000})
        let allRules = {}

        // compile all style sheets
        async function markFix(){
          return new Promise(async (resolve, reject)=>{
            try {
               (async function(){
                for await(let link of styleUrls){
                  logger.log("navigating to", link)
             let tab = await browser.newPage().catch(err => {logger.error(err);return})
             await tab.goto(link, {waitUntil: "networkidle0", timeout:5000}).catch(err=> logger.error(err))
                  let rawStyle = await tab.$eval('pre', elm => elm.innerText)
                  let flattener = /\/\*[^*]*\*+([^/*][^*]*\*+)*\/|[\n]|[\t]|[\r]/g // ----- escape /, escape *, [anything but *], any number of times, escape * at least once,([anything but /*][anything but *]anynumber of times), escape /, more than once
                  let styleFlat = rawStyle.replace(flattener, '')
                  let brackets = 0
                  let lastIndex = 0
                  for( let i= 0; i < styleFlat.length; i++){
                  let char = styleFlat[i]
                  switch(char){
                    case '{':
                    brackets++
                    break;
                    case '}':
                    brackets--
                    if(brackets == 0){
                      let rawRule = styleFlat.slice(lastIndex, i+1)
                      let openBracket = rawRule.indexOf('{')
                      let selector = rawRule.slice(0, openBracket).trim()
                      let rules = []
                      if(selector[0]!= '@'){
                      rules = rawRule.slice(openBracket+1, rawRule.length-1).split(';').map(e => e.trim()+ ';').filter(e => e!= ';')
                      } else {
                        console.log(rawRule)
                        rules = rawRule.slice(openBracket+1, rawRule.length-1).split('}').map(e => e.trim()+'}').filter(e => e!= '}')
                      }
                      allRules[selector] = rules
                      lastIndex = i+1
                      }
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
        await page.waitForTimeout(styleUrls.length* 3000)

        // get all classes
        let elementClasses = await page.evaluate(async ()=>{
            const allTags = ["div", "body","a", "b", "p", "h1", "h2","h3","h4","h5", "span", "ul", "li","ol", "button", "article", "main", "header", "footer"]
            // sorts out un-used html tags
            let elementNames = allTags.map(t => {
              if( document.getElementsByTagName(t).length > 0){
                return t
              }
            })

            // Class selectors on elements
            let selectors = []
            elementNames.forEach(elem => {
              let elems = document.getElementsByTagName(elem)
              for(let i = 0; i < elems.length; i++){
                selectors=[...elems[i].classList, ...selectors]
              }
            })
            // mashes all into one array, keeps #(id targets) and @(media/ animation rules)
            return [...selectors.map(s => '.' + s), ...elementNames]
            })
            logger.log('element classes',elementClasses)

        // SECTION wait for tabs
        await page.waitForTimeout( 3000)

        // filters and formats all the css into only the used css in the DOM (currently from tag name and classes)
        let usedClasses = {}
        for (let key in allRules){
          // only adds the class as a used class if the full class name(key) starts with the class selector (i)
          if (elementClasses.find(i => key.startsWith(i))){
            usedClasses[key] = allRules[key]
          }
        }
        logger.warn('all rules',Object.keys(allRules).length,allRules )
        logger.log('classes actual',Object.keys(usedClasses).length,usedClasses)
        socketService.messageRoom(socketRoom, 'style:sheet', usedClasses)
        socketService.messageRoom(socketRoom, 'action:done')
        // grab stylesheets
        browser.close()
    } catch (error) {
      next(error)
    }
  }


  // SECTION get colors
  async getColors(req,res, next){
try {
  logger.log('steal site style', req.body.url, req.query)
        let url = urlCheck(req.body.url)
        let socketRoom = req.body.socketRoom
        const browser = await puppeteer.launch(chromeOptions);
        const page = await browser.newPage();
        await page.goto(url, {waitUntil: 'networkidle0', timeout:30000}).catch(err => {logger.log(err), browser.close()})
        let query = req.query
        let elements = await page.evaluate((query)=>{

          let elementNames = ["div", "body","a", "b", "p", "h1", "h2","h3","h4","h5", "span", "ul", "li", "button", "article", "main", "header", "footer"] // Put all the tags you want colors for here
          let elementStyles= {}
          elementNames.forEach( function(tagName) {
            let tags = document.querySelectorAll(tagName);
            tags.forEach(elm => {
              let styles = getComputedStyle(elm)
              for(let key in styles){
                let style = styles[key]
                  if( (style == 'background-color' && query.elements == 'true') || (style == 'color' && query.text == 'true')) {
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
          }, query)
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
