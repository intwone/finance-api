import StorageAdapter from '@src/adapter/ports/Storage';
import config from '@src/config';
import AmazonS3Storage from '@src/infra/storage/AmazonS3';
import DiskStorage from '@src/infra/storage/Disk';

interface IProviders {
  [key: string]: any;
}

export default class Helpers {
  defineStorageProvider(): StorageAdapter {
    const driver = config.upload.driver || 'disk';
    const providers: IProviders = {
      s3: new AmazonS3Storage(),
      disk: new DiskStorage(),
    };
    return providers[driver];
  }
}
