var assert = require('assert');

var GekkoBot = require('../../GekkoBot');

describe('GekkoBot', function () {
    describe('#downloadSub("/r/ethereum")', function () {

        this.timeout(10 * 1000);

        it('should download r/ethereum ... slowly...', function () {
            // console.log(GekkoBot)
            return GekkoBot.downloadSub('/r/ethereum/new/');
            // assert.equal(-1, [1, 2, 3].indexOf(4));
        });
    });
});