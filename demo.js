var ch=3;
switch(ch){
	case 1:{
		$('#s1').chained({targetId:'s2',url:'demo.php'});
		break;
	}
	case 2:{
		$('#s1').chained({targetId:'s2',url:'options.demo.js'});
		break;
	}
	case 3:{
		$('#s1').chained({targetId:'s2',url:'college.demo.js',autorun:false});
		break;
	}
}