import responder from './responder'

import routes from '../config/routes'
import controllerList from '../controllers'

export const matchRoute = function(route, path)
{
  var matcher = new RegExp(route.replace(/:[^\s/]+/g, '([\\w-]+)'))
  return matcher.test(path)
}

export const findHandler = function(req, res, routerPath, next)
{
  if (!routes[routerPath])
  {
    return responder.accessDenied(res)
  }

  const matchedRoute = routes[routerPath].filter((item) => matchRoute(item.route, req.path))[0]
  if (!matchedRoute)
  {
    return responder.accessDenied(res)
  }

  const method = matchedRoute.methods[req.method]
  if (!method)
  {
    return responder.accessDenied(res)
  }

  if (!method.controller || !method.handler)
  {
    console.error("Error: controller and handler has to be defined!");
    return responder.accessDenied(res)
  }

  const controller = controllerList[method.controller]
  if (!controller)
  {
    console.error(`Error: couldn't find '${method.controller}' controller!`);
    return responder.accessDenied(res)
  }

  const handler = controller[method.handler]
  if (!handler)
  {
    console.error(`Error: couldn't find '${method.handler}' function!`);
    return responder.accessDenied(res)
  }

  // return as a variable, won't fire it until user does so
  return next(handler)
}

export default {
  matchRoute,
  findHandler
}
