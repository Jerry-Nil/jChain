/**
* jQuery chained plugin
* This jquery plugin based on the value of a select element to change the value of another select element.
* @name jquery-chained.js
* @author Jerry
* @version 1.2.1
* @date February 24, 2012
* @category jQuery plugin
* @copyright (c) 2012 Jerry
* @weibo http://weibo.com/jerrynil
* @email jerry.hz.china@gmail.com
* @QQ superzcj_001@163.com
*/
(function($){
	$.extend({'cf':false,'debug':true});
	var _self=$.fn;
	if(typeof(console)!=='undefined'){$.cf=true;}
	/**
	* @param boolean debug
	*/
	$.setDebug = function(){
		if(typeof(arguments[0])==='boolean'){
			$.debug=arguments[0];
		}
		return ($.cf && $.debug);
	};
	/**
	* Output log information to the console
	*/
	$.log = function(){
		if($.cf && $.debug){
			if(arguments.length===1){
				console.log(arguments[0]);
			}
			else if(arguments.length>1){
				var code="console.log(arguments[0]";
				for(var i=1;i<arguments.length;i++){
					code=code+",arguments["+i+"]";
				}
				code=code+");";
				eval(code);
			}
		}
	};
	_self.log = function(){
		$.log("%o", $(this)[0]);
		return $(this);
	};
	/**
	* Output a warning message to the console
	*/
	$.warn = function(){
		if($.cf && $.debug){
			if(arguments.length===1){
				console.warn(arguments[0]);
			}
			else if(arguments.length>1){
				var code="console.warn(arguments[0]";
				for(var i=1;i<arguments.length;i++){
					code=code+",arguments["+i+"]";
				}
				code=code+");";
				eval(code);
			}
		}
	};
	/**
	* Output error message to the console
	*/
	$.error = function(){
		if($.cf && $.debug){
			if(arguments.length===1){
				console.error(arguments[0]);
			}
			else if(arguments.length>1){
				var code="console.error(arguments[0]";
				for(var i=1;i<arguments.length;i++){
					code=code+",arguments["+i+"]";
				}
				code=code+");";
				eval(code);
			}
		}
	};
	/**
	* add an option into the select element
	* @param string value
	* @param string	text
	*/
	_self.addOption = function(){
		var option=arguments[0];
		if(typeof($(this)[0])==='undefined'){
			$.warn("Not found.");
			return this;
		}
		if($(this)[0].tagName!=='SELECT'){
			$.warn("The type of tag is not correct.");
			return this;
		}
		if(typeof(option)!=='object'){
			$.warn("The parameter is incorrect.");
			return this;
		}
		if(typeof(option.value)==='undefined' || typeof(option.text)==='undefined'){
			$.warn("The parameter is empty.");
			return this;
		}
		var optionElement="<option value="+option.value+">"+option.text+"</option>";
		$(this).append(optionElement);
		return this;
	};
	/**
	* remove all options
	*/
	_self.clearOptions = function(){
		if(typeof($(this)[0])==='undefined'){
			$.warn("Not found.");
			return this;
		}
		if($(this)[0].tagName!=='SELECT'){
			$.warn("The type of tag is not correct.");
			return this;
		}
		$(this).text('');
		return this;
	};
	/**
	* get the value of the currently selected option
	*/
	_self.getSelectedOptionValue = function(){
		var $this=$(this)[0];
		if(typeof($this)==='undefined'){
			$.log("Not found.");
			return;
		}
		if($this.tagName!=='SELECT'){
			$.log("The type of tag is not correct.");
			return;
		}
		if($this.options.length===0){
			$.warn("The select is empty.");
			return;
		}
		return $this[$this.selectedIndex].value;
	};
	/**
	* core function
	* @param string target
	* @param string url
	* @param string value
	* @param string text
	* @param boolean autorun
	*/
	_self.chained = function(){
		//获得参数
		var $this=$(this);
		var args=arguments[0];
		if(typeof($(this)[0])==='undefined'){
			$.warn("Not found.");
			return;
		}
		//如果标签类型不对就退出
		if($(this)[0].tagName!=='SELECT'){
			$.warn("The type of element is not correct.");
			return;
		}
		//如果没有任何参数就退出
		if(typeof(args)==='undefined'){
			$.warn('arguments not found');
			return $this;
		}
		//初始化
		var i=0;
		var target=args.target;
		var url=args.url;
		var autorun=args.autorun||false;
		var defalutOption={value:args.value||'0',text:args.text||'--'};
		//检测参数是否正确
		if(typeof(target)==='undefined'){
			$.warn('target is not defined.');
			return $this;
		}
		if(typeof(url)==='undefined'){
			$.warn('url is not defined.');
			return $this;
		}
		$(target).addOption(defalutOption);
		$this.change(function()
		{
			$.log("Target:%o\nURL:%s", $(target), url);
			var sv=$this.getSelectedOptionValue();
			$.get(url,{opt:sv},function(data){
				$(target).clearOptions();
				$(target).addOption(defalutOption);
				$.log("Data Type:%s\nData:%o", typeof(data), data);
				if(typeof(data)==='undefined'||typeof(data)!=='object'){
					$.warn("The type of data is not correct.");
					return $this;
				}
				else if(typeof(data.options)==='object'){
					$.log("Options Type:%s\nData:%o", typeof(data.options), data.options);
					for(i=0;i<data.options.length;i++){
						$(target).addOption(data.options[i]);
					}
				}
				else if(typeof(data.options)==='undefined'&&typeof(data[sv])==='object'){
					var dataChild=data[sv];
					$.log("Data(child) Type:%s\nData:%o", typeof(dataChild), dataChild);
					for(i=0;i<dataChild.options.length;i++){
						$(target).addOption(dataChild.options[i]);
					}
				}
				else if(typeof(data[sv])==='undefined'){
					$.warn("Unknown Data.\n%o", data);
				}
				else{
					$.error("Unknown Error.\n%o", data);
				}
			},"json");
		});
		if(autorun){
			$this.change();
		}
		return $(target);
	};
})(jQuery);