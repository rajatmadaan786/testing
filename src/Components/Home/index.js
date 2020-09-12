import React from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import './index.css';
import * as JSC from "jscharting";
JSC.defaults({ baseUrl: './js/jsc/' });

class Home extends React.PureComponent{
	constructor(){
		super();
		this.state ={
			csv_urls:[
				"https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v7/finance/download/AAPL?period1=1568005508&period2=1599627908&interval=1d&events=history",
				"https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v7/finance/download/GOOG?period1=1568005508&period2=1599627908&interval=1d&events=history",
				"https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v7/finance/download/MSFT?period1=1568005508&period2=1599627908&interval=1d&events=history"
			],
			loading: false,
			show_chart_menu: false,
			open_mobile_navbar: false
		}
		this.addChart = this.addChart.bind(this);
		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.renderChart = this.renderChart.bind(this);
	}

	fetchStyle(elm){
		let data = JSON.parse(window.localStorage.getItem('draggableElementCoordinates'));
		let result = data.filter(item => item.element===elm);
		return result[0];
	}

	timeoutNetworkRequest(promise) {
		return new Promise((resolve, reject) => {
			const timeoutId = setTimeout(() => {
				this.setState({loading: false})
				swal({
					title: "Error",
					text: "Error occured while fetching financial data!",
					icon: "warning",
				})
			}, 20000);

			promise.then((res) => {
			    clearTimeout(timeoutId);
			    resolve(res);
			  },
			  (err) => {
			    clearTimeout(timeoutId);
				this.setState({loading: false})
				swal({
					title: "Error",
					text: "Error occured while fetching financial data!",
					icon: "warning",
				})
			  }
			);
		})
	}

	addDragAbility(event,elm){
		var posX = 0,
		posY = 0,
		aX = 0,
		aY = 0,
		bound = 0,
		diffX = 0,
		diffY = 0,
		divTop = 0,
		divLeft = 0;

		function moveElement(xpos,ypos){
	        elm.style.left = xpos + 'px';
	        elm.style.top = ypos + 'px';
		}

		event = event || window.event;
	    posX = event.clientX; // horizontal mouse position when clicked
	    posY = event.clientY;     // vertical mouse position when clicked


	    divTop = elm.style.top.replace('px','');   
	    divLeft = elm.style.left.replace('px','');


	    diffX = posX - divLeft;
	    diffY = posY - divTop;

	    function onMouseMove(evt){
			evt = evt || window.event;
	        posX = evt.clientX;
	        posY = evt.clientY;

	        aX = posX - diffX;
	        aY = posY - diffY;
	       	bound=document.getElementsByClassName("draggable-elements")[0].offsetWidth-elm.offsetWidth;
	           
	        if((aX>0)&&(aX<bound)&&(aY>0)&&(aY<bound)){
	            moveElement(aX,aY);
	        }
	    }

	    document.addEventListener('mousemove', onMouseMove);

	    elm.onmouseup = function(event) {
			document.removeEventListener('mousemove', onMouseMove);
			elm.onmouseup = null;
		};
    }

