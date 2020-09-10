(this.webpackJsonptest=this.webpackJsonptest||[]).push([[3],{50:function(e,a,t){},69:function(e,a,t){"use strict";t.r(a);var n=t(8),l=t(9),r=t(11),o=t(10),i=t(16),s=t(12),c=t(0),d=t.n(c),p=t(17),u=t(48),m=t.n(u),v=(t(50),t(51));v.defaults({baseUrl:"./js/jsc/"});var h=function(e){function a(){var e;return Object(n.a)(this,a),(e=Object(r.a)(this,Object(o.a)(a).call(this))).state={csv_urls:["https://query1.finance.yahoo.com/v7/finance/download/APP?period1=1568005508&period2=1599627908&interval=1d&events=history","https://query1.finance.yahoo.com/v7/finance/download/GOOG?period1=1568005508&period2=1599627908&interval=1d&events=history","https://query1.finance.yahoo.com/v7/finance/download/MSFT?period1=1568005508&period2=1599627908&interval=1d&events=history"]},e.addChart=e.addChart.bind(Object(i.a)(e)),e.onChangeHandler=e.onChangeHandler.bind(Object(i.a)(e)),e}return Object(s.a)(a,e),Object(l.a)(a,[{key:"renderChart",value:function(e,a,t){var n=[],l="apple"===e?t[0]:"google"===e?t[1]:t[2];v.fetch(l).then((function(e){return e.text()})).then((function(e){for(var t=v.csv2Json(e),l=0;l<t.length;l++){var r=[];r.push(v.formatDate(t[l].Date,"d")),r.push(t[l]["Adj Close"]),n.push(r)}document.getElementsByClassName("chart-container")[0];var o=v.chart(a,{debug:!0,type:"line",title_label_text:"",legend_position:"inside bottom right",toolbar_items:{"Line Type":{type:"select",label_style_fontSize:13,margin:5,items:"Line,Step,Spline",events_change:function(e){o.series().options({type:e})}}},xAxis:{scale_type:"time"},series:[{name:"",points:n}],defaultTooltip:{combined:!0,label_text:"<b>%xValue</b><br>%points"}})})).catch((function(e){console.log(e),m()({title:"Error",text:"Error occured while fetching financial data!",icon:"warning"})}))}},{key:"onChangeHandler",value:function(e){var a="chart_"+e.target.id.split("_")[1],t=e.target.value,n=this.state.csv_urls;"apple"===t?this.renderChart("apple",a,n):"google"===t?this.renderChart("google",a,n):this.renderChart("microsoft",a,n)}},{key:"addChart",value:function(){var e=window.localStorage.getItem("chart_num");e&&null!==e?(e=Number(e)+1,window.localStorage.setItem("chart_num",e)):(e=1,window.localStorage.setItem("chart_num",e));var a=document.createElement("div");a.id="chart_"+e,a.className="chart";var t=document.createElement("div");t.className="elements-wrapper",t.appendChild(a);var n=[{label:"Select a stock",value:""},{label:"Apple",value:"apple"},{label:"Google",value:"google"},{label:"Microsoft",value:"microsoft"}],l=document.createElement("select");l.id="select_"+e,l.onchange=this.onChangeHandler,t.prepend(l),document.getElementsByClassName("chart-container")[0].appendChild(t);for(var r=0;r<n.length;r++){var o=document.createElement("option");o.value=n[r].value,o.text=n[r].label,l.appendChild(o)}}},{key:"saveData",value:function(){var e=document.querySelectorAll("select"),a=[];e.forEach((function(e,t){var n={},l=e.id.split("_")[1],r=e.value;n.id=l,n.value=r,a.push(n)}));var t=JSON.stringify(a);window.localStorage.setItem("last_values",t),m()({title:"Success",text:"Data saved successfully!",icon:"success"})}},{key:"componentDidMount",value:function(){var e=this,a=JSON.parse(window.localStorage.getItem("last_values")),t=this.state.csv_urls;if(a&&a.length>0)for(var n=function(){var n=document.createElement("div");n.id="chart_"+a[l].id,n.className="chart";var c=document.createElement("div");for(c.className="elements-wrapper",c.appendChild(n),r=[{label:"Select a stock",value:""},{label:"Apple",value:"apple"},{label:"Google",value:"google"},{label:"Microsoft",value:"microsoft"}],(o=document.createElement("select")).id="select_"+a[l].id,i=0;i<r.length;i++)(s=document.createElement("option")).value=r[i].value,s.text=r[i].label,o.appendChild(s);o.value=a[l].value,o.onchange=e.onChangeHandler,c.prepend(o),document.getElementsByClassName("chart-container")[0].appendChild(c);var d=[],p="apple"===a[l].value?t[0]:"google"===a[l].value?t[1]:"microsoft"===a[l].value?t[2]:"";p?v.fetch(p).then((function(e){return e.text()})).then((function(e){var a=v.csv2Json(e);delete a.columns,delete a.types;for(var t=0;t<a.length;t++){var l=[];l.push(v.formatDate(a[t].Date,"d")),l.push(a[t]["Adj Close"]),d.push(l)}var r=v.chart(n,{debug:!0,type:"line",title_label_text:"",legend_position:"inside bottom right",toolbar_items:{"Line Type":{type:"select",label_style_fontSize:13,margin:5,items:"Line,Step,Spline",events_change:function(e){r.series().options({type:e})}}},xAxis:{scale_type:"time"},series:[{name:"",points:d}],defaultTooltip:{combined:!0,label_text:"<b>%xValue</b><br>%points"}})})).catch((function(e){console.log(e),m()({title:"Error",text:"Error occured while fetching financial data!",icon:"warning"})})):v.Chart(n,{series:[{points:[]}]})},l=0;l<a.length;l++){var r,o,i,s;n()}}},{key:"render",value:function(){return d.a.createElement("div",{className:"wrapper"},d.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-light bg-light"},d.a.createElement(p.b,{className:"navbar-brand",to:"/"},"Charts"),d.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarNavDropdown","aria-controls":"navbarNavDropdown","aria-expanded":"false","aria-label":"Toggle navigation"},d.a.createElement("span",{className:"navbar-toggler-icon"})),d.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarNavDropdown"},d.a.createElement("ul",{className:"navbar-nav ml-auto"},d.a.createElement("li",{className:"nav-item active"},d.a.createElement(p.b,{className:"nav-link",to:"/",onClick:this.saveData},"Save")),d.a.createElement("li",{className:"nav-item dropdown"},d.a.createElement(p.b,{className:"nav-link dropdown-toggle",to:"/",id:"navbarDropdownMenuLink","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"},"Insert"),d.a.createElement("div",{className:"dropdown-menu","aria-labelledby":"navbarDropdownMenuLink"},d.a.createElement(p.b,{className:"dropdown-item",to:"/",onClick:this.addChart},d.a.createElement("img",{src:"images/chart.png",className:"chart-thumbnail-img"}),d.a.createElement("span",{className:"chart-menu-heading"},"Chart"))))))),d.a.createElement("div",{className:"chart-container"}))}}]),a}(d.a.Component);a.default=h}}]);
//# sourceMappingURL=Home.1f883374.chunk.js.map