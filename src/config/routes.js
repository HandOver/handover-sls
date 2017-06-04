var routes = {
  auth: [
    {
      // may contain :params
      route: '/login',
      methods: {
        GET: {
          controller: 'AuthController',
          // function's name. Must be available inside controllers's file.
          handler: 'login'
        }
      }
    },
    {
      route: '/signup',
      methods: {
        GET: {
          controller: 'AuthController',
          handler: 'signup'
        }
      }
    }
  ]
}

export default routes
