const debugMode = false

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'local'
const isProd = process.env.NODE_ENV === 'prod'
// console.log('serverConfig isProd:', isProd)

module.exports = {
  apiPort: isProd ? 443 : 8050,
  allowHelpAPI: debugMode,
  logAllRequests: debugMode,
  corsOrigin: isProd
    ? /https?:\/\/18\.195\.185\.237/i
    : /http?:\/\/localhost(:\d+)?/i,
  needSSL: false // isProd
}
