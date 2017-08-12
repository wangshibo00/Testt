import React from "react";
import { connect } from "dva";
import PicShow from "./PicShow.js";

class App extends React.Component{
	constructor({picshow}){
		super();
	}

	componentDidMount(){
		
	}

	render(){
		return <div>
		 	<PicShow></PicShow>
		</div>
	}
}

export default connect(
	({picshow})=>{
		return {
			picshow
		}
	}
)(App);