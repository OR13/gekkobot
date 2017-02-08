var Snoocore = require('snoocore');
var package = require('./package.json');
var reddit = new Snoocore({
    // Unique string identifying the app
    userAgent: '/u/gekkobot gekkobot@' + package.version,
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

reddit('/api/v1/me').get()
    .then((result) => {
        console.log(result);
    });