const AWS = require('aws-sdk');
const configSQS = require("../credentials/awsSQS.json");
AWS.config.loadFromPath("../credentials/awsSQS.json");
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var params = {
  DelaySeconds: 0,
  MessageAttributes: {
    "Title": {
      DataType: "String",
      StringValue: "The Whistler"
    },
    "Author": {
    DataType: "String",
    StringValue: "John Grisham"
    },
  "WeeksOn": {
    DataType: "Number",
    StringValue: "6"
   }
 },
 MessageBody: "Test Chatpify message.",
 QueueUrl: configSQS['queueURL']
 
};

sqs.sendMessage(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.MessageId);
  }
});