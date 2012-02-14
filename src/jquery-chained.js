/**
 * jQuery chained plugin
 * This jquery plugin based on the value of a select tag to change the value of another select tag.
 * @name jquery-chained.js
 * @author Jerry
 * @version 1.2.1
 * @date February 14, 2012
 * @category jQuery plugin
 * @copyright (c) 2012 Jerry
 * @weibo http://weibo.com/jerrynil
 * @email jerry.hz.china@gmail.com
 * @QQ superzcj_001@163.com
 */
var debug=true;
cf=false;
if(typeof(console)!='undefined'){cf=true;}
cf=cf&&debug;
(function($){
	/**
	 * Output log information to the console
	 */
	$.log = function(){
		if(cf){
			if(arguments.length==1){
				console.log(arguments[0]);
			}
			else if(arguments.length>1){
				var code="console.log(arguments[0]";
				for(i=1;i<arguments.length;i++){
					code=code+",arguments["+i+"]";
				}
				code=code+");";
				eval(code);
			}
		}
	};
	$.fn.log = function(){
		$.log("%o", $(this)[0]);
		return $(this);
	}
	/**
	 * Output a warning message to the console
	 */
	$.warn = function(){
		if(cf){
			if(arguments.length==1){
				console.warn(arguments[0]);
			}
			else if(arguments.length>1){
				var code="console.warn(arguments[0]";
				for(i=1;i<arguments.length;i++){
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
		if(cf){
			if(arguments.length==1){
				console.error(arguments[0]);
			}
			else if(arguments.length>1){
				var code="console.error(arguments[0]";
				for(i=1;i<arguments.length;i++){
					code=code+",arguments["+i+"]";
				}
				code=code+");";
				eval(code);
			}
		}
	};
	/**
	 * add an option into the select tag
	 * @param json item
	 * - value string	value of the option
	 * - text string	innerHTML of the option
	 */
	$.fn.addOption = function(item){
		var $this=$(this)[0];
		if(typeof($this)=='undefined'){
			if(cf){console.warn("Not found.");}
			return;
		}
		if($this.tagName!='SELECT'){
			if(cf){console.warn("The type of tag is not correct.");}
			return;
		}
		if(typeof(item)=='undefined'){
			if(cf){console.warn("The parameter is incorrect.");}
			return;
		}
		if(typeof(item.value)=='undefined' || typeof(item.text)=='undefined'){
			if(cf){console.warn("The parameter is empty.");}
			return;
		}
		var option="<option value="+item.value+">"+item.text+"</option>";
		$(this).append(option);
		return;
	};
	/**
	 * remove all options
	 */
	$.fn.clearOptions = function(){
		var $this=$(this)[0];
		if(typeof($this)=='undefined'){
			if(cf){console.warn("Not found.");}
			return;
		}
		if($this.tagName!='SELECT'){
			if(cf){console.warn("The type of tag is not correct.");}
			return;
		}
		$(this).text('');
		return;
	};
	/**
	 * get the value of the currently selected option
	 */
	$.fn.getSelectedOptionValue = function(){
		var $this=$(this)[0];
		if(typeof($this)=='undefined'){
			if(cf){console.log("Not found.");}
			return;
		}
		if($this.tagName!='SELECT'){
			if(cf){console.log("The type of tag is not correct.");}
			return;
		}
		if($this.options.length==0){
			if(cf){console.warn("The select is empty.");}
			return null;
		}
		return $this[$this.selectedIndex].value;
	};
	/**
	 * core function
	 * @param string targetId
	 * @param string url
	 * @param string value
	 * @param string text
	 * @param boolean autorun
	 */
	$.fn.chained = function(){
		//获得参数
		var $this=$(this);
		var args=arguments[0];
		//如果没有任何参数就退出
		if(typeof(args)=='undefined'){
			if(cf){console.warn('No args.');}
			return $this;
		}
		//初始化
		var targetId='#'+args.targetId;
		var url=args.url;
		var autorun=args.autorun||false;
		var defalutOption={value:args.value||'0',text:args.text||'------',};
		//检测参数是否正确
		if(typeof(targetId)=='undefined'){
			if(cf){console.warn('targetId is not defined.');}
			return $this;
		}
		if(typeof(url)=='undefined'){
			if(cf){console.warn('url is not defined.');}
			return $this;
		}
		$(targetId).addOption(defalutOption);
		$this.change(function()
		{
			if(cf){console.log("Target:%o\nURL:%s", $(targetId), url);}
			var sv=$this.getSelectedOptionValue();
			$.get(url,{opt:sv},function(data){
				$(targetId).clearOptions();
				$(targetId).addOption(defalutOption);
				if(cf){console.log("Data Type:%s\nData:%o", typeof(data), data);}
				if(typeof(data)=='undefined'||typeof(data)!='object'){
					if(cf){console.warn("The type of data is not correct.");}
					return $this;
				}
				else if(typeof(data.options)=='object'){
					if(cf){console.log("Options Type:%s\nData:%o", typeof(data.options), data.options);}
					for(i=0;i<data.options.length;i++){
						$(targetId).addOption(data.options[i]);
					};
				}
				else if(typeof(data.options)=='undefined'&&typeof(data[sv])=='object'){
					var dataChild=data[sv];
					if(cf){console.log("Data(child) Type:%s\nData:%o", typeof(dataChild), dataChild);}
					for(i=0;i<dataChild.options.length;i++){
						$(targetId).addOption(dataChild.options[i]);
					};
				}
				else if(typeof(data[sv])=='undefined'){
					if(cf){console.warn("Unknown Data.\n%o", data);}
				}
				else{
					if(cf){console.error("Unknown Error.\n%o", data);}
				}
			},"json");
		});
		if(autorun){
			$this.change();
		}
		return $(targetId);
	};
})(jQuery);