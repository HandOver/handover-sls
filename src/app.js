import router from './libs/router'
import responder from './libs/responder'

export const auth = function(req, res)
{
  router.findHandler(req, res, 'auth', (handler) =>
  {
    if (!handler)
    {
      return res.status(502).end()
    }

    handler(req, res)
  })
}
