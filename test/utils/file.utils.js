const fs = require('fs');

function loadProto(filename) {
  const proto = fs.readFileSync(`test/protos/${filename}`);
  return proto.toString();
}

module.exports = {
  loadProto
};
