//版权 北京智能社©, 保留所有权利
function removeCookie(name){
	//document.cookie;
	//document.cookie=value+过去时间;
	setCookie(name,'',-1);
}

function getCookie(name){
	//alert(document.cookie);	//'address=xxx; user=alex; lide=sleep'
	var arr=document.cookie.split('; ');
	for(var i=0;i<arr.length;i++){
		var arr2=arr[i].split('=');	//['user','alex']	
		if(name==arr2[0]){
			return arr2[1];
		}
	}
	return '';
}

function setCookie(name,value,timeout){
	var d=new Date();
	d.setDate(d.getDate()+timeout)
	document.cookie= name+'='+value+';expires='+d;	
}