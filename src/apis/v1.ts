import { Hono } from 'hono'

function loadV1(app: Hono) {
  app.get('/v1', (c) => {
  return c.text('Api Gateway 0debt')
})
app.get('/v1/health', (ctx) => {
    return ctx.json({
      message: 'API GATEWAY',
      version: 1,
      status: 'healthy',
      timestamp:new Date().toISOString()
    })
  })
}




export default loadV1
