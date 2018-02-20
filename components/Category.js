import React from 'react';
import axios from 'axios';
import './style.css';
import Model from './Model.js'
class Category extends React.Component{
	
	constructor(props){
		super(props);
		this.props=props;
		console.log(props)
 		this.models = this.props.model_prop;
 		this.state = this.models;
 		this.payload= {
 			"limit" : 5 ,
 			"offset": 0 ,
 			"category_id" :[this.props.ctg_prop.id]
 		}
		 
	}

	renderModels () {
		this.models.data =this.state.data;
		var data =  this.models.data.map((each)=>{ 
						return (<Model model_prop={each} />)
					})
					console.log(this.models.data.length)
		if( this.state.data.length === Number(this.models.count) ) {
			data.push( <div></div> ) 
		}
		else { 
			 data.push(
			 	 			<div className="pagination" onClick={ ()=>{ this.loadMore() } }>
			 	 			<img src="./right.svg"  align="top" width="100" height="100"/>
			 	 			</div> 
		 	 		)
		 }
		return data;
	}
	 
	loadMore () {
		if( this.state.data.length < this.models.count ){
			this.payload.offset=this.state.data.length;
			axios({
			    method: 'post',
			    url: 'https://myapphosted.herokuapp.com/api/models' ,
			    data: this.payload 
			}).then(response => {
				console.log(response)
				this.state.data = this.state.data.concat(response.data[0].data)
      		 	this.setState(this.state);
     		 	}
    	    );
		}

	}
	 

	render(){
		console.log("in render")
 		return (
 		    <div >
 	 		<div className="ctg_holder">
 	 		 {this.props.ctg_prop.name}
 	 		 </div>
 	 		 <div className="model_holder">
	 	 		{
	 	 			this.renderModels()
	 	 		}
	 	 		 
	 	 	</div>
 	 		</div>
  	 	)
	}
};

export default Category;
