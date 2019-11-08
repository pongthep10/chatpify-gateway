module.exports = messengerController = async (req, res, next) => {
    const sender_id = req.body.sender_id
    const receiver_id = req.body.receiver_id
    const content = req.body.content

    // Save inquiry message
    const message = await Message.forge({
        content,
        sender_id,
        receiver_id
    }).save(null, {method:'insert'})

    // query Dialogflow
    const dialogflowRes = await Dialogflow('test-agent-wabqqi', 'th', content)

    // Save response message
    const messageResponse = await Message.forge({
        content: dialogflowRes.messageResponse,
        sender_id: receiver_id,
        receiver_id: sender_id,
        intent: dialogflowRes.intentName    
    }).save(null, {method:'insert'})

  console.log(message)
  res.send(messageResponse.toJSON());
}
