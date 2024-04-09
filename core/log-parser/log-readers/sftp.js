import path from 'path';
import SFTPTail from 'sftp-tail';

export default class SFTPLogReader {
  constructor(queueLine, options = {}) {
    for (const option of ['host', 'user', 'password', 'logDir'])
      if (!(option in options)) throw new Error(`${option} must be specified.`);

      this.reader = new SFTPTail({
        host: options.host,
        port: options.port || 22,
        user: options.user,
        password: options.password,
        verbose: options.verbose,
        encoding: options.encoding || 'utf8',
        path: path.join(options.logDir, options.filename),
        fetchInterval: options.fetchInterval || 0,
      });
  
      if (typeof queueLine !== 'function')
        throw new Error('queueLine argument must be specified and be a function.');
      this.reader.on('line', queueLine);
    }
  
    async watch() {
      await this.reader.watch();
    }
  
    async unwatch() {
      await this.reader.unwatch();
    }
  }
  