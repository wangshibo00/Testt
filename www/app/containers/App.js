import React,{Component} from "react";
import {connect} from "dva";
import Picshow from "./Picshow.js";
import 'antd/dist/antd.less';

class App extends Component{
    constructor(props){
        super();
    }
    render(){
        return <div>
            <Picshow></Picshow>
        </div>
    }
}
//这里的返回值实际就是传入该组件的props
export default connect(
    (state)=>{
        return {
            ...state
        }
    }
)(App)