const aws = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'ACCESS_TEST',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'SECRET_TEST',
  defaultRegion: process.env.AWS_DEFAULT_REGION || 'us-east-1',
  bucketName: process.env.AWS_BUCKET_NAME || 'BUCKET_TEST',
};

export default aws;
