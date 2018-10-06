const util = require('util');
const request = require('request');
const winston = require('winston');

function RocketChat(config) {
  if (!config) throw new Error('Missing config');
  if (!config.webhook_url) throw new Error('Missing webhook_url in config');
  winston.Transport.call(this, config);

  this.config = config;

  this.handleExceptions = !!config.handleExceptions;
}

util.inherits(RocketChat, winston.Transport);

winston.transports.RocketChat = RocketChat;

RocketChat.prototype.log = function (level, msg, meta, callback) {
  callback = callback || function (err) {
    if (err) console.error(err.stack);
  };

  const message =
    this.config.custom_formatter
      ? this.config.custom_formatter(level, msg, meta)
      : { text: "*" + level + "* " + msg, attachments: msg.attachments || [] };

  const payload = {

    text: message.text || this.config.text,
    parseUrls: false,
    attachments: message.attachments || this.config.attachments,
  };

  request.post({
    uri: this.config.webhook_url,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  },
  (err, res, body) => {
    if (err) return callback(err);
    if (res.statusCode !== 200) return callback(new Error(`Unexpected status code from RocketChat: ${res.statusCode}`));
    this.emit('logged');
    callback(null, true);
  },
  );
};

module.exports = RocketChat;
