var AdvMath={
	sign:function(x){
		if(x>0){
			return 1;
		}else if(x<0){
			return -1;
		}else if(x==0){
			return 0;
		}else{
			return NaN;
		}
	},
	random:function(min, max){
		return min+Math.round(Math.random()*(max-min));
	}
};
