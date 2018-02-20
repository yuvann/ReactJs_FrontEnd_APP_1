import React from 'react';
import axios from 'axios';
import './style.css';
import Category from './Category.js'
class App extends React.Component{
	
	constructor(props){
		super(props);
		this.stateHolder = {
			"category" : {
				"data":[],
				"count":""
			} ,
			"model" : []
		}
		this.state = this.stateHolder;
		this.categoryId = [];
		this.categoryPayload = {}
		this.modelPayload = {
			"limit"    : 5 ,
			"offset"   : 0 ,
			"category_id" : this.categoryId
		}
		this.getCategory();
	}

	getCategory () {
  		axios({
			    method: 'post',
			    url: 'https://myapphosted.herokuapp.com/api/categories' ,
			    data: this.categoryPayload 
			}).then(response => {
				if(this.stateHolder.category.data.length==0)
					this.stateHolder.category = response.data;
			    else
			    	this.stateHolder.category.data = this.stateHolder.category.data.concat(response.data.data)
			    this.categoryId = [];
    		 	response.data.data.map((each)=>{this.categoryId.push(each.id)})
    		 	this.getModel(this.categoryId);
    		 	}
    	);
   }

   getModel (id) {
   		this.modelPayload.category_id = id;
   		axios({
			    method: 'post',
			    url: 'https://myapphosted.herokuapp.com/api/models' ,
			    data: this.modelPayload 
			}).then(response => {
    		 	this.stateHolder.model=this.stateHolder.model.concat(response.data);
      		 	this.setState(this.stateHolder)
    		 	}
    	);
   }

   renderPagination () {
   	if(this.state.category.data.length == Number(this.state.category.count)){
   		return (<div></div>)
   	}
   	else{
   		    return (
   		    	<div className="pagination downPagination " onClick={ ()=>{ this.loadMore() } }>
			 	 			<img src="./right.svg"  align="top" width="100" height="100"/>
			    </div>
			) 
   	}
   }

   loadMore() {
   		this.categoryPayload["offset"] = this.state.category.data.length;
   		this.getCategory();
   }

   renderMyPage(){	
    	if(this.state.category.data.length === 0 )
   			return (<div className="loading"> Loading . . . </div>)
   		var data = this.stateHolder.category.data.map((each , index)=>{
   		         
   				return (
   				<Category 
   					ctg_prop   = {each} 
   					model_prop = {this.stateHolder.model[index]  } />
   				)
   		});
   		return data;
   }
   
	render(){
 		return (
 		<div>
 	 		<div className="header">Scapic</div>
 	 		<div className="category">
 	 		Categories :<br/>
 	 		{this.renderMyPage()}
			</div>
			<div className="loadCatg">
			{this.renderPagination()}
			</div>
 	 	</div>
 	 	)
	}
};

export default App;
