window.onload=function(){
	//验证用户名
	/*get
	guestbook/index.php
		m:index
		a:verifyUserName //http://localhost/messBoard-ajax/guestbook/index.php?m=index&a=verifyUserName验证用户名的接口
		username:要验证的用户名
	返回数据类型
	{
		code:返回的信息代码 0=没有错误，1=有错误
		message:返回的信息 具体返回信息
	}
	*/
	var oUser=document.getElementById("user");
	var oReg=document.getElementById("reg");
	var oLogin=document.getElementById("login");
	var oUserInfo=document.getElementById("userinfo");

	var oUserName1=document.getElementById("username1");
	var oVerifyUserNameMsg=document.getElementById("verifyUserNameMsg");
	
	//初始化cookie
	var uid=getCookie('uid');
	var username=getCookie('username');
	if (uid) {
		//如果是登录状态
		oUserInfo.innerHTML=username;
		oReg.style.display=oLogin.style.display='none';
	}else{
		oUser.style.display='none';
	}

	oUserName1.onblur=function(){
		ajax('get','guestbook/index.php','m=index&a=verifyUserName&username='+this.value,function(data){
			//alert(data);	
			var d=JSON.parse(data);
			oVerifyUserNameMsg.innerHTML=d.message;
			if(d.code){
				oVerifyUserNameMsg.style.color="red";
			}else{
				oVerifyUserNameMsg.style.color="green";
			}
			
		});
		
	};
	
	//验证用户名
	/*get/post  此处最好用post
	guestbook/index.php
		m:index
		a:reg 
		username:要注册的用户名
		password:要注册的密码
	返回数据类型
	{
		code:返回的信息代码 0=没有错误，1=有错误
		message:返回的信息 具体返回信息
	}
	*/
	var oRegBtn=document.getElementById("btnReg");
	var oPassword1=document.getElementById("password1");
	oRegBtn.onclick=function(){
		ajax('post','guestbook/index.php','m=index&a=reg&username='+encodeURI(oUserName1.value)+'&password='+oPassword1.value,function(data){
			var d=JSON.parse(data);
			alert(d.message);
		
		})
	
	}
	
	//用户登录
	/*get/post
	guestbook/index.php
		m:index
		a:reg 
		username:要登录的用户名
		password:登录的密码
	返回数据类型
	{
		code:返回的信息代码 0=没有错误，1=有错误
		message:返回的信息 具体返回信息
	}
	*/
	
	var oUserName2=document.getElementById("username2");
	var oPassWord2=document.getElementById("password2");
	var oBtnLogin=document.getElementById("btnLogin");
	oBtnLogin.onclick=function(){
		ajax('post','guestbook/index.php','m=index&a=login&username='+encodeURI(oUserName2.value)+'&password='+oPassWord2.value,function(data){
			var d=JSON.parse(data);
			alert(d.message);
		
		})
	
	}
	//取cookie
	function getCookie(key){
		//console.log(key)
		var arr1=document.cookie.split(';');
		//console.log(typeof (arr1))

		for(var i=0;i<arr1.length;i++){
			var arr2=arr1[i].split('=');

			console.log(arr1[i]);
			if (key==arr2[0]) {
				return arr2[1];
			}
			
			
		}
		return '';
		
	}
	
	
	
	
	
	
	
	
	
	


}