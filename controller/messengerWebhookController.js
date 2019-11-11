const CRED = require('../credentials/facebookPage.json')
const request = require('request')
module.exports = messengerController = async (req, res, next) => {
// /https://github.com/amuramoto/messenger-node
    if (req.body.object === 'page') {
        req.body.entry.forEach(function(entry) {
            
            entry.messaging.forEach(function (event) {  
                
                if (event.message && event.message.text) {
                    var messageType = "message"
                    var senderID = event.sender.id
                    var recipientID = event.recipient.id
                    var messageBody = event.message
                    var messageText = event.message.text
                    var messageID = event.message.mid
                    console.log(messageBody)
                    handleMessage(senderID, recipientID, messageText)
                } else if {
                    (event.message && event.message.text)
                }
            })
        })
        res.status(200).json({
            message: 'ok'
        })
    } else {
        // Return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404)
    }
}



function handleMessage(sender_psid, recipientID, received_message) {
  let response;
  
  // Checks if the message contains text
  if (received_message) {    
    // console.log(received_message,received_message.text)
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      "text": `You sent the message: "${received_message.text}". Now send me an attachment!`
    }
  } else if (received_message.attachments) {
    // Get the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
    response = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "Is this the right picture?",
            "subtitle": "Tap a button to answer.",
            "image_url": attachment_url,
            "buttons": [
              {
                "type": "postback",
                "title": "Yes!",
                "payload": "yes",
              },
              {
                "type": "postback",
                "title": "No!",
                "payload": "no",
              }
            ],
          }]
        }
      }
    }
  } else {
      console.log("fallback", received_message)
  }
  
  // Send the response message
  callSendAPI(sender_psid, recipientID, response);    
}

function handlePostback(sender_psid, recipientID, received_postback) {
  console.log('ok')
   let response;
  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === 'yes') {
    response = { "text": "Thanks!" }
  } else if (payload === 'no') {
    response = { "text": "Oops, try sending another image." }
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid,recipientID, response);
}

function callSendAPI(sender_psid, recipientID, response) {
  // Construct the message body
  let re_body = {
    'message': {
        'text': response
    },
    'recipient': {
        'id': sender_psid
    },
    'notification_type': 'regular'
}

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": CRED[recipientID] },
    "method": "POST",
    "json": re_body
  }, (err, res, body) => {
    if (!err) {
      console.log(body,'message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
}
