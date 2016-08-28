require(['/js/public/base.js'],function(Base){
  Base.setRequirejs();
  require(['jquery','underscore','backbone','helper'],
    function($,_,Backbone,Helper){
      var template = '<form class="form profile">\
        <ul>\
          <li>\
            <label>用户名:</label>\
            <input type="text" id="userName" value="<%=user.name%>" disabled />\
          </li>\
          <li>\
            <label>真实姓名:</label>\
            <input type="text" id="userRealName" value="<%=user.realname%>" />\
          </li>\
          <li>\
            <label>性别:</label>\
            <input type="radio" name="userGender" class="userGender" value="1" <%if(!user.gender || user.gender==1){%>checked<%}%> />男&nbsp;\
            <input type="radio" name="userGender" class="userGender" value="2" <%if(user.gender==2){%>checked<%}%> />女\
          </li>\
          <li>\
            <label>联系方式:</label>\
            <input type="text" id="userCell" value="<%=user.cell%>" />\
          </li>\
          <li>\
            <label>个人邮箱:</label>\
            <input type="text" id="userMail" value="<%=user.mail%>" />\
          </li>\
          <li>\
            <label>工作城市:</label>\
            <select id="userCity" value="<%=user.workcity%>" >\
              <%_.each(cities,function(v,k){%>\
                <optgroup label="<%=v.label%>">\
                  <%_.each(v.cities,function(city,index){%>\
                    <option value="<%=city.id%>"><%=city.name%></option>\
                  <%})%>\
                </optgroup>\
              <%})%>\
            </select>\
          </li>\
          <li>\
            <label>任职公司:</label>\
            <input id="userCompany" type="text" value="<%=user.company%>" />\
          </li>\
        </ul>\
        <label></label>\
        <button id="save">保存</button>\
        </form>';
      var template1 = '<form class="form collect">\
        <p>我收藏的供应商</p>\
        <ul>\
          <li>\
          </li>\
        </ul>\
        <p>我收藏的需求</p>\
        <ul>\
          <li>\
          </li>\
        </ul>\
        </form>';
      var view = Backbone.View.extend({
        initialize:function(){
          _.bind(Helper.initHead, this)(Helper);
        },
        el:$("#main"),
        events:{
          'click .toptab li':'page',
          'click #changepsw':'changepsw',
          'click #send':'send',
          'click #bindcell':'bindcell',
          'click #bindmail':'bindmail'
        },
        render:function(){
          var _this = this;
          this.renew();
          this.getcollect();
          $(document).on('click','#save',function(e){
            e.preventDefault();
            _this.save();
          });
        },
        getcollect:function(){
          var temp = _.template(template1);
          $("#mycollect").html(temp({
            exhibit: [],
            clients: []
          }));
        },
        save: function(e){
          var url = "/api/";
          this.user = Helper.getlogin();
          if(this.user.type=="client"){
            url +="clientupdate";
          }else if(this.user.type=="vendor"){
            url +="vendorupdate";
          }
          $.ajax({
            url: url,
            type: 'post',
            data: {
              user:{
                _id: this.user._id,
                name: $('#userName').val(),
                psw: this.user.psw,
                realname:$('#userRealName').val(),
                gender:$('.userGender:checked').val(),
                cell:$('#userCell').val(),
                mail:$('#userMail').val(),
                city:$('#userCity').val(),
                company:$('#userCompany').val()
              }
            },
            dataType:"json",
            success:function(data){
              this.user = data;
              Helper.setlogin(data);
              alert("更新用户信息成功");
            },
            error:function(){
              alert("更新用户信息失败");
            }
          });
        },
        renew: function(){
          var url = "/api/";
          this.user = Helper.getlogin();
          if(this.user.type=="client"){
            url +="clientlogin";
          }else if(this.user.type=="vendor"){
            url +="vendorlogin";
          }
          $.ajax({
            url: url,
            type: 'post',
            data: {
              user:{
                name: this.user.name,
                psw: this.user.psw
              }
            },
            dataType:"json",
            success:function(data){
              var temp = _.template(template);
              $("#userinfo").html(temp({
                user: data[0],
                cities: Helper.city
              }));
            },
            error:function(){
              alert("获取用户信息失败");
            }
          });
        },
        page:function(e){
          var index = $(e.target).index();
          $(e.target).addClass('on');
          $(e.target).siblings('li').removeClass('on');
          $('.proin li').removeClass('on');
          $($('.proin>li')[index]).addClass('on');
        },
        changepsw:function(e){
          e.preventDefault();
          if($('#oldpsw').val() != this.user.psw){
            alert('原密码输入有误');
            return false;
          }
          if(!$('#newpsw').val()){
            alert('请输入密码');
            return false;
          }
          if($('#newpsw').val() != $('#checknewpsw').val()){
            alert('请确认两次密码一致');
            return false;
          }
          var url = "/api/";
          this.user = Helper.getlogin();
          if(this.user.type=="client"){
            url +="clientupdate";
          }else if(this.user.type=="vendor"){
            url +="vendorupdate";
          }
          $.ajax({
            url: url,
            type: 'post',
            data: {
              user:{
                _id: this.user._id,
                psw: $('#newpsw').val()
              }
            },
            dataType:"json",
            success:function(data){
              this.user = data;
              Helper.setlogin(data);
              alert("修改密码成功");
            },
            error:function(){
              alert("修改密码失败");
            }
          });
        },
        send:function(e){
          e.preventDefault();
          alert('短信已经发送，请查收');
        },
        bindcell:function(e){
          e.preventDefault();
          if(!$('#cellbind').val()){
            alert('请输入手机号');
            return false;
          }
          if(!$('#cellcheck').val()){
            alert('请输入验证码');
            return false;
          }
          var url = "/api/";
          this.user = Helper.getlogin();
          if(this.user.type=="client"){
            url +="clientupdate";
          }else if(this.user.type=="vendor"){
            url +="vendorupdate";
          }
          $.ajax({
            url: url,
            type: 'post',
            data: {
              user:{
                _id: this.user._id,
                cell: $('#cellbind').val()
              }
            },
            dataType:"json",
            success:function(data){
              this.user = data;
              Helper.setlogin(data);
              alert("绑定手机成功");
            },
            error:function(){
              alert("绑定手机失败");
            }
          });

        },
        bindmail:function(e){
          e.preventDefault();
          if(!$('#mailbind').val()){
            alert('请输入邮箱地址');
            return false;
          }
          var url = "/api/";
          this.user = Helper.getlogin();
          if(this.user.type=="client"){
            url +="clientupdate";
          }else if(this.user.type=="vendor"){
            url +="vendorupdate";
          }
          $.ajax({
            url: url,
            type: 'post',
            data: {
              user:{
                _id: this.user._id,
                mail: $('#mailbind').val()
              }
            },
            dataType:"json",
            success:function(data){
              this.user = data;
              Helper.setlogin(data);
              alert("绑定邮箱成功");
            },
            error:function(){
              alert("绑定邮箱失败");
            }
          });

        }
      });
      var page = new view();
      page.render();
  });
});