var express = require('express');
var router = express.Router();
var collection = require('../model/collection');
var excel = require('node-excel-export');

/* api listing. */

//cms接口
router.get('/cmsgetclientuser', function(req, res, next) {
	collection.clienter.find({},function(err,data){
			this.todo = data;
			if(err){
				res.json(err,500);
			}else{
				if(data.length>0){
					res.json(this.todo);
				}else{
					res.json(err,500);
				}
			}
		}
	);
});

router.post('/cmssetclientuser', function(req, res, next) {
	collection.clienter.findById(req.body.user._id,
		function(err,data){
			var todo = data;
			if(err){
				res.json(err,500);
			}else{
				todo.set(req.body.user);
				todo.save(function(err){
					if(err){
						res.json(err,500);
					}else{
						res.json(todo);
					}
				});
			}
		}
	);
});

router.post('/cmsdeleteclientuser', function(req, res, next) {
	collection.clienter.findById(req.body.user._id,
		function(err,data){
			var todo = data;
			if(err){
				res.json(err,500);
			}else{
				todo.remove(function(err){
					if(err){
						res.json(err,500);
					}else{
						res.json(todo);
					}
				});
			}
		}
	);
});

router.post('/cmsaddclientuser', function(req, res, next) {
	this.todo = new collection.clienter(req.body.user);
	this.todo.save(function(err){
		if(err){
			res.json(err,500);
		}else{
			res.json(this.todo);
		}
	});
});

router.get('/cmsgetvendoruser', function(req, res, next) {
	collection.vendorer.find({},function(err,data){
			this.todo = data;
			if(err){
				res.json(err,500);
			}else{
				if(data.length>0){
					res.json(this.todo);
				}else{
					res.json(err,500);
				}
			}
		}
	);
});

router.post('/cmssetvendoruser', function(req, res, next) {
	collection.vendorer.findById(req.body.user._id,
		function(err,data){
			var todo = data;
			if(err){
				res.json(err,500);
			}else{
				todo.set(req.body.user);
				todo.save(function(err){
					if(err){
						res.json(err,500);
					}else{
						res.json(todo);
					}
				});
			}
		}
	);
});

router.post('/cmsdeletevendoruser', function(req, res, next) {
	collection.vendorer.findById(req.body.user._id,
		function(err,data){
			var todo = data;
			if(err){
				res.json(err,500);
			}else{
				todo.remove(function(err){
					if(err){
						res.json(err,500);
					}else{
						res.json(todo);
					}
				});
			}
		}
	);
});

router.post('/cmsaddvendoruser', function(req, res, next) {
	this.todo = new collection.vendorer(req.body.user);
	this.todo.save(function(err){
		if(err){
			res.json(err,500);
		}else{
			res.json(this.todo);
		}
	});
});


//user api
//用户登录
router.post('/login', function(req, res, next) {
	var name = req.body.user.name,
		psw = req.body.user.psw,
		cell = req.body.user.cell;
	collection.user.find({name:name,psw:psw,cell:cell},function(err,data){
			this.todo = data;
			if(err){
				res.json(err,500);
			}else{
				if(data.length>0){
					res.json(this.todo);
				}else{
					res.json(err,500);
				}
			}
		}
	);
});

router.post('/clientlogin', function(req, res, next) {
	var name = req.body.user.name,
		psw = req.body.user.psw,
		cell = req.body.user.cell;
	collection.clienter.find({name:name,psw:psw,cell:cell},function(err,data){
			this.todo = data;
			if(err){
				res.json(err,500);
			}else{
				if(data.length>0){
					res.json(this.todo);
				}else{
					res.json(err,500);
				}
			}
		}
	);
});

router.post('/vendorlogin', function(req, res, next) {
	var name = req.body.user.name,
		psw = req.body.user.psw,
		cell = req.body.user.cell;
	collection.vendorer.find({name:name,psw:psw,cell:cell},function(err,data){
			this.todo = data;
			if(err){
				res.json(err,500);
			}else{
				if(data.length>0){
					res.json(this.todo);
				}else{
					res.json(err,500);
				}
			}
		}
	);
});

