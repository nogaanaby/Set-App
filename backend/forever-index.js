const forever = require('forever-monitor')

// runs in env=PROD!
const child = new (forever.Monitor)('index-prod.js', {
  'max': 50,
  'logFile': 'logs/forever_logs_' + (+new Date()), // Path to log output from forever process (when daemonized)
  'outFile': 'logs/app_logs_' + (+new Date()),     // Path to log output from child stdout
  'errFile': 'logs/app_errs_' + (+new Date()),     // Path to log output from child stderr
})

child.on('exit', function () {
  console.log('app has exited after 50 restarts')
})

child.start()
