import puppeteer from 'puppeteer';
import socketService from '../services/SocketService';
import BaseController from '../utils/BaseController';
import { logger } from '../utils/Logger';

const chromeOptions = {headless: true, defaultViewport: null,   args: [
  "--incognito",
  "--no-sandbox",
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

function _hexCode(dict){
  let hexes ={}
  for(let key in dict){
    let value = dict[key]
    let a;
    let isPercent;
    let rgb = key.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
    alpha = (rgb && rgb[4] || "").trim(),
    hex = rgb ?
    (+rgb[1] | 1 << 8).toString(16).slice(1) +
    (+rgb[2] | 1 << 8).toString(16).slice(1) +
    (+rgb[3] | 1 << 8).toString(16).slice(1) : key;

  if (alpha !== "") {
    a = alpha;
  } else {
    a = '01';
  }
  // multiply before convert to HEX
  a = ((+a * 255) | 1 << 8).toString(16).slice(1)
  hex = '#'+hex + a;
  hexes[hex] = value;
  }
  return hexes;
}

function _calculatePercent(dict = {}){
  let total = 0
  let ignores = ['rgb(255, 255, 255)', 'rgb(0, 0, 0)','rgba(0, 0, 0, 0)', '#ffffffff', '#000000ff', '#00000000' ]
  for (const key in dict) {
    if(!ignores.includes(key)){
      total += dict[key];
    }
  }
  for (const key in dict){
    if(!ignores.includes(key)){
    dict[key] = ((dict[key]/total)*100).toFixed(2)
    } else{
      dict[key]= '0'
    }
  }
  return dict
}

export class StyleController extends BaseController {
  constructor() {
    super('api/style')
    logger.log('style controller registered')
    this.router
      .put('/sheet', this.getStyleSheet)
      .put('/site', this.getSiteStyle)
  }
  async getStyleSheet(req, res, next) {
    try {
      logger.log('steal style', req.body.url)
        let url = _urlCheck(req.body.url)
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
                    let brackets = []
                    switch(char){
                    case '{':
                      brackets.push('{')
                      break;
                    case '}':
                      brackets.pop()
                      if(brackets.length ==0){
                        let rule = rawStyle.slice(lastIndex, i+1)
                        let selector = rule.slice(0,rule.indexOf('{'))
                        let style = rule.slice(rule.indexOf('{')+1).split(';').map(e => e+= ';')
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

  async getSiteStyle(req,res, next){
try {
  logger.log('steal site style', req.body.url)
        let url = _urlCheck(req.body.url)
        let socketRoom = req.body.socketRoom
        const browser = await puppeteer.launch(chromeOptions);
        const page = await browser.newPage();
        await page.goto(url, {waitUntil: 'networkidle0', timeout:30000}).catch(err => {logger.log(err), browser.close()})
        let elements = await page.evaluate(()=>{
          let elementNames = ["div", "body","a", "b", "p", "h1", "h2","h3","h4","h5", "span", "ul", "li"] // Put all the tags you want bg images for here
          let elementStyles= {}
          elementNames.forEach( function(tagName) {
            let tags = document.querySelectorAll(tagName);
            tags.forEach(elm => {
              let styles = getComputedStyle(elm)
              for(let key in styles){
                let style = styles[key]
                if( style == 'background-color') {
                  let color = styles.getPropertyValue(style)
                  if(elementStyles[color]){
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
          elements = _hexCode(elements)
          elements = _calculatePercent(elements)
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
