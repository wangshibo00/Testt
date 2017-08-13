import _ from "underscore";
export default {
    namespace : "picshow",
    state:{
        data:{},
        colors:[],
        types:[],
        nowtype:0,
        nowcolor:0,
        nowidx:0

    },
    reducers:{
        init_sync(state,{data}){
            var colors = Object.keys(data.colors);
            var types = getTypesArr(Object.keys(data.colors[colors[0]].types));
            return {
                ...state,
                data,
                colors,
                types
            };
        },
        changeType(state,{index}){
            return {
                ...state,
                nowtype:index,
                nowidx:0
            }
        },
        changeColor(state,{index}){
            var types = getTypesArr(Object.keys(state.data.colors[state.colors[index]].types));
            return {
                ...state,
                types:types,
                nowcolor:index,
                nowtype:0,
                nowidx:0
            };
        },
        changePic(state,{index}){

            return {
                ...state,
                nowidx:index
            };
        },
        nextPic(state){
            if(state.nowidx == state.data.colors[state.colors[state.nowcolor]].types[state.types[state.nowtype]].length-1){
                if(state.nowtype == Object.keys(state.data.colors[state.colors[state.nowcolor]].types).length-1){
                    if(state.nowcolor == Object.keys(state.data.colors).length-1){
                        var types = getTypesArr(Object.keys(state.data.colors[state.colors[0]].types))
                        return {
                            ...state,
                            nowidx:0,
                            nowtype:0,
                            nowcolor:0,
                            types
                        }
                    }
                    var types = getTypesArr(Object.keys(state.data.colors[state.colors[state.nowcolor+1]].types))
                    return{
                        ...state,
                        nowidx:0,
                        nowtype:0,
                        nowcolor:state.nowcolor+1,
                        types
                    }
                }
                return{
                    ...state,
                    nowidx:0,
                    nowtype:state.nowtype+1
                }
            }
            return {
                ...state,
                nowidx:state.nowidx+1
            }
        },

        prevPic(state){
            if(state.nowidx == 0){
                if(state.nowtype == 0){
                    if(state.nowcolor == 0){
                        var nowcolor = Object.keys(state.data.colors).length-1;
                        var types = getTypesArr(Object.keys(state.data.colors[state.colors[nowcolor]].types));
                        var nowtype = Object.keys(state.data.colors[state.colors[nowcolor]].types).length-1;
                        var nowidx = state.data.colors[state.colors[nowcolor]].types[types[nowtype]].length-1
                        return {
                            ...state,
                            nowidx,
                            nowtype,
                            nowcolor,
                            types
                        }
                    }
                    var nowtype = Object.keys(state.data.colors[state.colors[state.nowcolor-1]].types).length-1;
                    var types = getTypesArr(Object.keys(state.data.colors[state.colors[state.nowcolor-1]].types))
                    return{
                        ...state,
                        nowidx:state.data.colors[state.colors[state.nowcolor-1]].types[types[nowtype]].length-1,
                        nowtype,
                        nowcolor:state.nowcolor-1,
                        types
                    }
                }
                return{
                    ...state,
                    nowidx:state.data.colors[state.colors[state.nowcolor]].types[state.types[state.nowtype-1]].length-1,
                    nowtype:state.nowtype-1
                }
            }
            return {
                ...state,
                nowidx:state.nowidx-1
            }

        }
    },
    effects:{
        init:function* (action,{put}){
            var data = yield fetch("api/car/AiRuize").then((data)=>{
                return data.json();
            });
            yield put({"type":"init_sync",data})
        }
    }

}
function getTypesArr(originArr){
    const arrTemp = ["view","center","detail"];
    return _.intersection(arrTemp,originArr);

}
