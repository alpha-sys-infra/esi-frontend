webpackJsonp([16],{909:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=n(867),i=(n.n(u),n(868)),c=n.n(i),l=n(0),f=n.n(l),p=n(872),s=n(889),d=(n.n(s),function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}()),y=[{title:"名称",dataIndex:"name",key:"name"},{title:"类型",dataIndex:"type",key:"type"},{title:"地址",dataIndex:"url",key:"url"},{title:"组",dataIndex:"group",key:"group"}],b=function(e,t){return t},h=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.getEndPoint=function(){return Object(p.d)().then(function(e){return e.data})},n.state={data:[]},n}return a(t,e),d(t,[{key:"componentDidMount",value:function(){var e=this;this.getEndPoint().then(function(t){var n=t.endpoint;e.setState({data:n})})}},{key:"render",value:function(){var e=this.state.data;return f.a.createElement("div",null,f.a.createElement(c.a,{columns:y,rowKey:b,dataSource:e,pagination:!1}))}}]),t}(l.PureComponent);t.default=h}});
//# sourceMappingURL=16.86207ec8.chunk.js.map