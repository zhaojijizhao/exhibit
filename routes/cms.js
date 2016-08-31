var express = require('express');
var router = express.Router();
var collection = require('../model/collection');

/* GET client page. */
router.get('/userclient', function(req, res, next) {
  res.render('./cms/userClient', {
    nav:'商户账号管理',
    path:'cms/userClient',
    title: '商户账号管理'
  });
});

router.get('/uservendor', function(req, res, next) {
  res.render('./cms/userVendor', {
    nav:'签约商账号管理',
    path:'cms/userVendor',
    title: '签约商账号管理'
  });
});

router.get('/', function(req, res, next) {
  res.render('./cms/userClient', {
    nav:'商户账号管理',
    path:'cms/userClient',
    title: '商户账号管理'
  });
});
module.exports = router;