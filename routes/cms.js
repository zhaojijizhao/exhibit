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

router.get('/userpersonal', function(req, res, next) {
  res.render('./cms/userPersonal', {
    nav:'个人账号管理',
    path:'cms/userPersonal',
    title: '个人账号管理'
  });
});

router.get('/exhibitlist', function(req, res, next) {
  res.render('./cms/exhibitList', {
    nav:'需求列表',
    path:'cms/exhibitList',
    title: '需求列表'
  });
});

router.get('/exhibitdetail', function(req, res, next) {
  res.render('./cms/exhibitDetail', {
    nav:'需求详情',
    path:'cms/exhibitDetail',
    title: '需求详情'
  });
});

router.get('/clientapply', function(req, res, next) {
  res.render('./cms/clientApply', {
    nav:'企业用户申请',
    path:'cms/clientApply',
    title: '企业用户申请'
  });
});

router.get('/vendorapply', function(req, res, next) {
  res.render('./cms/vendorApply', {
    nav:'签约商用户申请',
    path:'cms/vendorApply',
    title: '签约商用户申请'
  });
});

router.get('/design', function(req, res, next) {
  res.render('./cms/design', {
    nav:'定制申请',
    path:'cms/design',
    title: '定制申请'
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