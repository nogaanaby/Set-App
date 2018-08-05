// Helper function to wrap async middleware with proper error handling
function asyncWrap (fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
}

function onlyForAuthedUser (fnTakeUsernameFromReq) {
  return (req, res, next) => {
    const user = req.user
    if (user && req.isAuthenticated() && user === fnTakeUsernameFromReq(req)) {
      next()
    }
    else {
      res.status(403).send('Forbidden')
    }
  }
}

module.exports = {
  asyncWrap,
  onlyForAuthedUser
}
