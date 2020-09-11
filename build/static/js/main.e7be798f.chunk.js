(this.webpackJsonptest=this.webpackJsonptest||[]).push([[0],{27:function(e,t,a){e.exports=a(40)},34:function(e,t,a){},40:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),o=a(24),r=a.n(o),i=a(13),s=a(14),c=a(16),d=a(15),m=a(17),u=a(7),h=a(6),p=a(9),v=a(10),g=a.n(v),f=(a(34),a(5));f.defaults({baseUrl:"./js/jsc/"});var b=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(c.a)(this,Object(d.a)(t).call(this))).state={csv_urls:["https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v7/finance/download/AAPL?period1=1568005508&period2=1599627908&interval=1d&events=history","https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v7/finance/download/GOOG?period1=1568005508&period2=1599627908&interval=1d&events=history","https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v7/finance/download/MSFT?period1=1568005508&period2=1599627908&interval=1d&events=history"],loading:!1,show_chart_menu:!1,open_mobile_navbar:!1},e.addChart=e.addChart.bind(Object(p.a)(e)),e.onChangeHandler=e.onChangeHandler.bind(Object(p.a)(e)),e.renderChart=e.renderChart.bind(Object(p.a)(e)),e}return Object(m.a)(t,e),Object(s.a)(t,[{key:"fetchStyle",value:function(e){return JSON.parse(window.localStorage.getItem("draggableElementCoordinates")).filter((function(t){return t.element===e}))[0]}},{key:"timeoutNetworkRequest",value:function(e){var t=this;return new Promise((function(a,n){var l=setTimeout((function(){t.setState({loading:!1}),g()({title:"Error",text:"Error occured while fetching financial data!",icon:"warning"})}),2e4);e.then((function(e){clearTimeout(l),a(e)}),(function(e){clearTimeout(l),t.setState({loading:!1}),g()({title:"Error",text:"Error occured while fetching financial data!",icon:"warning"})}))}))}},{key:"addDragAbility",value:function(e,t){var a,n,l=0,o=0,r=0,i=0,s=0,c=0,d=0;function m(e){var a,n;e=e||window.event,l=e.clientX,o=e.clientY,r=l-c,i=o-d,s=document.getElementsByClassName("draggable-elements")[0].offsetWidth-t.offsetWidth,r>0&&r<s&&i>0&&i<s&&(a=r,n=i,t.style.left=a+"px",t.style.top=n+"px")}e=e||window.event,l=e.clientX,o=e.clientY,a=t.style.top.replace("px",""),n=t.style.left.replace("px",""),c=l-n,d=o-a,document.addEventListener("mousemove",m),t.onmouseup=function(e){document.removeEventListener("mousemove",m),t.onmouseup=null}}},{key:"renderChart",value:function(e,t,a){var n=this,l=[],o="apple"===e?a[0]:"google"===e?a[1]:a[2];this.setState({loading:!0}),this.timeoutNetworkRequest(f.fetch(o)).then((function(e){return e.text()})).then((function(e){n.setState({loading:!1});for(var a=f.csv2Json(e),o=0;o<a.length;o++){var r=[];r.push(f.formatDate(a[o].Date,"d")),r.push(a[o]["Adj Close"]),l.push(r)}var i=f.chart(t,{debug:!0,type:"line",title_label_text:"",legend_position:"inside bottom right",toolbar_items:{"Line Type":{type:"select",label_style_fontSize:13,margin:5,items:"Line,Step,Spline",events_change:function(e){i.series().options({type:e})}}},xAxis:{scale_type:"time"},series:[{name:"",points:l}],defaultTooltip:{combined:!0,label_text:"<b>%xValue</b><br>%points"}})})).catch((function(e){console.log(e),n.setState({loading:!1}),g()({title:"Error",text:"Error occured while fetching financial data!",icon:"warning"})}))}},{key:"onChangeHandler",value:function(e){var t="chart_"+e.target.id.split("_")[1],a=e.target.value,n=this.state.csv_urls;"apple"===a?this.renderChart("apple",t,n):"google"===a?this.renderChart("google",t,n):this.renderChart("microsoft",t,n)}},{key:"addChart",value:function(){this.setState({show_chart_menu:!this.state.show_chart_menu});var e=window.localStorage.getItem("chart_num"),t=this;e=e&&null!==e?Number(e)+1:1,window.localStorage.setItem("chart_num",e);var a=document.createElement("div");a.className="chart",a.id="chart_"+e;var n=document.createElement("div");n.className="elements-wrapper",n.id="element_"+e,n.appendChild(a);var l=[{label:"Select a stock",value:""},{label:"Apple",value:"apple"},{label:"Google",value:"google"},{label:"Microsoft",value:"microsoft"}],o=document.createElement("select");o.id="select_"+e,o.onchange=this.onChangeHandler;var r=document.createElement("div");r.classList.add("draggable-div"),r.innerHTML="Drag me";var i=document.createElement("div");i.appendChild(o),i.appendChild(r),i.classList.add("chart-element-header"),n.prepend(i),window.innerWidth>=1024&&r.addEventListener("mousedown",(function(e){t.addDragAbility(e,n)})),document.getElementsByClassName("chart-container")[0].appendChild(n);for(var s=0;s<l.length;s++){var c=document.createElement("option");c.value=l[s].value,c.text=l[s].label,o.appendChild(c)}}},{key:"saveData",value:function(){var e=document.querySelectorAll("select"),t=[],a={},n=[];e.forEach((function(e,l){var o={},r=e.id.split("_")[1],i=e.value;o.id=r,o.value=i,t.push(o);var s=document.getElementById("element_"+r);a={top:s.style.top,left:s.style.left,element:"element_"+r},n.push(a)}));var l=JSON.stringify(t);window.localStorage.setItem("last_values",l),window.localStorage.setItem("draggableElementCoordinates",JSON.stringify(n)),g()({title:"Success",text:"Data saved successfully!",icon:"success"})}},{key:"componentDidMount",value:function(){var e=this,t=JSON.parse(window.localStorage.getItem("last_values")),a=this.state.csv_urls,n=this;if(t&&t.length>0)for(var l=function(){var l=document.createElement("div");l.id="chart_"+t[o].id,l.className="chart";var d=document.createElement("div");d.className="elements-wrapper";var m="element_"+t[o].id;d.id=m;var u=e.fetchStyle(m);for(u&&(d.style.top=u.top,d.style.left=u.left),d.appendChild(l),r=[{label:"Select a stock",value:""},{label:"Apple",value:"apple"},{label:"Google",value:"google"},{label:"Microsoft",value:"microsoft"}],(i=document.createElement("select")).id="select_"+t[o].id,s=0;s<r.length;s++)(c=document.createElement("option")).value=r[s].value,c.text=r[s].label,i.appendChild(c);i.value=t[o].value,i.onchange=e.onChangeHandler;var h=document.createElement("div");h.classList.add("draggable-div"),h.innerHTML="Drag me";var p=document.createElement("div");p.appendChild(i),p.appendChild(h),p.classList.add("chart-element-header"),d.prepend(p),window.innerWidth>=1024&&h.addEventListener("mousedown",(function(e){n.addDragAbility(e,d)})),document.getElementsByClassName("chart-container")[0].appendChild(d);var v=[],b="apple"===t[o].value?a[0]:"google"===t[o].value?a[1]:"microsoft"===t[o].value?a[2]:"";b&&(e.setState({loading:!0}),e.timeoutNetworkRequest(f.fetch(b)).then((function(e){return e.text()})).then((function(t){e.setState({loading:!1});var a=f.csv2Json(t);delete a.columns,delete a.types;for(var n=0;n<a.length;n++){var o=[];o.push(f.formatDate(a[n].Date,"d")),o.push(a[n]["Adj Close"]),v.push(o)}var r=f.chart(l,{debug:!0,type:"line",title_label_text:"",legend_position:"inside bottom right",toolbar_items:{"Line Type":{type:"select",label_style_fontSize:13,margin:5,items:"Line,Step,Spline",events_change:function(e){r.series().options({type:e})}}},xAxis:{scale_type:"time"},series:[{name:"",points:v}],defaultTooltip:{combined:!0,label_text:"<b>%xValue</b><br>%points"}})})).catch((function(t){console.log(t),e.setState({loading:!1}),g()({title:"Error",text:"Error occured while fetching financial data!",icon:"warning"})})))},o=0;o<t.length;o++){var r,i,s,c;l()}}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{className:"wrapper"},!!this.state.loading&&l.a.createElement("div",{className:"overlay-mask"},l.a.createElement("i",{className:"fa fa-refresh fa-spin"})),l.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-light bg-light"},l.a.createElement(u.b,{className:"navbar-brand",to:"/"},"Charts"),l.a.createElement("button",{className:"navbar-toggler",type:"button",onClick:function(){return e.setState({open_mobile_navbar:!e.state.open_mobile_navbar})}},l.a.createElement("span",{className:"navbar-toggler-icon"})),l.a.createElement("div",{className:this.state.open_mobile_navbar?"collapse navbar-collapse show":"collapse navbar-collapse",id:"navbarNavDropdown"},l.a.createElement("ul",{className:"navbar-nav ml-auto"},l.a.createElement("li",{className:"nav-item active"},l.a.createElement(u.b,{className:"nav-link",to:"/",onClick:this.saveData},"Save")),l.a.createElement("li",{className:"nav-item dropdown"},l.a.createElement(u.b,{className:"nav-link dropdown-toggle",to:"/",id:"navbarDropdownMenuLink",onClick:function(){return e.setState({show_chart_menu:!e.state.show_chart_menu})}},"Insert"),l.a.createElement("div",{className:this.state.show_chart_menu?"dropdown-menu show":"dropdown-menu"},l.a.createElement(u.b,{className:"dropdown-item",to:"/",onClick:this.addChart},l.a.createElement("img",{src:"images/chart.png",className:"chart-thumbnail-img",alt:"chart"}),l.a.createElement("span",{className:"chart-menu-heading"},"Chart"))))))),l.a.createElement("div",{className:"chart-container"},l.a.createElement("div",{className:"draggable-elements"})))}}]),t}(l.a.PureComponent),w=function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return l.a.createElement(u.a,null,l.a.createElement(h.a,{path:"/",component:b}))}}]),t}(l.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(l.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[27,1,2]]]);
//# sourceMappingURL=main.e7be798f.chunk.js.map