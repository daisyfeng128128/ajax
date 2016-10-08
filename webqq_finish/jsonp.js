//版权 北京智能社©, 保留所有权利
//url,data,success,error,cbKey,timeout

function jsonp(options){
	
	//整理options
	options = options||{};
	if(!options.url) return;
	options.data=options.data||{};
	options.success=options.success||null;
	options.error=options.error||null;
	options.cbKey=options.cbKey||'cb';
	options.timeout=options.timeout||0;
	
	
	//data少一个回调		{wd:xxx}	
	var cbValue	=	'jsonp'+Math.random();//函数名随机
	
	options.data[options.cbKey]=cbValue.replace('.','');
	
	//在外面做个全局的show,将来会被调用
	window[options.data[options.cbKey]]=function(json){
		
		clearInterval(timer);
		
		options.success && options.success(json);
		//删除script标签	
		document.getElementsByTagName('head')[0].removeChild(oScript);
		window[options.data[options.cbKey]]=null;
	};
		
	var arr=[];
	for(var key in options.data){
		arr.push(key+'='+encodeURIComponent(options.data[key]));	
	}
	
	options.url = options.url+'?'+arr.join('&')//wd=xunlei&cb=show
	
	var oScript=document.createElement('script');
	oScript.src=options.url;
	document.getElementsByTagName('head')[0].appendChild(oScript);
	
	if(options.timeout){
		var timer=setTimeout(function(){
			options.error&& options.error();
			window[options.data[options.cbKey]]=function(){/*人民广场走一圈*/};	
		},options.timeout);	
	}
}
