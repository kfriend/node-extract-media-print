// Dependencies
var css = require('css');

// Plugin info
var PLUGIN = 'get-print-media';

var parseSheet = (function() {
    var filter = function(rule) {
        if (rule.type != 'media' || !rule.media || !rule.media.match('print')) {
            return false;
        }

        return true;
    };

    return function(source, options) {
        if (source instanceof Buffer) {
            source = source.toString();
        }

        var parsed = {};
        var tree = css.parse(source);

        if (tree.stylesheet.rules) {
            tree.stylesheet.rules = tree.stylesheet.rules.filter(filter);
        }

        return tree;
    };
})();

/**
 * Flatten tree
 *
 * Takes a CSS AST and reduces it down so simple print @media statements (e.g.
 * no width, other medias besides print) and strips away their media-query wrapper.
 *
 * @param  {object} tree The CSS AST produced from the "css" package
 * @return {object}      The flatten tree
 */
var flattenTree = function(tree) {
    var newRules = [];

    var parentizer = function(rule) {
        rule.parent = item.parent;
    };

    for (var i = 0; i < tree.stylesheet.rules.length; i++) {
        var item = tree.stylesheet.rules[i];
        if (item.type === 'media' && item.media === 'print') {
            // Modify the rules as needed, before injecting into the "global"
            // CSS scope
            item.rules.forEach(parentizer);

            newRules.push.apply(newRules, item.rules);
        }
        else {
            newRules.push(item);
        }
    }

    tree.stylesheet.rules = newRules;

    return tree;
};

var parsePrint = function(source, options) {
    var parsed = parseSheet(source, options);
    parsed = flattenTree(parsed);
    return css.stringify(parsed);
};

module.exports = {
    parse: parsePrint,
    flattenTree: flattenTree,
    PLUGIN: PLUGIN,
};