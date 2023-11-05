const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: 'AKIAXNHUAUIRDYISFL5M',
  secretAccessKey:'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'
});

export const s3 = new AWS.S3()