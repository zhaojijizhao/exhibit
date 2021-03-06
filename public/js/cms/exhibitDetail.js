require(['/js/public/base.js'],function(Base){
  Base.setRequirejs();
  require(['jquery','underscore','backbone','helper'],
    function($,_,Backbone,Helper){
      var tpl = '<form class="form data-form">\
        <div class="form-line">\
          <div class="line-title">会议基本信息</div>\
          <div class="form-pit">\
            <div class="form-subpit">\
              <label>所在城市</label>\
              <select id="city" disabled >\
                <%for(var i=0;i<city.length;i++){%>\
                  <optgroup label="<%=city[i].label%>">\
                    <%for(var j=0;j<city[i].cities.length;j++){%>\
                      <option cid="<%=city[i].cities[j].id%>" <%if(detail.info.cid==city[i].cities[j].id){%>selected<%}%> >\
                        <%=city[i].cities[j].name%>\
                      </option>\
                    <%}%>\
                  </optgroup>\
                <%}%>\
              </select>\
            </div>\
            <div class="form-subpit">\
              <label>会议名字</label>\
              <input id="name" type="text" placeholder="请输入会议名字" value="<%=detail.info.name%>" readonly />\
            </div>\
            <div class="form-subpit">\
              <label>会议日期</label>\
              <input id="datetime" type="date" placeholder="请选择会议日期" value="<%=new Date(detail.info.datetime).toLocaleDateString()%>" readonly />\
            </div>\
            <div class="form-subpit">\
              <label>会议地点</label>\
              <input id="place" type="text" placeholder="请输入会议举办地点" value="<%=detail.info.place%>" readonly />\
            </div>\
            <div class="form-subpit">\
              <label>会议代理人</label>\
              <input id="agent" type="text" placeholder="请输入会议代理人" value="<%=detail.info.agent%>" readonly />\
            </div>\
            <div class="form-subpit">\
              <label>代理人联系方式</label>\
              <input id="agentcell" type="text" placeholder="请输入会议代理人联系手机" value="<%=detail.info.agentcell%>" readonly/>\
            </div>\
          </div>\
        </div>\
        <div class="form-line" id="hotel">\
          <div class="line-title">\
            酒店信息\
          </div>\
          <%if(detail.hotel.length>0){\
            for(var i = 0; i < detail.hotel.length; i++){\
            var v = detail.hotel[i]; %>\
            <div class="form-pit">\
              <div class="form-subpit">\
                <label>入住时间</label>\
                <input class="date_start" type="date" placeholder="请选择开始日期" value="<%=new Date(v.date_start).toLocaleDateString()%>" readonly />\
              </div>\
              <div class="form-subpit">\
                <label>退房时间</label>\
                <input class="date_end" type="date" placeholder="请选择结束日期" value="<%=new Date(v.date_end).toLocaleDateString()%>" readonly />\
              </div>\
              <div class="form-subpit">\
                <label>酒店名称</label>\
                <input class="name" type="text" placeholder="请输入酒店名称" value="<%=v.name%>" readonly />\
              </div>\
              <div class="form-subpit">\
                <label>房型</label>\
                <select class="type" disabled>\
                  <option <%if(v.type_id==1){%>selected<%}%> type_id="1">大床房</option>\
                  <option <%if(v.type_id==2){%>selected<%}%> type_id="2">双床房</option>\
                  <option <%if(v.type_id==3){%>selected<%}%> type_id="3">行政房</option>\
                  <option <%if(v.type_id==4){%>selected<%}%> type_id="4">套房</option>\
                </select>\
              </div>\
              <div class="form-subpit">\
                <label>房间数</label>\
                <input class="room" type="tel" placeholder="请输入房间数" value="<%=v.room%>" readonly/>\
              </div>\
              <div class="form-subpit">\
                <label>天数</label>\
                <input class="days" type="tel" placeholder="请输入天数" value="<%=v.days%>" readonly/>\
              </div>\
            </div>\
          <%}}%>\
          <div class="memoup">备注</div>\
          <textarea class="memo" placeholder="请输入备注信息"><%=detail.hotel_memo%></textarea>\
        </div>\
        <div class="form-line" id="area">\
          <div class="line-title">\
            会场信息\
          </div>\
          <%if(detail.area.length>0){\
            for(var i = 0; i < detail.area.length; i++){\
            var v=detail.area[i];%>\
            <div class="form-pit">\
              <div class="form-subpit">\
                <label>会场开始日期</label>\
                <input class="date_start" type="date" placeholder="请选择开始使用日期" value="<%=new Date(v.date_start).toLocaleDateString()%>" readonly />\
              </div>\
              <div class="form-subpit">\
                <label>会场结束日期</label>\
                <input class="date_end" type="date" placeholder="请选择结束使用日期" value="<%=new Date(v.date_end).toLocaleDateString()%>" readonly />\
              </div>\
              <div class="form-subpit">\
                <label>选择会场类型</label>\
                <select class="type" disabled>\
                  <option <%if(v.type_id==1){%>selected<%}%> type_id="1">剧院</option>\
                  <option <%if(v.type_id==2){%>selected<%}%> type_id="2">课桌</option>\
                  <option <%if(v.type_id==3){%>selected<%}%> type_id="3">U型</option>\
                  <option <%if(v.type_id==4){%>selected<%}%> type_id="4">鱼骨</option>\
                  <option <%if(v.type_id==5){%>selected<%}%> type_id="5">董事会</option>\
                </select>\
              </div>\
              <div class="form-subpit">\
                <label>人数</label>\
                <input class="people" type="tel" placeholder="请输入人数" value="<%=detail.info.people%>" readonly />\
              </div>\
              <div class="form-subpit">\
                <label>天数</label>\
                <input class="days" type="tel" placeholder="请输入天数" value="<%=detail.info.days%>" readonly />\
              </div>\
            </div>\
          <%}}%>\
          <div class="memoup">备注</div>\
          <textarea class="memo" placeholder="请输入备注信息" readonly><%=detail.area_memo%></textarea>\
        </div>\
        <div class="form-line" id="dinner">\
          <div class="line-title">\
            用餐信息\
          </div>\
          <%if(detail.dinner.length>0){\
            for(var i = 0 ; i< detail.dinner.length ; i++){\
            var v=detail.dinner[i];%>\
            <div class="form-pit">\
              <div class="form-subpit">\
                <label>用餐日期</label>\
                <input class="date_start" type="date" placeholder="请选择日期" value="<%=new Date(v.date_start).toLocaleDateString()%>" readonly />\
              </div>\
              <!--<div class="form-subpit">\
                <label>用餐结束日期</label>\
                <input class="date_end" type="date" placeholder="请选择结束日期" value="<%=new Date(v.date_end).toLocaleDateString()%>" readonly />\
              </div>-->\
              <div class="form-subpit">\
                <label>选择餐厅形式</label>\
                <select class="type" disabled >\
                  <option <%if(v.type_id==1){%>selected<%}%> type_id="1">无指定餐厅</option>\
                  <option <%if(v.type_id==2){%>selected<%}%> type_id="2">自助</option>\
                  <option <%if(v.type_id==3){%>selected<%}%> type_id="3">围桌</option>\
                </select>\
              </div>\
              <div class="form-subpit">\
                <label>人数</label>\
                <input class="people" type="tel" placeholder="请输入人数" value="<%=v.people%>" readonly />\
              </div>\
              <div class="form-subpit">\
                <label>午餐或晚餐</label>\
                <select class="days" value="<%=v.days%>" readonly>\
                  <option value="0">午餐</option>\
                  <option value="1">晚餐</option>\
                </select>\
              </div>\
            </div>\
          <%}}%>\
          <div class="memoup">备注</div>\
          <textarea class="memo" placeholder="请输入备注信息" readonly ><%=detail.dinner_memo%></textarea>\
        </div>\
        <div class="form-line" id="car">\
          <div class="line-title">\
            用车信息\
          </div>\
          <%if(detail.car.length>0){\
            for(var i = 0; i < detail.car.length ; i++){\
            var v=detail.car[i];%>\
            <div class="form-pit">\
              <div class="form-subpit">\
                <label>选择车型</label>\
                <select class="type" disabled>\
                  <option <%if(v.type_id==1){%>selected<%}%> type_id="1">轿车（3座）</option>\
                  <option <%if(v.type_id==2){%>selected<%}%> type_id="2">商务车（5座）</option>\
                  <option <%if(v.type_id==3){%>selected<%}%> type_id="3">考斯特（19座）</option>\
                  <option <%if(v.type_id==4){%>selected<%}%> type_id="4">中巴车（33座）</option>\
                  <option <%if(v.type_id==5){%>selected<%}%> type_id="5">大巴车（45座）</option>\
                  <option <%if(v.type_id==6){%>selected<%}%> type_id="6">大巴车（53座）</option>\
                </select>\
              </div>\
              <div class="form-subpit">\
                <label>用车车辆</label>\
                <input class="people" type="tel" placeholder="请输入车辆" value="<%=detail.info.people%>" readonly />\
              </div>\
              <div class="form-subpit">\
                <label>次数</label>\
                <input class="days" type="tel" placeholder="请输入次数" value="<%=detail.info.days%>" readonly />\
              </div>\
              <div class="form-subpit">\
                <label>用车形式</label>\
                <select class="usage" value="<%=v.usage%>" readonly>\
                  <option value="0">接送机</option>\
                  <option value="1">全天用车</option>\
                </select>\
              </div>\
            </div>\
          <%}}%>\
          <div class="memoup">备注</div>\
          <textarea class="memo" placeholder="请输入备注信息" readonly><%=detail.car_memo%></textarea>\
        </div>\
        <div class="form-line" id="other">\
          <div class="line-title">\
            其他\
          </div>\
          <%if(detail.other.length>0){\
            for(var i = 0 ; i < detail.other.length ; i++){\
            var v=detail.other[i];%>\
            <div class="form-pit">\
              <div class="form-subpit">\
                <label>物料类型</label>\
                <select class="type" disabled>\
                  <option <%if(v.type_id==1){%>selected<%}%> type_id="1">摄影/摄像</option>\
                  <option <%if(v.type_id==2){%>selected<%}%> type_id="2">胸牌制作</option>\
                  <option <%if(v.type_id==3){%>selected<%}%> type_id="3">X展架/易拉宝 </option>\
                  <option <%if(v.type_id==4){%>selected<%}%> type_id="4">背景板</option>\
                  <option <%if(v.type_id==5){%>selected<%}%> type_id="5">横幅</option>\
                  <option <%if(v.type_id==6){%>selected<%}%> type_id="6">资料打印</option>\
                  <option <%if(v.type_id==7){%>selected<%}%> type_id="7">礼品制作</option>\
                </select>\
              </div>\
              <div class="form-subpit">\
                <label>是否需要</label>\
                <select class="need" disabled>\
                  <option <%if(!v.need){%>selected<%}%> need="0">否</option>\
                  <option <%if(v.need){%>selected<%}%> need="1">是</option>\
                </select>\
              </div>\
            </div>\
          <%}}%>\
          <div class="memoup">备注</div>\
          <textarea class="memo" placeholder="请输入备注信息" readonly><%=detail.other_memo%></textarea>\
        </div>\
        <div class="form-line" id="with">\
          <div class="line-title">陪同人员</div>\
          <div class="form-pit">\
            <div class="form-subpit"> \
              <label>是否需要陪同</label>\
              <select class="with_need" disabled>\
                <option <%if(!detail.with.with_need){%>selected<%}%> need="0">否</option>\
                <option <%if(detail.with.with_need){%>selected<%}%> need="1">是</option>\
              </select>\
            </div>\
            <div class="form-subpit"> \
              <label>陪同天数</label>\
              <input class="with_people" type="tel" placeholder="请填写陪同天数" value="<%=detail.with.with_people%>" readonly />\
            </div>\
            <div class="form-subpit"> \
              <label>陪同人数</label>\
              <input class="with_people_num" type="tel" placeholder="请填写陪同人数" value="<%=detail.with.with_people_num%>" readonly/>\
            </div>\
            <div class="form-subpit"> \
              <label>是否需要地接</label>\
              <select class="catch_need" disabled >\
                <option <%if(!detail.with.catch_need){%>selected<%}%> need="0">否</option>\
                <option <%if(detail.with.catch_need){%>selected<%}%> need="1">是</option>\
              </select>\
            </div>\
            <div class="form-subpit"> \
              <label>地接天数</label>\
              <input class="catch_people" type="tel" placeholder="请填写地接天数" value="<%=detail.with.catch_people%>" readonly />\
            </div>\
            <div class="form-subpit"> \
              <label>地接人数</label>\
              <input class="catch_people_num" type="tel" placeholder="请填写地接人数" value="<%=detail.with.catch_people_num%>" readonly/>\
            </div>\
          </div>\
        </div>\
        <div class="form-line" id="invoice">\
          <div class="line-title">发票</div>\
          <div class="form-pit">\
            <div class="form-subpit"> \
              <label>是否需要发票</label>\
              <select class="need" disabled>\
                <option <%if(!detail.inv.need){%>selected<%}%> need="0">否</option>\
                <option <%if(detail.inv.need){%>selected<%}%> need="1">是</option>\
              </select>\
            </div>\
            <div class="form-subpit">\
              <label>发票类型</label>\
              <select class="t ype" disabled >\
                <option <%if(detail.inv.type_id==1){%>selected<%}%>  type_id="1">普通发票</option>\
                <option <%if(detail.inv.type_id==2){%>selected<%}%>  type_id="2">增值税发票</option>\
              </select>\
            </div>\
          </div>\
        </div>\
        <%if(detail.state == 0){%>\
        <a class="btn-a" id="pass">通过审核</a>\
        <a class="btn-a" id="fail">未能通过审核</a>\
        <%}%>\
      </form>';
      var view = Backbone.View.extend({
        initialize:function(){
        },
        el:$("#main"),
        events:{
        },
        render:function(){
          var city = Helper.city;
          var _this = this;
          $.ajax({
            url:'/api/cmsexhibitdetail/'+location.href.split('eid=')[1],
            type: 'get',
            dataType: 'json',
            success:function(data){
              _this.detail = data[0];
              $('#detail').html(_.template(tpl)({detail:data[0],city:city}));
            },
            error:function(){
              alert('获取信息失败');
            }
          });
          $(document).on('click','#pass',function(){
            _this.detail.state = 1;
            $.ajax({
              url:'/api/cmsexhibitpass/'+location.href.split('eid=')[1],
              type: 'post',
              data: {exhibit:_this.detail},
              dataType: 'json',
              success:function(data){
                alert("审核通过成功");
                history.back();
              },
              error:function(){
                alert('审核通过失败');
              }
            });
          });
          $(document).on('click','#fail',function(){
            _this.detail.state = 4;
            $.ajax({
              url:'/api/cmsexhibitfail/'+location.href.split('eid=')[1],
              type: 'post',
              data: {exhibit:_this.detail},
              dataType: 'json',
              success:function(data){
                alert("未能审核通过成功");
                history.back();
              },
              error:function(){
                alert('未能审核通过失败');
              }
            });
          });
        }
      });
      var page = new view();
      page.render();
  });
});