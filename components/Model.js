import React from 'react';
import axios from 'axios';
import './style.css';
class Model extends React.Component{
	
	constructor(props){
		super(props);
		this.props=props;
     	this.models = this.props.model_prop;	 
	}



	render(){
 		return (
  	 		<div className="models">
 	 		  <img src={this.models.thumb_url} align="top"alt={this.models.name.toUpperCase()} />
 	 		  
	 	 	</div>
   	 	)
	}
};

export default Model;
