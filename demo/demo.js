var debug=!1;
var ch=3;
switch(ch){
	case 1:{
		$('#province').chained({target:'#s2',url:'demo.php'});
		break;
	}
	case 2:{
		$('#province').chained({target:'#s2',url:'options.demo.js'});
		break;
	}
	case 3:{
		$('#province').chained({target:'#s2',url:'college.demo.js',autorun:false});
		break;
	}
}