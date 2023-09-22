const path = require('path');
const docker = require('docker-compose').v2;

module.exports = async () => {
  await docker.down({
    config: 'docker-compose.e2e.yml',
    cwd: path.join(__dirname, '..', '..'),
  });
};