//用户注册
router.post('/user', function(req, res, next) {
	var todo = new collection.user(req.body.user);
	var cell = req.body.user.cell;
	collection.user.find({cell:cell},function(err,data){
		if(err){
			res.json(err,500);
		}else{
			if(data.length>0){
				res.json(err,500);
			}else{
				todo.save(function(err){
					if(err){
						res.json(err,500);
					}else{
						res.json(todo);
					}
				});
			}
		}
	});
});

router.post('/clientuser', function(req, res, next) {
	var todo = new collection.clienter(req.body.user);
	var cell = req.body.user.cell;
	collection.clienter.find({cell:cell},function(err,data){
		if(err){
			res.json(err,500);
		}else{
			if(data.length>0){
				res.json(err,500);
			}else{
				todo.save(function(err){
					if(err){
						res.json(err,500);
					}else{
						res.json(todo);
					}
				});
			}
		}
	});
});

router.post('/vendoruser', function(req, res, next) {
	var todo = new collection.vendorer(req.body.user);
	var cell = req.body.user.cell;
	collection.vendorer.find({cell:cell},function(err,data){
		if(err){
			res.json(err,500);
		}else{
			if(data.length>0){
				res.json(err,500);
			}else{
				todo.save(function(err){
					if(err){
						res.json(err,500);
					}else{
						res.json(todo);
					}
				});
			}
		}
	});
});

//用户更新信息
router.post('/clientupdate', function(req, res, next) {
	collection.clienter.findById(req.body.user._id,
		function(err,data){
			var todo = data;
			if(err){
				res.json(err,500);
			}else{
				todo.set(req.body.user);
				todo.save(function(err){
					if(err){
						res.json(err,500);
					}else{
						res.json(todo);
					}
				});
			}
		}
	);
});

router.post('/vendorupdate', function(req, res, next) {
	collection.vendorer.findById(req.body.user._id,
		function(err,data){
			var todo = data;
			if(err){
				res.json(err,500);
			}else{
				todo.set(req.body.user);
				todo.save(function(err){
					if(err){
						res.json(err,500);
					}else{
						res.json(todo);
					}
				});
			}
		}
	);
});

//子账号
router.post('/accountcreat', function(req, res, next) {
	var total = 0;
	var succ = [];
	function creat(num){
		var todo = new collection.vendorer(req.body.user[num]);
		todo.save(function(err){
			total ++;
			if(err){
			}else{
				succ.push(num);
			}
			if(total == req.body.user.length){
				res.json({
					succ: succ
				});
			}
		});
	}
	for(var i = 0; i < req.body.user.length; i++){
		(function(num){
			creat(num);
		})(i)
	}
});

router.get('/accountget/:id', function(req, res, next) {
	var id = req.params.id;
	collection.vendorer.find({cid:id},function(err,data){
			this.todo = data;
			if(err){
				res.json(err,500);
			}else{
				res.json(this.todo);
			}
		}
	);
});


//获取用户列表
router.get('/user/list', function(req, res, next) {
	collection.user.find({},'_id name cell',function(err,data){
			this.todo = data;
			if(err){
				res.json(err,500);
			}else{
				res.json(this.todo);
			}
		}
	);
});

router.get('/user/vendorlist', function(req, res, next) {
	collection.vendorer.find({},'_id name cell',function(err,data){
			this.todo = data;
			if(err){
				res.json(err,500);
			}else{
				res.json(this.todo);
			}
		}
	);
});

//exhibit api
//获取需求列表
router.get('/exhibit/list/:page', function(req, res, next) {
	var page = req.params.page;
	var limit = 20;
	var skip = (page-1)*limit;
	collection.exhibit.count(function(err,count){
		if(err){
			res.json(err,500);
		}else{
			collection.exhibit.find().sort('-created_at').skip(skip).limit(limit).exec(function(err,data){
				if(err){
					res.json(err,500);
				}else{
					res.json({content:data,count:count,limit:limit});
				}
			});
		}
	});
	
});

