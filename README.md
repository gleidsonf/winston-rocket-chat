[Winston](https://github.com/gleidsonf/winston-rocket-chat) Transport for
[Rocket Chat](https://rocket.chat/) chat integration.

    npm install --save winston-rocketchat-transport

Basic transport that works just like all other winston transports. Sends logged
messages to a specified Slack chat channel.

Configuration options:

 * `webhook_url`: **required** The webhook URL, something like
   `https://yourworkspace.rocket.chat/hooks/XXXXXXXXX/YYYYYYYYY/ZZZZZZZZZZZZZZZZZZZZZZZZ`
 * `level`: If specified, this logger will only log messages at the specified
   level of importance and more important messages
 * `custom_formatter`: a `function (level, msg, meta)` which returns a Slack
   payload object

---

    var winston = require('winston');
    var RocketChat = require('winston-rocketchat-transport');

    winston.add(RocketChat, {
        webhook_url: "https://hooks.slack.com/services/XXXXXXXXX/YYYYYYYYY/ZZZZZZZZZZZZZZZZZZZZZZZZ",
        level: 'error',
        handleExceptions: true
    });
