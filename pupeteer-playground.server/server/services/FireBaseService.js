// import { Storage } from '@google-cloud/storage';
import fetch from 'node-fetch';
import { logger } from '../utils/Logger';
const fs = require('fs');
const {Storage} = require('@google-cloud/storage')

// const storageKey = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)


// Private Methods


class FireBaseService {
  storage = new Storage()
  bucketName = 'bucket-name'
  constructor(){
    this.createBucket().catch(console.error)
  }
  async  createBucket() {
    // Creates the new bucket
    await this.storage.createBucket(this.bucketName);
    logger.log(`Bucket ${this.bucketName} created.`);
  }

  async download(url,fileName, num) {
    const response = await fetch(url);
    if(response.statusText == 'OK'){
      const buffer = await response.buffer();
      // fs.writeFile(`/Users/beast/Pictures/puppeteer/${fileName}/image-${num}.png`, buffer, () => '');
      // await this.uploadFile(buffer,`${fileName}-${num}.png`).catch(console.error)
      // logger.log()

      const file = this.storage.bucket(this.bucketName).file("tester.png");
      file.save(buffer, (err) => {
        if (!err) {
          console.log("cool");
        } else {
          console.log("error " + err);
        }
      });
      return 1
    }
    return 0
  }

 async uploadFile(filename, destination) {
    // Uploads a local file to the bucket
    await this.storage.bucket(this.bucketName).upload(filename, {
      // By setting the option `destination`, you can change the name of the
      // object you are uploading to a bucket.
      destination: destination,
      metadata: {
        // Enable long-lived HTTP caching headers
        // Use only if the contents of the file will never change
        // (If the contents will change, use cacheControl: 'no-cache')
        cacheControl: 'public, max-age=31536000',
      },
    });

    console.log(`${filename} uploaded to ${this.bucketName}.`);
  }


}

export const fbsService = new FireBaseService()
