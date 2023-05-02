const StringUtils = {};

/**
 * isEmpty
 * @param {String} value 
 * @returns True/False
 */
StringUtils.isEmpty = function(value) {
  return (value == null || value.trim().length === 0);
}

/**
 * isNotEmpty
 * @param {String} value 
 * @returns True/False
 */
StringUtils.isNotEmpty = function(value) {
  return !StringUtils.isEmpty(value);
}

module.exports = StringUtils;