import fetch from 'node-fetch';
import { logger } from '../utils/Logger';
const fs = require('fs')
// Private Methods



class SaveLocalService {

  async download(url,fileName, num) {
    const response = await fetch(url);
    if(response.statusText == 'OK'){
      const buffer = await response.buffer();
      // fs.writeFile(`/Users/beast/Pictures/puppeteer/${fileName}/image-${num}.png`, buffer, () => '');
      await this.mkdir(`/Users/beast/Pictures/puppeteer/${fileName}/image-${num}.png`, buffer)
      logger.log()
      return 1
    }
    return 0
  }

  async mkdir(filename,content, charset) {
      // -- normalize path separator to '/' instead of path.sep,
      // -- as / works in node for Windows as well, and mixed \\ and / can appear in the path
      let filepath = filename.replace(/\\/g,'/');

      // -- preparation to allow absolute paths as well
      let root = '';
      if (filepath[0] === '/') {
        root = '/';
        filepath = filepath.slice(1);
      }
      else if (filepath[1] === ':') {
        root = filepath.slice(0,3);   // c:\
        filepath = filepath.slice(3);
      }

      // -- create folders all the way down
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

      // -- write file
      fs.writeFileSync(root + filepath, content);
    }
}

export const stlService = new SaveLocalService()
