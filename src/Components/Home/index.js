// import React, {useCallback} from 'react';
// import {Link} from 'react-router-dom';
 
// export default function Home() {
//   return (
//     <div>
//      Welcome to the application.
//      <Link to="/characters/all">Show All Characters</Link>
//     </div>
//   )
// }

import React from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import './index.css';

import * as JSC from "jscharting";
JSC.defaults({ baseUrl: './js/jsc/' });


class Home extends React.Component{
	constructor(){
		super();
		this.state ={
			csv_urls:[
				"https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v7/finance/download/AAPL?period1=1568005508&period2=1599627908&interval=1d&events=history",
				"https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v7/finance/download/GOOG?period1=1568005508&period2=1599627908&interval=1d&events=history",
				"https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v7/finance/download/MSFT?period1=1568005508&period2=1599627908&interval=1d&events=history"
			],
			loading: false
		}
		this.addChart = this.addChart.bind(this);
		this.onChangeHandler = this.onChangeHandler.bind(this);
	}

	renderChart(stock,chartId,csv_urls){
		let points = [];
		let csv_url = (stock==='apple')?csv_urls[0]:(stock==='google')?csv_urls[1]:csv_urls[2];

		this.setState({loading: true});
		JSC.fetch(csv_url)
		.then(response => response.text())
		.then(text => {
			let data = JSC.csv2Json(text);
		  	for(var i=0;i<data.length;i++){
		  		let arr = [];
		  		arr.push(JSC.formatDate(data[i]['Date'], "d"));
		  		arr.push(data[i]["Adj Close"]);
		  		points.push(arr);
		  	}


  			let cont = document.getElementsByClassName('chart-container')[0];
		  	var chart = JSC.chart(chartId, { 
				debug: true, 
				type: 'line', 
				title_label_text: '', 
				legend_position: 'inside bottom right', 
				toolbar_items: { 
					'Line Type': { 
						type: 'select', 
						label_style_fontSize: 13, 
						margin: 5, 
						items: 'Line,Step,Spline', 
						events_change: function(val) { 
							chart.series().options({ type: val }); 
						} 
					} 
				}, 
				xAxis: { scale_type: 'time' }, 
				series: [ 
					{ 
					  name: '', 
					  points: points
					} 
				],
				defaultTooltip:{
					combined:true,
					label_text:'<b>%xValue</b><br>%points'
				} 
			});
			this.setState({loading: false})
		})
		.catch(err=>{
			console.log(err);
			swal({
				title: "Error",
				text: "Error occured while fetching financial data!",
				icon: "warning",
			})
		})			
	}

	onChangeHandler(e){
		let id = e.target.id.split('_')[1];
		let chartId = 'chart_'+id;
		let value = e.target.value;
		let csv_urls = this.state.csv_urls;

		if(value==='apple'){
			this.renderChart('apple',chartId,csv_urls);
		}else if(value==='google'){
			this.renderChart('google',chartId,csv_urls);
		}else{
			this.renderChart('microsoft',chartId,csv_urls)
		}
	}

	addChart(){
		let chartNum = window.localStorage.getItem('chart_num');

		if(!chartNum || chartNum===null){
			chartNum = 1;
			window.localStorage.setItem('chart_num',chartNum);
		}else{
			chartNum = Number(chartNum)+1;
			window.localStorage.setItem('chart_num',chartNum);
		}

		let elmnt = document.createElement('div');
		elmnt.id = 'chart_'+chartNum;
		elmnt.className = 'chart';


		let elements_wrapper = document.createElement('div');
		elements_wrapper.className="elements-wrapper";



		elements_wrapper.appendChild(elmnt);

		//Create array of options to be added
		var array = [{label: "Select a stock", value:""},{label: "Apple", value: 'apple'},{label: "Google", value: 'google'},{label: "Microsoft", value:'microsoft'}];

		//Create and append select list
		var selectList = document.createElement("select");
		selectList.id = "select_"+chartNum;
		selectList.onchange = this.onChangeHandler
		
		elements_wrapper.prepend(selectList);

		document.getElementsByClassName('chart-container')[0].appendChild(elements_wrapper);

		//Create and append the options
		for (var i = 0; i < array.length; i++) {
		    var option = document.createElement("option");
		    option.value = array[i].value;
		    option.text = array[i].label;
		    selectList.appendChild(option);
		}
	}	

