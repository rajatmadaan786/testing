import React from 'react';
import {Link} from 'react-router-dom';
import {getAllCharacters} from '../../Services/';
import CONFIG from '../../config';

class AllCharacters extends React.Component{
	constructor(){
		super();
		this.state = {
			characters:[],
			loading: false,
			bookmark_toggled: false
		}
		this.getCharacters = this.getCharacters.bind(this);
		this.toggleBookmark = this.toggleBookmark.bind(this);
	}

	getCharacters(){
		this.setState({loading: true});
		getAllCharacters().then(response=>{
			if(response.status===200){
				this.setState({characters: response.data, loading: false})
			}else{
				this.setState({loading: false})
			}
		})		
	}

	toggleBookmark(id){
		let result = window.localStorage.getItem('bookmarked_characters');
		let data = [];
		if(result===null){
			data.push(id);
			window.localStorage.setItem("bookmarked_characters", JSON.stringify(data));
			this.setState({bookmark_toggled: true})
		}else{
			let parsed_data = JSON.parse(result);
			if(parsed_data.indexOf(id)<=-1){
				parsed_data.push(id);
				window.localStorage.setItem("bookmarked_characters", JSON.stringify(parsed_data));
				this.setState({bookmark_toggled: true})
			}else{
				let index = parsed_data.indexOf(id);
				parsed_data.splice(index,1);
				window.localStorage.setItem("bookmarked_characters", JSON.stringify(parsed_data));
				this.setState({bookmark_toggled: true})
			}
		}
	}

	filterResult(e){
		let all_characters = this.state.characters;
		let search_query = e.target.value;
		let characters = this.state.characters;
		for(var i=0; i<characters.length; i++){
			if(characters[i].name.indexOf(search_query)<=-1){
				characters.splice(i,1);
			}
		}
		if(search_query===''){
			this.setState({characters: all_characters});
		}
		this.setState({characters});
	}

	componentDidMount(){
		this.getCharacters();
	}

	render(){
		let {loading, characters} = this.state;
		let bookmarked_characters = JSON.parse(window.localStorage.getItem('bookmarked_characters'));
		return(
			<div className="container">
				<Link to="/">Back to Home</Link>
				<h3>All Characters </h3>
				<div className="text-right">
					<input type="text" onKeyUp={(e)=>this.filterResult(e)} placeholder=" Search for name.."/>
				</div>
				<div className="mt-4">
					<table className="table table-striped">
					    <thead>
					      <tr>
					        <th>Name</th>
					        <th>Gender</th>
					        <th>Bookmark</th>
					        <th>Action</th>
					      </tr>
					    </thead>
					    <tbody>
					    	{
					    		(loading)?
					    			<tr>
						    			<td colSpan="4"><img src={window.location.origin +"/images/loader.gif"} alt="loader" style={{height:'60px',width:'60px'}}/></td>
					    			</tr>
					    		:
					    		(characters && characters.length>0)?
					    			characters.map((item,index)=>(
					    				<tr key={index}>
						    				<td>{(item.name)?item.name:'Not found'}</td>
						    				<td>{item.gender}</td>
						    				<td>
						    					{
						    						(bookmarked_characters && bookmarked_characters.length>0)?
							    						(bookmarked_characters.indexOf(CONFIG.extractNumber(item.url))>-1)?	
							    						<i className="fa fa-bookmark" aria-hidden="true" onClick={()=>this.toggleBookmark(CONFIG.extractNumber(item.url))}></i>
							    						:
								    					<i className="fa fa-bookmark-o" aria-hidden="true" onClick={()=>this.toggleBookmark(CONFIG.extractNumber(item.url))}></i>
								    				:
								    					<i className="fa fa-bookmark-o" aria-hidden="true" onClick={()=>this.toggleBookmark(CONFIG.extractNumber(item.url))}></i>								    				
						    					}
						    				</td>
						    				<td><Link to={`/character/${CONFIG.extractNumber(item.url)}`}>View Details</Link></td>
						    			</tr>
					    			))
					    		:
					    		<tr>
					    			<td colSpan="4">Not found!</td>
					    		</tr>
					    	}
					    </tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default AllCharacters;