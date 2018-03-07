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
  db.database().none('INSERT INTO super_market (name_super_market, direction_super_market, gps_super_market) VALUES ($1, $2, $3)', [req.body.market.name, req.body.market.direction, JSON.stringify( req.body.market.gps )])
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

var update = function (req, res, next) {
  db.database().none('UPDATE super_market SET name_super_market = $1, direction_super_market = $2, gps_super_market = $3 WHERE cod_super_market = $4', [req.body.market.name, req.body.market.direction, JSON.stringify( req.body.market.gps ), req.body.market.cod])
    .then(function (){
      res.status(200)
        .json({
          status: 'success',
          message: 'Supermercado actualizado con éxito'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAll: getAll,
  getSingle: getSingle,
  create: create,
  update: update
};