//获取需求列表
router.get('/exhibit/byvendorid/:id', function(req, res, next) {
	collection.vendorer.find({uid:req.params.id},function(err,data){
		if(err){
			res.json(err,500);
		}else{
			var receivearr = data[0].receive,count=0,result=[];
			for(var i=0;i<receivearr.length;i++){
				collection.exhibit.find({_id:receivearr[i]},function(err,data){
					if(err){
						res.json(err,500);
					}else{
						result.push[data[0]];
						count++;
						if(count==receivearr.length){
							res.json(result);
						}
					}
				});
			}
		}
	});
});

//根据user获取需求列表
router.get('/exhibit/byuid/:id/:page', function(req, res, next) {
	var page = req.params.page;
	var limit = 20;
	var skip = (page-1)*limit;
	collection.exhibit.find({uid:req.params.id}).count(function(err,count){
		if(err){
			res.json(err,500);
		}else{
			collection.exhibit.find({uid:req.params.id}).sort('-created_at').skip(skip).limit(limit).exec(function(err,data){
				if(err){
					res.json(err,500);
				}else{
					res.json({content:data,count:count,limit:limit});
				}
			});
		}
	});
});

//根据id获取需求
router.get('/exhibit/:id', function(req, res, next) {
	collection.exhibit.findById(req.params.id,
		function(err,data){
			this.todo = data;
			if(err){
				res.json(err,500);
			}else{
				res.json(this.todo);
			}
		}
	);
});



//创建需求
router.post('/exhibit', function(req, res, next) {
	this.todo = new collection.exhibit(req.body.exhibit);
	this.todo.save(function(err){
		if(err){
			res.json(err,500);
		}else{
			res.json(this.todo);
		}
	});
});

//修改需求
router.put('/exhibit/:id', function(req, res, next) {
	collection.exhibit.findById(req.params.id,
		function(err,data){
			var todo = data;
			if(err){
				res.json(err,500);
			}else{
				todo.set(req.body.exhibit);
				todo.save(function(err){
					if(err){
						res.json(err,500);
					}else{
						res.json(todo);
					}
				});
			}
		}
	);
});

//修改需求物料
router.put('/exhibit/material/:id', function(req, res, next) {
	collection.exhibit.findById(req.params.id,
		function(err,data){
			var todo = data;
			if(err){
				res.json(err,500);
			}else{
				todo.other = req.body.exhibit.other;
				todo.other_memo = req.body.exhibit.other_memo;
				todo.save(function(err){
					if(err){
						res.json(err,500);
					}else{
						res.json(todo);
					}
				});
			}
		}
	);
});

//发送需求指定id
router.post('/exhibit/send/byuid/:id', function(req, res, next) {
	collection.vendorer.findById(req.params.id,
		function(err,data){
			if(err){
				res.json(err,500);
			}else{
				data.receive.push(req.body.exhibit_id);
				data.save(function(err){
					if(err){
						res.json(err,500);
					}else{
						collection.exhibit.findById(req.body.exhibit_id,
							function(err,data){
								this.exhibit_todo = data;
								if(err){
									res.json(err,500);
								}else{
									this.exhibit_todo.set('state','1');
									this.exhibit_todo.save(function(err){
										if(err){
											res.json(err,500);
										}else{
											res.json(data);
										}
									});
								}
							}
						);
					}
				});
			}
		}
	);
});

//发送所有人
router.post('/exhibit/send', function(req, res, next) {
	collection.user.find(function(err,data){
		this.todo = data;
		if(err){
			res.json(err,500);
		}else{
			for(var i in data){
				data[i].receive.push(req.body.exhibit_id);
				data[i].save();
			}
		}
	});
	collection.exhibit.findById(req.body.exhibit_id,
		function(err,data){
			if(err){
				res.json(err,500);
			}else{
				data.set('state','1');
				data.save();
			}
		}
	);
	res.json({},200);
});

