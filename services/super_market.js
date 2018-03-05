var db = require('../utilities/database');

var getAll = function(req, res, next){
	db.database().any('select cod_super_market, name_super_market, direction_super_market, gps_super_market from super_market order by cod_super_market')
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
};

var getSingle = function(req, res, next){
  var cod = parseInt(req.params.cod);
  db.database().one('select cod_super_market, name_super_market, direction_super_market, gps_super_market from super_market where cod_super_market = $1', cod)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retorna los datos de un supermercado'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

var create = function(req, res, next) {
  var market = JSON.parse( req.body.market );
  db.database().none('INSERT INTO super_market (name_super_market, direction_super_market, gps_super_market) VALUES ($1, $2, $3)', [market.name, market.direction, JSON.stringify( market.gps )])
    .then(function (){
      res.status(200)
        .json({
          status: 'success',
          message: 'Supermercado agregado con éxito'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAll: getAll,
  getSingle: getSingle,
  create: create
};