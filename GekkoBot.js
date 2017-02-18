var Snoocore = require('snoocore');
var pack = require('./package.json');

var downloadSub = require('./src/downloadSub/downloadSub');

class GekkoBot {

    constructor() {
        this.reddit = new Snoocore({
            // Unique string identifying the app
            userAgent: '/u/gekkobot gekkobot@' + pack.version,
            // It's possible to adjust throttle less than 1 request per second.
            // Snoocore will honor rate limits if reached.
            throttle: 300,
            oauth: {
                type: 'script',
                key: process.env.GEKKOBOT_CLIENT_ID,            // OAuth client key (provided at reddit app)
                secret: process.env.GEKKOBOT_CLIENT_SECRET,     // OAuth secret (provided at reddit app)
                username: process.env.GEKKOBOT_USERNAME,        // Reddit username used to make the reddit app
                password: process.env.GEKKOBOT_PASSWORD,        // Reddit password for the username

                // The OAuth scopes that we need to make the calls that we 
                // want. The reddit documentation will specify which scope
                // is needed for evey call

                scope: ['identity', 'read', 'vote']
            }
        });
    }

    downloadSub(subreddit) {
        return downloadSub(this, subreddit);
    }

}


module.exports = new GekkoBot();