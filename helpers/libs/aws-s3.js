const AWS = require('aws-sdk');
const fs = require('fs');

const uploadToS3 = (fileName) => {
    return new Promise(function(success, error) {
        const AWSCredentials = {
            accessKey: process.env.AWSAccessKeyId,
            secret: process.env.AWSSecretKey,
            bucketName: process.env.AWSBucket
        };
        
        const fileContent = fs.readFileSync(fileName.path);
        
        const params = {
                    Bucket: AWSCredentials.bucketName,
                    Key: fileName.name,
                    Body: fileContent
                };

        const s3 = new AWS.S3({
                    accessKeyId: AWSCredentials.accessKey,
                    secretAccessKey: AWSCredentials.secret
                });
                    
                    s3.upload(params, function (err ,data) {
                        if (err) {
                            console.log("Error", err);
                            return ({
                                status: false,
                                massage: err
                            });
                        }
                            //success
                            if (data) {
                                console.log("Uploaded in:", data.Location);
                                location = data.Location
                            return success ({
                                    status: true,
                                    message: data.Location
                            }) 
                        }
                    });
            });
        }
module.exports= uploadToS3