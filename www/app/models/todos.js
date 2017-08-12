export default {
	namespace : "picshow" ,
	state : {
		"nowcolor" : 0 , 			//当前颜色
		"nowtype"  : 0 ,			//当前类型
		"nowidx"   : 0 , 			//当前的图片的序号
		"colors"   : [],			//颜色数组
		"types"    : [],			//图集名字的数组
		"data"     : {}
	} ,
	reducers : {
		//拉取默认数据
		init_sync(state , {data}){
			var colorsarr = Object.keys(data.colors);
			//这里控制types的顺序：
			var types = [];
			if(Object.keys(data.colors[colorsarr[0]].types).includes("view")){
				types.push("view");
			}

			if(Object.keys(data.colors[colorsarr[0]].types).includes("center")){
				types.push("center");
			}

			if(Object.keys(data.colors[colorsarr[0]].types).includes("detail")){
				types.push("detail");
			}

			return {
				...state ,
				data ,
				colors : colorsarr ,
				types : types
			}
		},
		//改变图集
		changetype(state , {typename}){
			return {
				...state ,
				nowtype : state.types.indexOf(typename),
				nowidx  : 0
			}
		},
		//改变颜色
		changecolor(state , {n}){
			var colorsarr = Object.keys(state.data.colors);
			var types = [];
			if(Object.keys(state.data.colors[colorsarr[n]].types).includes("view")){
				types.push("view");
			}

			if(Object.keys(state.data.colors[colorsarr[n]].types).includes("center")){
				types.push("center");
			}

			if(Object.keys(state.data.colors[colorsarr[n]].types).includes("detail")){
				types.push("detail");
			}

			return {
				...state ,
				types : types,
				nowcolor : n ,
				nowtype : 0,
				nowidx  : 0
			}
		},
		//变图
		changepic(state , {n}){
			return {
				...state ,
				nowidx : n
			}
		},
		//下一张
		gonext(state){
			var color = state.colors[state.nowcolor];
			var type = state.types[state.nowtype];

			//图片越界
			if(state.nowidx >= state.data.colors[color].types[type].length-1){
				//下个类型的图片
				if(state.nowtype < state.types.length-1){
					return {
						...state ,
						nowtype : state.nowtype+1,
						nowidx  : 0
					}
				}else {
					var n = state.nowcolor < state.colors.length -1 ? state.nowcolor+1 : 0;
					var colorsarr = Object.keys(state.data.colors);
					var types = [];
					if(Object.keys(state.data.colors[colorsarr[n]].types).includes("view")){
						types.push("view");
					}

					if(Object.keys(state.data.colors[colorsarr[n]].types).includes("center")){
						types.push("center");
					}

					if(Object.keys(state.data.colors[colorsarr[n]].types).includes("detail")){
						types.push("detail");
					}

					return {
						...state ,
						types : types,
						nowcolor : n ,
						nowtype : 0,
						nowidx  : 0
					}
				}

			}
			return {
				...state ,
				nowidx : state.nowidx + 1
			}
		},
		//上一张
		goprev(state){
			var color = state.colors[state.nowcolor];
			var type = state.types[state.nowtype];

			//图片越界
			if(state.nowidx <=0){
				//下个类型的图片
				if(state.nowtype > 0){
					return {
						...state ,
						nowtype : state.nowtype-1,
						nowidx  : state.data.colors[color].types[state.types[state.nowtype-1]].length-1
					}
				}else {
					var n = state.nowcolor > 0 ? state.nowcolor - 1 : state.colors.length-1;
					var colorsarr = Object.keys(state.data.colors);
					var types = [];
					if(Object.keys(state.data.colors[colorsarr[n]].types).includes("view")){
						types.push("view");
					}

					if(Object.keys(state.data.colors[colorsarr[n]].types).includes("center")){
						types.push("center");
					}

					if(Object.keys(state.data.colors[colorsarr[n]].types).includes("detail")){
						types.push("detail");
					}
					console.log(state.data.colors[color].types[types[types.length-1]].length-1)
					return {
						...state ,
						types : types,
						nowcolor : n ,
						nowtype : types.length-1,
						nowidx  : state.data.colors[colorsarr[n]].types[types[types.length-1]].length-1
					}
				}

			}
			return {
				...state ,
				nowidx : state.nowidx - 1
			}
		}

	},
	effects : {
		init : function* (state , {put}){
			var data = yield fetch("/api/car/AiRuize").then((data)=>{
				return data.json();
			});
			yield put({"type" : "init_sync" , data});
		}
	}
}