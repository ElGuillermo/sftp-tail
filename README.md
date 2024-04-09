<div align="center">

## sftp-tail

[![GitHub release](https://img.shields.io/github/release/ElGuillermo/sftp-tail.svg?style=flat-square)](https://github.com/ElGuillermo/sftp-tail/releases)
[![GitHub contributors](https://img.shields.io/github/contributors/ElGuillermo/sftp-tail.svg?style=flat-square)](https://github.com/ElGuillermo/sftp-tail/graphs/contributors)
[![GitHub release](https://img.shields.io/github/license/ElGuillermo/sftp-tail.svg?style=flat-square)](https://github.com/ElGuillermo/sftp-tail/blob/master/LICENSE)

<br>

[![GitHub issues](https://img.shields.io/github/issues/ElGuillermo/sftp-tail.svg?style=flat-square)](https://github.com/ElGuillermo/sftp-tail/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/ElGuillermo/sftp-tail.svg?style=flat-square)](https://github.com/ElGuillermo/sftp-tail/pulls)
[![GitHub issues](https://img.shields.io/github/stars/ElGuillermo/sftp-tail.svg?style=flat-square)](https://github.com/ElGuillermo/sftp-tail/stargazers)
<br><br>
</div>

## **About**
Need to tail a file on a remote server? sftp-tail should be able to help!

## **Motivation**
To collect the data we needed to build [SquadJS](https://github.com/ElGuillermo/SquadJS), a scripting framework for [Squad](https://joinsquad.com/) servers, we found we needed to tail the Squad server's log files. As a result of this, it became a requirement that SquadJS must be installed on the same machine as the Squad server, however, this prevented anyone using rented Squad server instances from using SquadJS. Thus, we endeavoured to make it possible for these logs files to be streamed over the SFTP servers provided by most hosts - sftp-tail is the outcome of this and we have opened-sourced it for others to benefit from.

## **Usage**
```js
import SFTPTail from 'sftp-tail';

(async () => {
  // Initiate SFTPTail...
  const tailer = new SFTPTail(
    {
      sftp: {
        // basic-sftp's .access options.
        host: "xxx.xxx.xxx.xxx",
        user: "user",
        password: "password",
        
        // As well as...
        timeout: 5 * 1000, // Timeout (optional).
        encoding: 'utf8' // Encoding (optional).
      },

      fetchInterval: 0, // Delay between polls.
      log: true // Enable logging (also accepts logging function).
    }
  );

  // Do something with the lines, e.g. log them.
  tailer.on('line', console.log);

  // Watch the file...
  await tailer.watch('/SquadGame.log');
  
  // Unwatch the file...
  await tailer.unwatch();
})();
```

## **Credits**
The logic behind sftp-tail was originally proposed, designed and implemented by [awn.gg](https://awn.gg/) - sftp-tail is an open-sourced re-implementation of their efforts. 