//确认需求交易
router.post('/exhibit/confirm/:id', function(req, res, next) {

	var pingpp = require('pingpp')('sk_test_ibbTe5jLGCi5rzfH4OqPW9KC');//pingappapikey
	pingpp.setPrivateKeyPath(__dirname + "/your_rsa_private_key.pem");
	pingpp.charges.create({
        subject: "Your Subject",
        body: "Your Body",
        amount: 100,//订单总金额, 人民币单位：分（如订单总金额为 1 元，此处请填 100）
        order_no: "123456789",
        channel: "wx",
        currency: "cny",
        client_ip: "127.0.0.1",
        app: {id: "app_1Gqj58ynP0mHeX1q"}
    }, function(err, charge) {
        collection.exhibit.findById(req.params.id,
			function(err,data){
				this.todo = data;
				if(err){
					res.json(err,500);
				}else{
					this.todo.set({state:3});
					this.todo.save(function(err){
						if(err){
							res.json(err,500);
						}else{
							res.json(charge);
						}
					});
				}
			}
		);
    }); 

	
});


//offer api
//获取hotoffer
router.get('/offerhot/:page', function(req, res, next) {
	var page = req.params.page;
	var limit = 20;
	var skip = (page-1)*limit;
	collection.offer.find().count(function(err,count){
		if(err){
			res.json(err,500);
		}else{
			collection.offer.find().sort('-created_at').skip(skip).limit(limit).exec(function(err,data){
				if(err){
					res.json(err,500);
				}else{
					res.json({content:data,count:count,limit:limit});
				}
			});
		}
	});
});

//获取hotoffer带参数
router.get('/offerhot/:page/:clientname/:projectname', function(req, res, next) {
	var page = req.params.page;
	var limit = 20;
	var skip = (page-1)*limit;
	var clientname = req.params.clientname;
	var projectname = req.params.projectname;
	if(req.params.clientname=="nil"){
		clientname = "";
	}
	if(req.params.projectname=="nil"){
		projectname = "";
	}
	collection.offer.find()
		.where('info.clientname').equals(new RegExp(clientname))
		.where('info.name').equals(new RegExp(projectname))
		.count(function(err,count){
		if(err){
			res.json(err,500);
		}else{
			collection.offer.find()
				.where('info.clientname').equals(new RegExp(clientname))
				.where('info.name').equals(new RegExp(projectname))
				.sort('-created_at').skip(skip).limit(limit).exec(function(err,data){
				if(err){
					res.json(err,500);
				}else{
					res.json({content:data,count:count,limit:limit});
				}
			});
		}
	});
});

//根据id获取offer
router.get('/offer/:id', function(req, res, next) {
	collection.offer.findById(req.params.id,
		function(err,data){
			this.todo = data;
			if(err){
				res.json(err,500);
			}else{
				res.json(this.todo);
			}
		}
	);
});

//根据exhibit获取offer
router.get('/offer/byexhibit/:id', function(req, res, next) {
	collection.offer.find({exhibit_id:req.params.id},function(err,data){
			this.todo = data;
			if(err){
				res.json(err,500);
			}else{
				res.json(this.todo);
			}
		}
	);
});

//根据user获取offer
router.get('/offer/byuid/:id/:page', function(req, res, next) {
	var page = req.params.page;
	var limit = 20;
	var skip = (page-1)*limit;
	collection.offer.find({uid:req.params.id}).count(function(err,count){
		if(err){
			res.json(err,500);
		}else{
			collection.offer.find({uid:req.params.id}).sort('-created_at').skip(skip).limit(limit).exec(function(err,data){
				if(err){
					res.json(err,500);
				}else{
					res.json({content:data,count:count,limit:limit});
				}
			});
		}
	});
	
});

//创建offer
router.post('/offer', function(req, res, next) {
	this.todo = new collection.offer(req.body.offer);
	this.todo.save(function(err){
		if(err){
			res.json(err,500);
		}else{
			res.json(this.todo);
		}
	});
});

