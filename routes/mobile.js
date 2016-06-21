var express = require('express');
var router = express.Router();
var collection = require('../model/collection');
var staticmodel = require('../model/staticmodel');

/* GET mobile page. */
router.get('/index', function(req, res, next) {
  res.render('./mobile/index', { 
    nav:'首页',
    path:'mobile/index',
    title: '建正会展' 
  });
});

router.get('/login', function(req, res, next) {
  res.render('./mobile/login', { 
    nav:'首页',
    path:'mobile/login',
    title: '建正会展--登录' 
  });
});

router.get('/sign', function(req, res, next) {
  res.render('./mobile/sign', { 
    nav:'首页',
    path:'mobile/sign',
    title: '建正会展--注册' 
  });
});

router.get('/client/creat', function(req, res, next) {
  res.render('./mobile/client/request/creat', { 
    nav:'发布需求',
    path:'mobile/client/request/creat',
    title: '建正会展--发布需求',
    city:staticmodel.city
  });
});

router.get('/client/request', function(req, res, next) {
  res.render('./mobile/client/request/list', { 
    nav:'我的需求',
    path:'mobile/client/request/list',
    title: '建正会展--我的需求',
    page: 1
  });
});

router.get('/client/request/:page', function(req, res, next) {
  res.render('./mobile/client/request/list', { 
    nav:'我的需求',
    path:'mobile/client/request/list',
    title: '建正会展--我的需求',
    page: req.params.page
  });
});

router.get('/client/request/detail/:id', function(req, res, next) {
  collection.exhibit.findById(req.params.id,
    function(err,data){
      if(err){
        res.json(err,500);
      }else{
        res.render('./mobile/client/request/detail', { 
          nav:'我的需求',
          path: 'mobile/client/request/detail',
          title: '建正会展--我的需求',
          detail:data,
          city:staticmodel.city
        });
      }
    }
  );
});

router.get('/client/response', function(req, res, next) {
  res.render('./mobile/client/response/list', { 
    nav:'收到报价',
    path:'mobile/client/response/list',
    title: '建正会展--收到报价',
    page: 1
  });
});

router.get('/client/response/:page', function(req, res, next) {
  res.render('./mobile/client/response/list', { 
    nav:'收到报价',
    path:'mobile/client/response/list',
    title: '建正会展--收到报价',
    page: req.params.page
  });
});

router.get('/client/response/detail/:id', function(req, res, next) {
  collection.offer.findById(req.params.id,
    function(err,data){
      if(err){
        res.json(err,500);
      }else{
        res.render('./mobile/client/response/detail', { 
          nav:'收到报价',
          path: 'mobile/client/response/detail',
          title: '建正会展--收到报价',
          detail:data,
          city:staticmodel.city
        });
      }
    }
  );
});

router.get('/vendor/request', function(req, res, next) {
  res.render('./mobile/vendor/request/list', { 
    nav:'所有需求',
    path:'mobile/vendor/request/list',
    title: '建正会展--所有需求',
    page: 1
  });
});

router.get('/vendor/request/:page', function(req, res, next) {
  res.render('./mobile/vendor/request/list', { 
    nav:'所有需求',
    path:'mobile/vendor/request/list',
    title: '建正会展--所有需求',
    page: req.params.page
  });
});

router.get('/vendor/request/detail/:id', function(req, res, next) {
  collection.exhibit.findById(req.params.id,
    function(err,data){
      if(err){
        res.json(err,500);
      }else{
        res.render('./mobile/vendor/request/detail', { 
          nav:'所有需求',
          path: 'mobile/vendor/request/detail',
          title: '建正会展--所有需求',
          detail:data,
          city:staticmodel.city
        });
      }
    }
  );
});

router.get('/vendor/response/creat/:id', function(req, res, next) {
  collection.exhibit.findById(req.params.id,
    function(err,data){
      if(err){
        res.json(err,500);
      }else{
        res.render('./mobile/vendor/response/creat', { 
          nav:'我的报价', 
          path: 'mobile/vendor/response/creat',
          title: '建正会展--我的报价',
          detail:data,
          city:staticmodel.city
        });
      }
    }
  );
});

router.get('/vendor/response', function(req, res, next) {
  res.render('./mobile/vendor/response/list', { 
    nav:'我的报价',
    path:'mobile/vendor/response/list',
    title: '建正会展--我的报价',
    page:1
  });
});

router.get('/vendor/response/:page', function(req, res, next) {
  res.render('./mobile/vendor/response/list', { 
    nav:'我的报价',
    path:'mobile/vendor/response/list',
    title: '建正会展--我的报价',
    page: req.params.page 
  });
});


router.get('/vendor/response/detail', function(req, res, next) {
  res.render('./mobile/vendor/response/detail', { 
    nav:'我的报价',
    path: 'mobile/vendor/response/detail',
    title: '建正会展--我的报价' 
  });
});

router.get('/vendor/response/detail/:id', function(req, res, next) {
  collection.offer.findById(req.params.id,
    function(err,data){
      if(err){
        res.json(err,500);
      }else{
        res.render('./mobile/vendor/response/detail', { 
          nav:'我的报价',
          path: 'mobile/vendor/response/detail',
          title: '建正会展--我的报价',
          detail:data,
          city:staticmodel.city
        });
      }
    }
  );
});

router.get('/about', function(req, res, next) {
  res.render('./mobile/about', { 
    nav:'关于我们',
    path: 'mobile/about',
    title: '建正会展--关于我们' 
  });
});

router.get('/show', function(req, res, next) {
  res.render('./mobile/show', { 
    nav:'展示',
    path: 'mobile/show',
    title: '建正会展--展示' 
  });
});

router.get('/video', function(req, res, next) {
  res.render('./mobile/video', { 
    nav:'视频会议',
    path: 'mobile/video',
    title: '建正会展--视频会议' 
  });
});

router.get('/room', function(req, res, next) {
  res.render('./mobile/room', { 
    nav:'虚拟会议室',
    path: 'mobile/room',
    title: '建正会展--虚拟会议室' 
  });
});

router.get('/hot', function(req, res, next) {
  res.render('./mobile/hot', { 
    nav:'热门区域',
    path: 'mobile/hot',
    title: '建正会展--热门区域',
    page:1,
    clientname:'',
    projectname:''
  });
});

router.get('/hot/:page', function(req, res, next) {
  res.render('./mobile/hot', { 
    nav:'热门区域',
    path: 'mobile/hot',
    title: '建正会展--热门区域',
    page: req.params.page,
    clientname:'',
    projectname:''
  });
});

router.get('/hot/:page/:clientname/:projectname', function(req, res, next) {
  var cn = req.params.clientname;
  var pn = req.params.projectname;
  if(cn=='nil'){
    cn = '';
  }
  if(pn=='nil'){
    pn = '';
  }
  res.render('./mobile/hot', { 
    nav:'热门区域',
    path: 'online/hot',
    title: '建正会展--热门区域',
    page: req.params.page,
    clientname: cn,
    projectname: pn
  });
});

router.get('/result/:id', function(req, res, next) {
  collection.offer.findById(req.params.id,
    function(err,data){
      if(err){
        res.json(err,500);
      }else{
        if(data.state!=2){
          res.json(err,500);
        }else{
          res.render('./mobile/result', { 
            nav:'报价报表',
            path: 'mobile/result',
            title: '建正会展--报价报表',
            detail:data,
            city:staticmodel.city
          });
        }
      }
    }
  );
});

module.exports = router;