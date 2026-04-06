export function loggingMiddleware(req, _res, next) {
  req._start = Date.now()
  next()
}

export function logResponse(req, res, next) {
  res.on('finish', () => {
    const latencyMs = Date.now() - (req._start || Date.now())
    console.log(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        requestId: req.requestId,
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        latencyMs
      })
    )
  })
  next()
}
