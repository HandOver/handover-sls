var fs = require('fs')
var path = require('path')

function DotEnvEmitter(options)
{
  Object.assign(this, {
    env: options.env,
    root: options.root
  })
}

DotEnvEmitter.prototype.apply = function(compiler)
{
  compiler.plugin('after-emit', function(compilation, cb)
  {
    var env = Object.keys(this.env).reduce(function(res, key)
    {
      if (this.env.hasOwnProperty(key))
      {
        res.push(key+'="'+ ths.env[key] +'"')
      }
      return res
    }, []).join('\n')

    fs.writeFile(path.resolve(this.root || compiler.outputPath, '.env'), env, {
      mode: 0o644,
      flags: 'w+'
    }, cb)
  })
}

module.exports = DotEnvEmitter
module.exports.envfiles = function(stage)
{
  return './env/' + stage + '.js' 
}
