import React,{Component} from "react";
import {connect} from "dva";

import "./BigPic.less"

class BigPic extends Component{
    constructor(props){
        super();
    }
    render(){
        if(!this.props.data.name){
            return <div></div>
        }
        const carname = this.props.data.name;
        const color = this.props.colors[this.props.nowcolor];
        const type = this.props.types[this.props.nowtype];
        const name = this.props.data.colors[color].types[type][this.props.nowidx];
        return <div className="bigpic">
            <img className="pic" src={`carpic/${carname}/${color}/${type}/${name}`}  />
            <div className="leftBtn" onClick={()=>{this.props.dispatch({type:"picshow/prevPic"})}}></div>
            <div className="rightBtn" onClick={()=>{this.props.dispatch({type:"picshow/nextPic"})}}></div>
        </div>
    }
}

export default connect(
    ({picshow})=>{
        return {
            ...picshow
        }
    }
)(BigPic)