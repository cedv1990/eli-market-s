var db = require('../utilities/database');
var s5 = require('s5-js/s5');

var validate = function(req, res, next){
  var user = JSON.parse( req.body.user );

  db.database().any('select cod_user_market, name_user_market, last_name_user_market, alias_user_market, email_user_market from user_market where (alias_user_market = $1 or email_user_market = $1) and pass_user_market = $2 and state_user = true', [user.usuario, s5.toAESEncrypt(s5.fromAESEncrypt(user.pass), true)])
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data.shift(),
          message: 'Retorna si usuario existe'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

module.exports = {
  validate: validate
};