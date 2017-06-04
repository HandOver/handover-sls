export const login = function(req, res)
{
  console.log('hello login');
  return res.status(200).json({ success: true })
}

export const signup = function(req, res)
{
  return res.status(200).json({
    success: true,
    message: "You've sucessfully signed up!"
  })
}

export default {
  login,
  signup
}