	saveData(){
		let data = document.querySelectorAll('select');
		let result = [];

		data.forEach(function(item,index){
				let obj = {};
				let id = item.id.split('_')[1];
				let value = item.value;
				obj['id'] = id;
				obj['value'] = value;
				result.push(obj);
		})

		let jsonData = JSON.stringify(result);
		window.localStorage.setItem('last_values',jsonData);

		swal({
			title: "Success",
			text: "Data saved successfully!",
			icon: "success",
		})
	}

	componentDidMount(){
		let last_values = JSON.parse(window.localStorage.getItem('last_values'));
		let csv_urls = this.state.csv_urls;
		if(last_values && last_values.length>0){
			for(var i=0; i<last_values.length; i++){

				let elmnt = document.createElement('div');
				elmnt.id = 'chart_'+last_values[i].id;
				elmnt.className = 'chart';


				let elements_wrapper = document.createElement('div');
				elements_wrapper.className="elements-wrapper";

				elements_wrapper.appendChild(elmnt);

				//Create array of options to be added
				var array = [{label: "Select a stock", value:""},{label: "Apple", value: 'apple'},{label: "Google", value: 'google'},{label: "Microsoft", value:'microsoft'}];

				//Create and append select list
				var selectList = document.createElement("select");
				selectList.id = "select_"+last_values[i].id;
				
				//Create and append the options
				for (var j = 0; j < array.length; j++) {
				    var option = document.createElement("option");
				    option.value = array[j].value;
				    option.text = array[j].label;
				    selectList.appendChild(option);
				}

				selectList.value = last_values[i].value;
				selectList.onchange = this.onChangeHandler

				elements_wrapper.prepend(selectList);


				document.getElementsByClassName('chart-container')[0].appendChild(elements_wrapper);

	

				let points = [];
				let csv_url = (last_values[i].value==='apple')?csv_urls[0]:(last_values[i].value==='google')?csv_urls[1]:(last_values[i].value==='microsoft')?csv_urls[2]:'';

				this.setState({loading: true});
				if(csv_url){
					JSC.fetch(csv_url)
					.then(response => response.text())
					.then(text => {
						let data = JSC.csv2Json(text);
					  	delete data['columns'];
					  	delete data['types'];
					  	for(var i=0;i<data.length;i++){
					  		let arr = [];
					  		arr.push(JSC.formatDate(data[i]['Date'], "d"));
					  		arr.push(data[i]["Adj Close"]);
					  		points.push(arr);
					  	}

					  	var chart = JSC.chart(elmnt, { 
						  debug: true, 
						  type: 'line', 
						  title_label_text: '', 
						  legend_position: 'inside bottom right', 
						  toolbar_items: { 
						    'Line Type': { 
						      type: 'select', 
						      label_style_fontSize: 13, 
						      margin: 5, 
						      items: 'Line,Step,Spline', 
						      events_change: function(val) { 
						        chart.series().options({ type: val }); 
						      } 
						    } 
						  }, 
						  xAxis: { scale_type: 'time' }, 
						  series: [ 
						    { 
						      name: '', 
						      points: points
						    } 
						  ],
						  defaultTooltip:{
						    combined:true,
						    label_text:'<b>%xValue</b><br>%points'
						  } 
						});
					  	this.setState({loading: false})
					})
					.catch(err=>{
						console.log(err);
						swal({
							title: "Error",
							text: "Error occured while fetching financial data!",
							icon: "warning",
						})
					})		
				}else{
					JSC.Chart(elmnt, {
					  series: [
					    {
					      points: []
					    }
					  ]
					});
				}
			}
		}
	}

	render(){	
		return(
			<div className="wrapper">
				{
					this.state.loading?
						<div className="overlay-mask">
							<i className="fa fa-refresh fa-spin" style={{ fontSize: '60px' }}></i>
						</div>
					:
					false
				}

				{/* navbar starts */}
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
				  <Link className="navbar-brand" to="/">Charts</Link>
				  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
				    <span className="navbar-toggler-icon"></span>
				  </button>
				  <div className="collapse navbar-collapse" id="navbarNavDropdown">
				    <ul className="navbar-nav ml-auto">
				      <li className="nav-item active">
				        <Link className="nav-link" to="/" onClick={this.saveData}>Save</Link>
				      </li>
				      <li className="nav-item dropdown">
				        <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				          Insert
				        </Link>
				        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
				          <Link className="dropdown-item" to="/" onClick={this.addChart}>
				          <img src="images/chart.png" className="chart-thumbnail-img"/><span className="chart-menu-heading">Chart</span></Link>
				        </div>
				      </li>
				    </ul>
				  </div>
				</nav>
				{/* navbar ends */ }
				<div className="chart-container"></div>
			</div>
		);
	}
}

export default Home;