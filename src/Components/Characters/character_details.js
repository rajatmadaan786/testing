import React from 'react';
import {getCharacterDetails} from '../../Services/';
import {Link} from 'react-router-dom';

class CharacterDetails extends React.Component{
	constructor(){
		super();
		this.state = {
			character:{},
			loading: false
		}
		this.getCharacter = this.getCharacter.bind(this);
	}

	getCharacter(id){
		this.setState({loading: true});
		getCharacterDetails(id).then(response=>{
			if(response.status===200){
				this.setState({character: response.data, loading: false})
			}else{
				this.setState({loading: false})
			}
		})		
	}

	componentDidMount(){
		let id = this.props.match.params.id;
		this.getCharacter(id);
	}

	render(){
		let {loading, character} = this.state;
		return(
			<div className="container">
				<h3>Character Details</h3>
				<div className="text-right">
					<Link to="/characters/all" ><i className="fa fa-arrow-left" aria-hidden="true"></i> Go Back</Link>
				</div>
				<div className="mt-4">
					<table className="table table-striped">
					    <thead>
					      <tr>
					        <th>Name</th>
					        <th>Gender</th>
					        <th>Culture</th>
					        <th>Born</th>
					        <th>Died</th>
					        <th>Books</th>
					      </tr>
					    </thead>
					    <tbody>
					    	{
					    		(loading)?
					    			<tr>
						    			<td colSpan="6"><img src={window.location.origin +"/images/loader.gif"} alt="loader" style={{height:'60px',width:'60px'}}/></td>
					    			</tr>
					    		:
					    		(Object.keys(character).length !== 0)?
				    				<tr>
					    				<td>{(character.name)?character.name:'Not found'}</td>
					    				<td>{(character.gender)?character.gender:'Not found'}</td>
					    				<td>{(character.culture)?character.culture:'Not found'}</td>
					    				<td>{(character.born)?character.born:'Not found'}</td>
					    				<td>{(character.died)?character.died:'Not found'}</td>
					    				<td>
					    					{
					    						(character.books && character.books.length>0)?
						    						character.books.map((item,index)=>(
						    							<div key={index}>
							    							<a href={item} target="_blank" rel="noopener noreferrer">{'Book '+(index+1)}</a>
						    							</div>
						    						))
						    					:
						    					'Not found'
					    					}
					    				</td>
					    			</tr>
					    		:
					    		<tr>
					    			<td colSpan="6">Not found!</td>
					    		</tr>
					    	}
					    </tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default CharacterDetails;