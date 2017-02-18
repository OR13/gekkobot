
var storage = require('node-persist');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));

module.exports = download = (self, subreddit) => {

    return new Promise(function (fulfill, reject) {
        var reddit = self.reddit;

        storage.init( /* options ... */)
            .then(function () {
                //then start using it
                var config;

                var recursiveDownload = (slice) => {
                    var lastIndex = slice.children.length - 1;
                    var lastId = slice.children[lastIndex].data.id;

                    return fs.writeFileAsync("./raw_slices/" + lastId + ".json", JSON.stringify(slice.get.data), {})
                        .then(function () {
                            return storage.setItem('lastPostId', lastId)
                        })
                        .then(function () {
                            return slice.next();
                        })
                }

                storage.getItem('lastPostId')
                    .then(function (lastPostId) {
                        console.log('lastPostId: ', lastPostId)
                        if (lastPostId) {
                            // continue for last post
                            config = {
                                limit: 1,
                                after: lastPostId
                            };
                        } else {
                            // start from begininning
                            config = {
                                limit: 1,
                            };
                        }

                        reddit(subreddit)
                            .listing(config)
                            .then((slice) => {
                                return recursiveDownload(slice);
                            })
                            .then((slice) => {
                                return recursiveDownload(slice);
                            })
                            .then((slice) => {
                                fulfill(true)
                            })

                    })


            });

    });
}