function rotationArray(array){
	for(var i in array){
	var between = array[i].z;
	array[i].z=array[i].x;
	array[i].x=between;
	}
}
function mirrorArray(array){
	for(var i in array){
	array[i].x=-array[i].x;
	array[i].z=-array[i].z;
	}
}
var multiBlock={
getLevel: function(x,y,z, array){
	for(var p in array){
	var AngleOfLevel1 =[[],[],[],[]];
	
	for(var i =0; i<4; i++){
		for(var b in array[p].Block){
			AngleOfLevel1[i].push({x:array[p].Block[b].x,y:array[p].Block[b].y,z:array[p].Block[b].z, id:array[p].Block[b].id});
		}
	}
	rotationArray(AngleOfLevel1[1]);
	mirrorArray(AngleOfLevel1[2]);
	mirrorArray(AngleOfLevel1[3]);
	rotationArray(AngleOfLevel1[3]);
	for(var ii in AngleOfLevel1){
		var check = true;
	for(var i in AngleOfLevel1[ii]){
		var lock = false;
		for( var l in AngleOfLevel1[ii][i].id){
			if(World.getBlock(x+AngleOfLevel1[ii][i].x, y + AngleOfLevel1[ii][i].y, z+AngleOfLevel1[ii][i].z).id==AngleOfLevel1[ii][i].id[l]){
			lock = true;
		}
		}
		if(!lock){
			check=false;
		}
		}
		if(check){
			return {Level:array[p].Level, orientation:ii};
		}
	}
}
	return 0;
},
getBlocksByOrientation:function(array, level, orientation){
	let blockArr = [];
	for(let i in array){
		if(array[i].Level==level){
			array = array[i];
			break;
		}
	}
	for(var b in array.Block){
		blockArr.push({x:array.Block[b].x,y:array.Block[b].y,z:array.Block[b].z, id:array.Block[b].id});
	}
	if(orientation==1){
		rotationArray(blockArr);
	}
	if(orientation==2){
		mirrorArray(blockArr);
	}
	if(orientation==3){
		rotationArray(blockArr);
		mirrorArray(blockArr);
	}
	return blockArr;
},
getBlocks:function(x,y,z,array){
	for(var i in array){
		if(World.getBlock(x,y,z).id==array[i].id){
			if(World.getBlock(x,y,z).data==array[i].data||array[i].data==-1){
				//Logger.Log(World.getBlock(x,y,z).id, "ERR");
				return array[i];
			}
		}
	}
	return false;
},
checkBlockArray:function(array, id, data){
	for(var i in array){
		if(World.getBlock(array[i].x, array[i].y, array[i].z).id!=id||World.getBlock(array.x, array.y, array.z).data!=data&&data!=-1){
			return false;
		}
	}
	return true;
}
};