	renderChart(stock,chartId,csv_urls){
		let points = [];
		let csv_url = (stock==='apple')?csv_urls[0]:(stock==='google')?csv_urls[1]:csv_urls[2];

		this.setState({loading: true});

		this.timeoutNetworkRequest(JSC.fetch(csv_url))
		.then(response => response.text())
		.then(text => {
			this.setState({loading: false})
			let data = JSC.csv2Json(text);
		  	for(var i=0;i<data.length;i++){
		  		let arr = [];
		  		arr.push(JSC.formatDate(data[i]['Date'], "d"));
		  		arr.push(data[i]["Adj Close"]);
		  		points.push(arr);
		  	}

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

		})
		.catch(err=>{
			console.log(err);
			this.setState({loading: false})
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
		this.setState({show_chart_menu: !this.state.show_chart_menu});

		let chartNum = window.localStorage.getItem('chart_num');
		let newThis = this;

		if(!chartNum || chartNum===null){
			chartNum = 1;
		}else{
			chartNum = Number(chartNum)+1;
		}
		window.localStorage.setItem('chart_num',chartNum);

		let elmnt = document.createElement('div');
		elmnt.className = 'chart';
		elmnt.id = 'chart_'+chartNum;

		let availableElements = document.querySelectorAll('.elements-wrapper');

		let elements_wrapper = document.createElement('div');
		elements_wrapper.className="elements-wrapper";
		elements_wrapper.id = 'element_'+chartNum;

		let windowsWidth = window.innerWidth;

		if(availableElements.length>0)
			elements_wrapper.style.left = (340*availableElements.length)+'px';

		elements_wrapper.appendChild(elmnt);

		//Create array of options to be added
		var selectArr = [{label: "Select a stock", value:""},{label: "Apple", value: 'apple'},{label: "Google", value: 'google'},{label: "Microsoft", value:'microsoft'}];

		//Create and append select list
		var selectList = document.createElement("select");
		selectList.id = "select_"+chartNum;
		selectList.onchange = this.onChangeHandler


		let header_container = document.createElement('div');
		header_container.appendChild(selectList);

		header_container.classList.add('chart-element-header');
		
		elements_wrapper.prepend(header_container);

		if(window.innerWidth>=1024){
			header_container.addEventListener('mousedown',function(event){
				newThis.addDragAbility(event,elements_wrapper)
			})
		}

		document.getElementsByClassName('chart-container')[0].appendChild(elements_wrapper);

		//Create and append the options
		for (var i = 0; i < selectArr.length; i++) {
		    var option = document.createElement("option");
		    option.value = selectArr[i].value;
		    option.text = selectArr[i].label;
		    selectList.appendChild(option);
		}
	}	

	saveData(){
		let data = document.querySelectorAll('select');
		let result = [];
		let draggableElementCoordinates = {};
		let draggableElements = [];

		data.forEach(function(item,index){
			let obj = {};
			let id = item.id.split('_')[1];
			let value = item.value;
			obj['id'] = id;
			obj['value'] = value;
			result.push(obj);

			let draggableElement = document.getElementById('element_'+id);

			draggableElementCoordinates = {
				top: draggableElement.style.top,
				left: draggableElement.style.left,
				element: 'element_'+id
			};
			draggableElements.push(draggableElementCoordinates);
		})

		let jsonData = JSON.stringify(result);
		window.localStorage.setItem('last_values',jsonData);

		window.localStorage.setItem('draggableElementCoordinates',JSON.stringify(draggableElements));

		swal({
			title: "Success",
			text: "Data saved successfully!",
			icon: "success",
		})
	}

	componentDidMount(){
		let last_values = JSON.parse(window.localStorage.getItem('last_values'));
		let csv_urls = this.state.csv_urls;
		let newThis = this;

		if(last_values && last_values.length>0){
			for(var i=0; i<last_values.length; i++){
				let elmnt = document.createElement('div');
				elmnt.id = 'chart_'+last_values[i].id;
				elmnt.className = 'chart';

				let elements_wrapper = document.createElement('div');
				elements_wrapper.className="elements-wrapper";
				let elementId = 'element_'+last_values[i].id;
				elements_wrapper.id = elementId;
				
				let coordinates = '';
				let draggableElementCoordinates = window.localStorage.getItem('draggableElementCoordinates');

				if(draggableElementCoordinates){
					coordinates = this.fetchStyle(elementId);
				}

				if(coordinates){
					elements_wrapper.style.top = coordinates.top;
					elements_wrapper.style.left = coordinates.left;
				}
				elements_wrapper.appendChild(elmnt);

				//Create array of options to be added
				var selectArr = [{label: "Select a stock", value:""},{label: "Apple", value: 'apple'},{label: "Google", value: 'google'},{label: "Microsoft", value:'microsoft'}];

				//Create and append select list
				var selectList = document.createElement("select");
				selectList.id = "select_"+last_values[i].id;
				
				//Create and append the options
				for (var j = 0; j < selectArr.length; j++) {
				    var option = document.createElement("option");
				    option.value = selectArr[j].value;
				    option.text = selectArr[j].label;
				    selectList.appendChild(option);
				}

				selectList.value = last_values[i].value;
				selectList.onchange = this.onChangeHandler

				let header_container = document.createElement('div');
				header_container.appendChild(selectList)

				header_container.classList.add('chart-element-header');

				elements_wrapper.prepend(header_container);

				if(window.innerWidth>=1024){
					header_container.addEventListener('mousedown',function(event){
						newThis.addDragAbility(event,elements_wrapper)
					})					
				}

				document.getElementsByClassName('chart-container')[0].appendChild(elements_wrapper);

				let points = [];
				let csv_url = (last_values[i].value==='apple')?csv_urls[0]:(last_values[i].value==='google')?csv_urls[1]:(last_values[i].value==='microsoft')?csv_urls[2]:'';

				if(csv_url){
					this.setState({loading: true});
					this.timeoutNetworkRequest(JSC.fetch(csv_url))
  					.then(response => response.text())
					.then(text => {
						this.setState({loading: false})
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
					})
					.catch(err=>{
						console.log(err);
						this.setState({loading: false})
						swal({
							title: "Error",
							text: "Error occured while fetching financial data!",
							icon: "warning",
						})
					})	
				}
			}
		}
	}

	render(){	
		return(
			<div className="wrapper">
				{
					(this.state.loading)?
						<div className="overlay-mask">
							<i className="fa fa-refresh fa-spin"></i>
						</div>
					:
					false
				}

				{/* navbar starts */}
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
				  <Link className="navbar-brand" to="/">Charts</Link>
				  <button className="navbar-toggler" type="button" onClick={ ()=>this.setState({open_mobile_navbar: !this.state.open_mobile_navbar}) } >
				    <span className="navbar-toggler-icon"></span>
				  </button>
				  <div className={(this.state.open_mobile_navbar)?"collapse navbar-collapse show":"collapse navbar-collapse"} id="navbarNavDropdown">
				    <ul className="navbar-nav ml-auto">
				      <li className="nav-item active">
				        <Link className="nav-link" to="/" onClick={this.saveData}>Save</Link>
				      </li>
				      <li className="nav-item dropdown">
				        <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdownMenuLink" onClick={()=>this.setState({show_chart_menu: !this.state.show_chart_menu})}>
				          Insert
				        </Link>
				        <div className={(this.state.show_chart_menu)?"dropdown-menu show":"dropdown-menu"}>
				          	<Link className="dropdown-item" to="/" onClick={this.addChart}>
				          		<img src="images/chart.png" className="chart-thumbnail-img" alt="chart"/><span className="chart-menu-heading" >Chart</span>
				        	</Link>
				        </div>
				      </li>
				    </ul>
				  </div>
				</nav>
				{/* navbar ends */ }
				<div className="chart-container">
					<div className="draggable-elements"></div>
				</div>
			</div>
		);
	}
}

export default Home;