//修改offer
router.put('/offer/:id', function(req, res, next) {
	collection.offer.findById(req.params.id,
		function(err,data){
			if(err){
				res.json(err,500);
			}else{
				data.set(req.body.offer);
				data.save(function(err){
					if(err){
						res.json(err,500);
					}else{
						res.json(data);
					}
				});
			}
		}
	);
});

//发送offer
router.put('/offer/send/:id', function(req, res, next) {
	collection.offer.findById(req.params.id,
		function(err,data){
			this.todo = data;
			if(err){
				res.json(err,500);
			}else{
				this.todo.set({state:1});
				this.todo.save(function(err){
					if(err){
						res.json(err,500);
					}else{
						res.json(this.todo);
					}
				});
			}
		}
	);
});

//确认offer
router.post('/offer/confirm/:id', function(req, res, next) {
	collection.offer.findById(req.params.id,
		function(err,data){
			if(err){
				res.json(err,500);
			}else{
				data.set({state:2});
				data.save(function(err){
					if(err){
						res.json(err,500);
					}else{
						collection.exhibit.findById(data.exhibit_id,
							function(err,exhibit_data){
								if(err){
									res.json(err,500);
								}else{
									exhibit_data.set({offer_id:data._id,state:2});
									exhibit_data.save(function(err){
										if(err){
											res.json(err,500);
										}else{
											res.json(data);
										}
									});
								}
							}
						);
					}
				});
			}
		}
	);
});


//excel
router.get('/excel', function(req, res, next) {
	var styles = {
	  headerDark: {
	    fill: {
	      fgColor: {
	        rgb: 'FF000000'
	      }
	    },
	    font: {
	      color: {
	        rgb: 'FFFFFFFF'
	      },
	      sz: 14,
	      bold: true,
	      underline: true
	    }
	  },
	  cellPink: {
	    fill: {
	      fgColor: {
	        rgb: 'FFFFCCFF'
	      }
	    }
	  },
	  cellGreen: {
	    fill: {
	      fgColor: {
	        rgb: 'FF00FF00'
	      }
	    }
	  }
	};

	var heading = [
	  [{value: 'a1', style: styles.headerDark}, {value: 'b1', style: styles.headerDark}, {value: 'c1', style: styles.headerDark}],
	  ['a2', 'b2', 'c2'] // <-- It can be only values 
	];

	var specification = {
	  customer_name: { // <- the key should match the actual data key 
	    displayName: 'Customer', // <- Here you specify the column header 
	    headerStyle: styles.headerDark, // <- Header style 
	    cellStyle: function(value, row) { // <- style renderer function 
	      // if the status is 1 then color in green else color in red 
	      // Notice how we use another cell value to style the current one 
	      return (row.status_id == 1) ? styles.cellGreen : {fill: {fgColor: {rgb: 'FFFF0000'}}}; // <- Inline cell style is possible  
	    },
	    width: 120 // <- width in pixels 
	  },
	  status_id: {
	    displayName: 'Status',
	    headerStyle: styles.headerDark,
	    cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property 
	      return (value == 1) ? 'Active' : 'Inactive';
	    },
	    width: '10' // <- width in chars (when the number is passed as string) 
	  },
	  note: {
	    displayName: 'Description',
	    headerStyle: styles.headerDark,
	    cellStyle: styles.cellPink, // <- Cell style 
	    width: 220 // <- width in pixels 
	  }
	}

	var dataset = [
	  {customer_name: 'IBM', status_id: 1, note: 'some note', misc: 'not shown'},
	  {customer_name: 'HP', status_id: 0, note: 'some note'},
	  {customer_name: 'MS', status_id: 0, note: 'some note', misc: 'not shown'}
	];

	var report = excel.buildExport(
	  [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report 
	    {
	      name: 'Sheet name', // <- Specify sheet name (optional) 
	      heading: heading, // <- Raw heading array (optional) 
	      specification: specification, // <- Report specification 
	      data: dataset // <-- Report data 
	    }
	  ]
	);

	res.attachment('report.xlsx'); // This is sails.js specific (in general you need to set headers) 
	res.send(report);

});

module.exports = router;