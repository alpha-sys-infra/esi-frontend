webpackJsonp([3],{1375:function(e,t,n){"use strict";var a=(n(1376),n(1377),n(1378),n(1379),n(1380),n(1381),n(1382),n(1383),n(1384),n(1385));n.d(t,"a",function(){return a.default})},1376:function(e,t,n){e.exports=n(17)(90)},1377:function(e,t,n){e.exports=n(17)(94)},1378:function(e,t,n){e.exports=n(17)(96)},1379:function(e,t,n){e.exports=n(17)(31)},1380:function(e,t,n){e.exports=n(17)(12)},1381:function(e,t,n){e.exports=n(17)(98)},1382:function(e,t,n){e.exports=n(17)(100)},1383:function(e,t,n){e.exports=n(17)(33)},1384:function(e,t,n){e.exports=n(17)(13)},1385:function(e,t,n){e.exports=n(17)(104)},689:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=n(664),u=(n.n(i),n(665)),c=n.n(u),l=n(677),s=(n.n(l),n(678)),f=n.n(s),d=n(668),p=(n.n(d),n(669)),m=n.n(p),b=n(0),y=n.n(b),v=n(1375),h=n(663),x=n(140),I=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),O=m.a.Item,k=function(e){return[{title:"UID",dataIndex:"uid",key:"uid"},{title:"PID",dataIndex:"pid",key:"pid"},{title:"TTY",dataIndex:"tty",key:"tty"},{title:"CPU",dataIndex:"cpu",key:"cpu"},{title:"内存",dataIndex:"mem",key:"mem"},{title:"创建时间",dataIndex:"created",key:"created"},{title:"运行时间",dataIndex:"runtime",key:"runtime"}]},g=function(e,t){return t},j=function(e){var t=e.className,n=e.data,a=e.header,r=e.size,o=e.bordered;return y.a.createElement(m.a,{header:a,size:r,bordered:o,className:t,dataSource:n,renderItem:function(e){return y.a.createElement(O,null,e.label,"：",e.value)}})},w=function(e){function t(e){a(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.setServiceDeatil=function(e){return n.getServiceDetail(e).then(function(e){var t=e.data;n.setState({data:t})})},n.getServiceDetail=function(e){return Object(h.m)(e).then(function(e){return e.data})},n.state={data:[]},n.columns=k(n.deleteImage),n}return o(t,e),I(t,[{key:"componentDidMount",value:function(){var e=Object(x.c)("id",this.props.history.location.search);console.log(e,"id"),e&&this.setServiceDeatil(e)}},{key:"render",value:function(){var e=this.state.data,t=[e],n=[{label:"ID",value:e.id},{label:"服务名",value:e.name},{label:"映像文件",value:e.image},{label:"命令",value:e.command},{label:"服务端口",value:e.ports},{label:"服务状态",value:e.status}];return y.a.createElement("div",null,y.a.createElement(j,{data:n}),y.a.createElement(f.a,null),y.a.createElement(c.a,{columns:this.columns,rowKey:g,dataSource:t,pagination:!1}))}}]),t}(b.PureComponent);t.default=Object(v.a)(w)}});
//# sourceMappingURL=3.23b814f1.chunk.js.map