(this.webpackJsonptest=this.webpackJsonptest||[]).push([[0],{33:function(t,e,n){},36:function(t,e,n){"use strict";n.r(e);var a=n(8),o=n(9),r=n(11),s=n(10),i=n(12),c=n(0),u=n.n(c),l=(n(33),n(34)),d=n.n(l),h=function(t){function e(){return Object(a.a)(this,e),Object(r.a)(this,Object(s.a)(e).apply(this,arguments))}return Object(i.a)(e,t),Object(o.a)(e,[{key:"render",value:function(){for(var t=[],e=1;e<=300;e++){var n=new Date,a=n.setDate(n.getDate()+e),o=Math.round(100*Math.random()),r=[],s=new Date(a).getDate(),i=new Date(a).getMonth()+1;new Date(a).getFullYear();r.push(a),r.push(o),t.push(r)}var c={xAxis:{labels:{enabled:!1},minRange:36e5},credits:{enabled:!1},tooltip:{positioner:function(){return{x:80,y:50}},formatter:function(){return"<b>Date:</b>"+(new Date(this.x).getDate()+"/"+(new Date(this.x).getMonth()+1)+"/"+new Date(this.x).getFullYear())+"<br/><b>Stock:</b>"+this.y+"</b>"},shadow:!1,borderWidth:0},rangeSelector:{selected:1,inputEnabled:!1,buttons:[{type:"day",count:1,text:"1d"},{type:"day",count:7,text:"7d"},{type:"month",count:1,text:"1m"},{type:"month",count:6,text:"6m"},{type:"all",text:"All"}],buttonPosition:{align:"right"}},series:[{data:t}]};return u.a.createElement("div",{className:"container-fluid p-0"},u.a.createElement("div",{className:"row no-gutters"},u.a.createElement("div",{className:"col-md-6 offset-md-3 mt-3"},u.a.createElement(d.a,{config:c}))))}}]),e}(u.a.Component);e.default=h}}]);
//# sourceMappingURL=Home.73c82827.chunk.js.map