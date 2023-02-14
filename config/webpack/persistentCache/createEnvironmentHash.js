'use strict';
const { createHash } = require('crypto');

module.exports = env => {
  const hash = createHash('SHA-256');
  hash.update(JSON.stringify(env));

  return hash.digest('hex');
};
