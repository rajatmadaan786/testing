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
import * as JSC from "jscharting"

JSC.defaults({ baseUrl: './js/jsc/' });

class Home extends React.Component{
	render(){
		let points = [];
		JSC.fetch("google.csv")
		  .then(response => response.text())
		  .then(text => {
		  	let data = JSC.csv2Json(text);
			  	delete data['columns'];
			  	delete data['types'];
			  	for(var i=0;i<data.length;i++){
			  		let arr = [];
			  		arr.push(JSC.formatDate(data[i]['Date'], "d"));
			  		arr.push(data[i]["Open"]);
			  		arr.push(data[i]["High"]);
			  		arr.push(data[i]["Low"]);
			  		arr.push(data[i]["Close"]);
			  		arr.push(data[i]["Adj Close"]);
			  		points.push(arr);
			  	}
		   })

		setTimeout(function(){
			var chart = JSC.chart('chartDiv', { 
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
		},1000);


		return(
			<>
				<div id="chartDiv" ></div>
			</>
		);
	}
}

export default Home;