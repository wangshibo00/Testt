import React,{Component} from "react";
import {connect} from "dva";
import classnames from "classnames";

import "./PicBox.less"

class PicBox extends Component{
    constructor(props){
        super();
        this.state={
            nowpage : 0,
        }
    }
    componentDidMount(){
        var self = this;
        $(this.refs.picNav).delegate("li","mouseenter",function(){
            $(self.refs.picCon).stop(true).animate({left:-370*$(this).index()},500)
            this.setState={
                ...self.state,
                nowpage : $(this).index()
            }
        })
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.nowcolor!=this.props.nowcolor || nextProps.nowtype != this.props.nowtype){
            this.setState({
                ...this.state,
                nowpage:0
            })
            $(this.refs.picCon).stop(true).animate({left:0},500)
        }
        if(nextProps.nowidx != this.props.nowidx){
            this.setState({
                ...this.state,
                nowpage:Math.floor(nextProps.nowidx/6)
            })
            $(this.refs.picCon).stop(true).animate({left:-370*Math.floor(nextProps.nowidx/6)},500)
        }
    }
    render(){
        console.log(11111);
        var imgs = this.props.data.colors && this.props.data.colors[this.props.colors[this.props.nowcolor]].types[this.props.types[this.props.nowtype]];
        if(!imgs)imgs=[];
        var imgsUlArr = [];
        var pageAmount = Math.ceil(imgs.length/6);
        // var nowpage = Math.floor(this.props.nowidx/6);
        for(var i = 0; i<pageAmount;i++){
            imgsUlArr.push(imgs.slice(i*6,(i+1)*6));
        }
        const carname = this.props.data.name;
        const color = this.props.colors[this.props.nowcolor];
        const type = this.props.types[this.props.nowtype];
        return <div className="picbox">
            <h3 style={{"color":"#eee"}}>图片展示:</h3>
            <div className="showBox">
                <div className="pic_contianer" ref="picCon">
                    {
                        imgsUlArr.map((item1,index1)=>{
                            return <ul className="ul" key={index1}>
                                {
                                    item1.map((item2,index2)=>{
                                        return <li key={index2}
                                            onClick={()=>{this.props.dispatch({type:"picshow/changePic",index:index1*6+index2})}}
                                            className={classnames({"cur":index1*6+index2==this.props.nowidx})}>
                                            <img src={`carpic/${carname}/${color}/${type}/${item2}`} style={{width:"160px"}}/>
                                        </li>
                                    })
                                }
                            </ul>
                        })
                    }
                </div>
            </div>
            <div className="picNav">
                <ul ref="picNav">
                    {
                        imgsUlArr.map((item,index)=>{
                            return <li key={index} className={classnames({"cur":this.state.nowpage==index})} style={{"width":345/pageAmount - 5}}></li>
                        })
                    }
                </ul>
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
)(PicBox)