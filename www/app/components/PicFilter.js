import React,{Component} from "react";
import {connect} from "dva";
import "./PicFilter.less";
import classnames from "classnames"

class PicFilter extends Component{
    constructor(props){
        super();
        this.state={
            typec : {
                "detail":"细节",
                "center":"中控",
                "view":"外观"
            }
        }
    }
    render(){
        return <div className="picfilter_box">
            <h2 style={{"color":"#eee"}}>{this.props.data.name}</h2>
            <div className="filter_controller_type">
                {
                    this.props.types.map((item,index)=>{
                        return <span className={classnames({"filter_btn":true,"cur":this.props.nowtype==index})} key={index}
                            onClick={()=>{this.props.dispatch({type:"picshow/changeType",index})}}
                        >{this.state.typec[item]}</span>
                    })
                }
            </div>
            <div className="filter_controller_color">
                <h3 style={{"color":"#eee"}}>颜色:</h3>
                <div className="filter_color_nav">
                {
                    this.props.colors.map((item,index)=>{
                        return <span key={index} className={classnames({"colorBar":true,"cur":this.props.nowcolor==index})} style={{"background":item}}
                             onClick={()=>{this.props.dispatch({type:"picshow/changeColor",index})}}
                        ></span>
                    })
                }
                </div>
            </div>
        </div>
    }
}

export default connect(
    ({picshow})=>{
        return {
            ...picshow
        }
    }
)(PicFilter)