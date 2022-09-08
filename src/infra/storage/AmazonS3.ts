import StorageAdapter from '@src/adapter/ports/Storage';
import config from '@src/config';
import aws, { S3 } from 'aws-sdk';
import fs from 'fs';
import mime from 'mime';
import path from 'path';

export default class AmazonS3 implements StorageAdapter {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: config.aws.defaultRegion,
    });
  }

  public async saveFile(filename: string): Promise<boolean | Error> {
    const originalPath = path.resolve(config.upload.tempFolder, filename);
    const contentType = mime.getType(originalPath);
    if (!contentType) throw new Error('File not found.');
    const fileContent = await fs.promises.readFile(originalPath);

    try {
      await fs.promises.rename(
        path.resolve(config.upload.tempFolder, filename),
        path.resolve(config.upload.uploadsFolder, filename),
      );
      await this.client
        .putObject({
          Bucket: config.aws.bucketName,
          Key: filename,
          ACL: 'public-read',
          Body: fileContent,
          ContentType: contentType,
        })
        .promise();
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async deleteFile(filename: string): Promise<boolean> {
    try {
      this.client
        .deleteObject({
          Bucket: config.aws.bucketName,
          Key: filename,
        })
        .promise();
      return true;
    } catch (error) {
      return false;
    }
  }
}
