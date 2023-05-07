var _ = require("lodash");
var defaults = require("./profile/default.js");
var config = require("./profile/" + (process.env.NODE_ENVIROMMENT || "development") + ".js");
module.exports = _.merge({}, defaults, config);