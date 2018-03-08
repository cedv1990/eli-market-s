var db = require('../utilities/database');
var s5 = require('s5-js/s5');

var validate = function(req, res, next){

  db.database().any('select cod_user_market, name_user_market, last_name_user_market, alias_user_market, email_user_market, photo_user_market from user_market where (alias_user_market = $1 or email_user_market = $1) and pass_user_market = $2 and state_user = true', [req.body.user.usuario, s5.toAESEncrypt(s5.fromAESEncrypt(req.body.user.pass), true)])
    .then(function (data) {
      data = data.shift();
      if (data) {
        res.status(200)
          .json({
            status: 'success',
            data: {
                cod: data.cod_user_market,
                name: data.name_user_market,
                last_name: data.last_name_user_market,
                alias: data.alias_user_market,
                photo: data.photo_user_market,
                email: data.email_user_market
            },
            message: 'Retorna si usuario existe'
          });
      }
      else{
        res.status(401)
          .json({
            status: 'unathorized'
          });
      }
    })
    .catch(function (err) {
      return next(err);
    });
};

var actualizar = function (req, res, next) {
  
  db.database().none('update user_market set photo_user_market = $2 where cod_user_market = $1', [req.body.user.cod, req.body.user.photo])
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Actualizado con éxito'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

module.exports = {
  validate: validate,
  update: actualizar
};