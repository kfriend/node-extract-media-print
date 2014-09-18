var asset = require('assert');
var fs = require('fs');
var css = require('css');
var getPrint = require('../index');

var parseAndFormat = function(path) {
    var parsed = css.parse(fs.readFileSync(path).toString());
    return css.stringify(parsed);
};

describe(getPrint.PLUGIN, function() {
    it('Should extract out any `@media print` rules', function(done) {
        var test = fs.readFileSync('tests/styles.css').toString();
        test = getPrint.parse(test);

        // Source to test against. We'll feed to 'css' and stringify to get a similar
        // format to the parsed output
        var against = parseAndFormat('tests/print.css');

        asset.equal(test, against);
        done();
    });
});