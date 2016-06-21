var express = require('express');
var router = express.Router();
var collection = require('../model/collection');

/* GET vendor page. */
router.get('/index', function(req, res, next) {
  res.render('./vendor/index', { path: 'vendor/index',title: '供应商首页' });
});

router.get('/request', function(req, res, next) {
  res.render('./vendor/request/list', { path: 'vendor/request/list',title: '所有需求' });
});

router.get('/request/mine', function(req, res, next) {
  res.render('./vendor/request/mine', { path: 'vendor/request/mine',title: '收到需求' });
});

router.get('/request/detail/:id', function(req, res, next) {
  collection.exhibit.findById(req.params.id,
    function(err,data){
      if(err){
        res.json(err,500);
      }else{
        res.render('./vendor/request/detail', { path: 'vendor/request/detail',title: '需求详情',detail:data});
      }
    }
  );
});

router.get('/response/creat/:id', function(req, res, next) {
  collection.exhibit.findById(req.params.id,
    function(err,data){
      if(err){
        res.json(err,500);
      }else{
        res.render('./vendor/response/creat', { path: 'vendor/response/creat',title: '新建报价',detail:data});
      }
    }
  );
});

router.get('/response', function(req, res, next) {
  res.render('./vendor/response/list', { path: 'vendor/response/list',title: '我的报价' });
});

router.get('/response/detail', function(req, res, next) {
  res.render('./vendor/response/detail', { path: 'vendor/response/detail',title: '报价详情' });
});

router.get('/result', function(req, res, next) {
  res.render('./vendor/result/list', { path: 'vendor/result/list',title: '已确认报价' });
});

router.get('/result/detail', function(req, res, next) {
  res.render('./vendor/result/detail', { path: 'vendor/result/detail',title: '已确认报价详情' });
});

module.exports = router;
