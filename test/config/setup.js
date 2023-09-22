const path = require('path');
const isPortReachable = require('is-port-reachable');
const docker = require('docker-compose').v2;

module.exports = async () => {
  console.time('global-setup');
  
  const isDBReachable = await isPortReachable(54310);
  
  if (!isDBReachable) {
    await docker.upAll({
      config: 'docker-compose.e2e.yml',
      cwd: path.join(__dirname, '..', '..'),
    });

    await docker.exec(
      'database',
      ['sh', '-c', 'until pg_isready ; do sleep 1; done'],
      {
        cwd: path.join(__dirname),
      }
    );
  }

  console.timeEnd('global-setup');
};