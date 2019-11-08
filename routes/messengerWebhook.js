const express = require('express');
const router = express.Router();
const messengerController = require('../controller/messengerWebhookController');
const messengerVerifyWebhook = require('../controller/messengerVerifyWebhook');

/* GET users listing. */
router.get('/', function(req, res, next) {
  messengerVerifyWebhook(req, res, next)
});

router.post('/messenger-webhook', function(req, res, next) {
  messengerController(req, res, next)
});

module.exports = router;
