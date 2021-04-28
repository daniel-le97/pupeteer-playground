import fetch from 'node-fetch';
import { logger } from "../utils/Logger";
const fs = require('fs')
// Private Methods



class SaveLocalService {

  async download(url,fileName,filePath, num) {
    let imagePackage = {
      url: url,
      data: {},
      status: 'bad'
    }
    logger.log('downloading', url)
    const response = await fetch(url);
    logger.log(response.statusText)
    if(response.statusText == 'OK'){
      // buffer is the image data as a giant array
      imagePackage.data = await response.buffer()
      // await fbsService.testFireBase(buffer, fileName) //FIXME
      // await this.mkdir(`/Users/beast/Pictures/puppeteer/${fileName}/image-${num}.png`, buffer, () => '');
      // await this.mkdir(`${filePath}${fileName}/image-${num}.png`, buffer) FIXME
      imagePackage.status = 'ok'
    }
    return imagePackage
  }


  async mkdir(filename,content) {
      //  normalize path separator to '/' instead of path.sep,
      //  as / works in node for Windows as well, and mixed \\ and / can appear in the path
      let filepath = filename.replace(/\\/g,'/');
      //  preparation to allow absolute paths as well
      let root = '';
      if (filepath[0] === '/') {
        root = '/';
        filepath = filepath.slice(1);
      }
      else if (filepath[1] === ':') {
        root = filepath.slice(0,3);   // c:\
        filepath = filepath.slice(3);
      }
      //  create folders all the way down
      const folders = filepath.split('/').slice(0, -1);  // remove last item, file
      folders.reduce(
        (acc, folder) => {
          const folderPath = acc + folder + '/';
          let fileExists = fs.existsSync(folderPath)
          if (!fileExists) {
            fs.mkdirSync(folderPath);
          }
          return folderPath
        },
        root // first 'acc', important
      );
      // saves file
      fs.writeFileSync(root + filepath, content);
    }
}

export const stlService = new SaveLocalService()
