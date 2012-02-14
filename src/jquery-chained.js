/**
 * jQuery chained plugin
 * This jquery plugin based on the value of a select tag to change the value of another select tag.
 * @name jquery-chained.js
 * @author Jerry
 * @version 1.2.0
 * @date February 7, 2012
 * @category jQuery plugin
 * @copyright (c) 2012 Jerry
 * @weibo http://weibo.com/jerrynil
 * @email jerry.hz.china@gmail.com
 * @QQ superzcj_001@163.com
 */
var debug=true;
var cf=false;
if(typeof(console)!='undefined'){cf=true;}
cf=cf&debug;
(function($){
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
	 * @param json options
	 * - targetId
	 * - url
	 * - value
	 * - text
	 */
	$.fn.chained = function(options){
		var $this=$(this);
		if(typeof(options)=='undefined'){
			if(cf){console.warn('No options.');}
			return;
		}
		var targetId=options.targetId;
		var url=options.url;
		var autorun=options.autorun||false;
		var defalutOption={value:options.value||'0',text:options.text||'------',};
		if(typeof(targetId)=='undefined'){
			if(cf){console.warn('targetId is not defined.');}
			return;
		}
		if(typeof(url)=='undefined'){
			if(cf){console.warn('url is not defined.');}
			return;
		}
		$('#'+targetId).addOption(defalutOption);
		$this.change(function()
		{
			if(cf){console.log("Target:%o\nURL:%s", $('#'+targetId), url);}
			var sv=$this.getSelectedOptionValue();
			$.get(url,{opt:sv},function(data){
				$('#'+targetId).clearOptions();
				$('#'+targetId).addOption(defalutOption);
				if(cf){console.log("Data Type:%s\nData:%o", typeof(data), data);}
				if(typeof(data)=='undefined'||typeof(data)!='object'){
					//if(cf){console.log("Data Type:%s\nData:%o", typeof(data), data);}
					if(cf){console.warn("The type of data is not correct.");}
					return;
				}
				else if(typeof(data.options)=='object'){
					//if(cf){console.log("Data Type:%s\nData:%o", typeof(data), data);}
					if(cf){console.log("Options Type:%s\nData:%o", typeof(data.options), data.options);}
					for(i=0;i<data.options.length;i++){
						$('#'+targetId).addOption(data.options[i]);
					};
				}
				else if(typeof(data.options)=='undefined'&&typeof(data[sv])=='object'){
					var dataChild=data[sv];
					if(cf){console.log("Data(child) Type:%s\nData:%o", typeof(dataChild), dataChild);}
					for(i=0;i<dataChild.options.length;i++){
						$('#'+targetId).addOption(dataChild.options[i]);
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
	};
})(jQuery);