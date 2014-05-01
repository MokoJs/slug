/**
 * TODO: Replace with yields/slug once it's easier to mix and match components
 */

/**
 * Generate a slug from the given `str`.
 *
 * example:
 *
 *        generate('foo bar');
 *        // > foo-bar
 *
 * @param {String} str
 * @param {String} repl defaulted to `-`
 * @return {String}
 */

module.exports = function (str, repl) {
  if(!str) return undefined;
  return str.toLowerCase()
    .replace(/:|\.|,|`|'|"/g, '')
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/^ +| +$/g, '')
    .replace(/ +/g, repl || '-');
};
