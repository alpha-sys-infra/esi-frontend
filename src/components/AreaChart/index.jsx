import React from 'react';
import { Area } from '@antv/g2plot';

class AreaChart extends React.PureComponent {
	constructor(props) {
		super(props);
		this.areaRef = null;
        this.areaPlot = null;
        this.uiStyle={
            height:240
        };
		this.config = {
			title: {
				visible: false,
				text: '',
			},
			line: {
				visible: true,
				color: '#fac232',
			},
			color: '#fac232',
			xField: 'Date',
			yField: 'scales',
			xAxis: {
				type: 'dateTime',
				tickCount: 5,
			},
		};
	}

	getRef = (ref) => {
		this.areaRef = ref;
	};

	componentDidMount() {
		const { config, data, color } = this.props;
		const _config = { ...this.config, ...config, data };
		if(color){
            _config.line.color=color;
            _config.color=color;
        }
		this.areaPlot = new Area(this.areaRef, _config);
		this.areaPlot.render();
	}

	componentWillUnmount() {
		this.areaRef = null;
		this.areaPlot && this.areaPlot.destory && this.areaPlot.destory();
		this.areaPlot = null;
	}

	render() {
		return <div ref={this.getRef} style={this.uiStyle}/>;
	}
}

export default AreaChart;
