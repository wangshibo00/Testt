import React,{Component} from "react";
import {connect} from "dva";
import { Layout ,Button} from 'antd';

const { Header, Footer, Sider, Content } = Layout;

import BigPic from "./../components/BigPic.js";
import PicFilter from "./../components/PicFilter.js";
import PicBox from "./../components/PicBox.js";
import "./Picshow.less";

class Picshow extends Component{
    constructor(props){
        super();
    }
    componentDidMount(){
        this.props.dispatch({type:"picshow/init"})
    }
    render(){
        return <div className="picshow">
                <Layout>
                    <Layout>
                        <Content className="picshow_content">
                            <BigPic></BigPic>
                        </Content>
                    </Layout>
                    <Sider width="400">
                        <PicFilter></PicFilter>
                        <PicBox></PicBox>
                    </Sider>
                </Layout>
        </div>
    }
}

export default connect(
    (state)=>{
        return {
            ...state
        }
    }
)(Picshow)