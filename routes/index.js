/// <reference path="../services/super_market.js" />

var express = require('express');
var router = express.Router();

var test = require('../services/test');
var super_market = require('../services/super_market');

var migrations = require('../services/migrations');

router.get('/test', test.ping);

router.get('/migrations/drop', migrations.drop);
router.get('/migrations/create', migrations.create);
router.get('/migrations/insert', migrations.insert);

router.get('/super', super_market.getAll);
router.get('/super/:cod', super_market.getSingle);

module.exports = router;
