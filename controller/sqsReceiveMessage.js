const AWS = require('aws-sdk');
const configSQS = require("../credentials/awsSQS.json");
AWS.config.loadFromPath("../credentials/awsSQS.json");
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var queueURL = configSQS['queueURL']

var params = {
 AttributeNames: [
    "SentTimestamp"
 ],
 MaxNumberOfMessages: 1,
 MessageAttributeNames: [
    "All"
 ],
 QueueUrl: queueURL,
 VisibilityTimeout: 0,
 WaitTimeSeconds: 1
};

const listenMessage = () => {
    sqs.receiveMessage(params, function(err, data) {
    if (err) {
        console.log("Receive Error", err);
    } else {

        console.log("data", data)

        if ("Messages" in data) {
            var deleteParams = {
                QueueUrl: queueURL,
                ReceiptHandle: data.Messages[0].ReceiptHandle
            };
        
            sqs.deleteMessage(deleteParams, function(err, data) {
                if (err) {
                    console.log("Delete Error", err);
                } else {
                    console.log("Message Deleted", data);
                }
            });
        }
    }
    });
}


// listening
const main = async function() {
    while (true) {

        await listenMessage()
        await console.log("1")
    }
  }
  
main()