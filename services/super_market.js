var db = require('../utilities/database');

var getAll = function(req, res, next){
	db.database().any('select cod_super_market, nombre_super_market, direccion_super_market, gps_super_market from super_market order by cod_super_market')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retorna todos los supermercados registrados'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAll: getAll
};