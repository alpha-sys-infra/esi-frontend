import React, { PureComponent } from 'react';
import { Row } from 'antd';
import MyCard from './components/card';
import { getDashboardData, getNodes, getService } from '@/services/api-product';

const getCount = (counter, key, newData) => {
	counter[key] = parseFloat(counter[key]) + parseFloat(newData[key]);
	counter[key] = counter[key].toFixed(2);
};

const getMax = (counter, key, newData) => {
	counter[key] = Math.max(counter[key], parseFloat(newData[key]));
};

const getMaxUptime = (counter, key, newData) => {
	counter[key] = getMaxTime(counter[key], newData[key]);
};

const getMaxTime = (a, b) => {
	if (!a || !b) {
		return '0,0,0';
	}
	let aArr = a.match(/\d+/g),
		bArr = b.match(/\d+/g),
		count = 0,
		prev = 0,
		next = 0,
		maxItem = '0,0,0';
	while (count < aArr.length) {
		prev = aArr[count];
		next = bArr[count];
		if (prev > next) {
			maxItem = a;
			count = aArr.length;
		} else if (prev < next) {
			maxItem = b;
			count = aArr.length;
		}
		count++;
	}
	return maxItem;
};

const makeData = (nodes) => {
	const tmp = {
		cpu_usage: 0,
		mem_free: 0,
		mem_total: 0,
		disk_avail: 0,
		disk_total: 0,
		sys_uptime: '0,0,0',
	};
	nodes.reduce((countRes, node) => {
		getCount(countRes, 'cpu_usage', node);
		getCount(countRes, 'mem_free', node);
		getCount(countRes, 'mem_total', node);
		getCount(countRes, 'disk_avail', node);
		getCount(countRes, 'disk_total', node);
		getMaxUptime(countRes, 'sys_uptime', node);
		return countRes;
	}, tmp);

	return tmp;
};

const makeServiceData = (data) => {
	const tmp = {};
	data.forEach((item, index) => {
		const [ type, ...rest ] = item.name.split('-');
		tmp[type] = item.status;
	});
	return tmp;
};

const makeNodeData = (data) => {
	return {
		node_total: data.length,
	};
};

class DashBoard extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			table: {},
			nodeTable: {},
			serviceTable: {},
			data: [
				{ title: 'CPU 利用率', numKey: 'cpu_usage', isPercent: true, desc: '4.1 of 6 Cores' },
				{ title: '内存总量', numKey: 'mem_total', isPercent: true, desc: '4.1 of 6 Cores' },
				{ title: '内存空余量', numKey: 'mem_free', isPercent: true, desc: '4.1 of 6 Cores' },
				{ title: '磁盘总量', numKey: 'disk_total', isPercent: false, desc: '4.1 of 6 Cores' },
				{ title: '磁盘空余量', numKey: 'disk_avail', isPercent: false, desc: '4.1 of 6 Cores' },
				{ title: '总系统运行时间', numKey: 'sys_uptime', isPercent: false, desc: '4.1 of 6 Cores' }
			],
			services: [
				{ title: '大数据处理系统', statusKey: 'data' },
				{ title: '数据中心操作系统', statusKey: 'air' },
				{ title: '分布式文件存储系统', statusKey: 'bridge' }
			],
			node: { title: '节点数量', numKey: 'node_total', isPercent: false, desc: '4.1 of 6 Cores' },
		};
		this.demoData = [ { Date: '-60s', scales: 0 }, { Date: '-30s', scales: 1 }, { Date: '0s', scales: 0 } ];
		this.colorConfig = [ '#7d5ffa', '#fc147e', '#1f82ef', '#30d5fd', '#26c586', '#967dfc', '#f9bb70' ];
	}

	componentDidMount() {
		this.mockWbsocket('getDashboardData', makeData, 'table');
		this.mockWbsocket('getService', makeServiceData, 'serviceTable');
		this.mockWbsocket('getNodes', makeNodeData, 'nodeTable');
	}

	componentWillUnmount() {
		clearTimeout(this.mockWSTimer);
		this.destroy = true;
	}

	mockWbsocket = (getType, makeData, key) => {
		this[getType]().then(({ result }) => {
			if (this.destroy) return;
			const table = makeData(result);
			this.setState(
				{
					[key]: table,
				},
				() => {
					this.mockWSTimer = setTimeout(this.mockWbsocket, 5000, getType, makeData, key);
				}
			);
		});
	};

	getDashboardData = () => {
		return getDashboardData().then((res) => {
			res.data.result = res.data.nodes;
			return res.data;
		});
	};

	getNodes = () => {
		return getNodes().then((res) => {
			res.data.result = res.data.nodes;
			return res.data;
		});
	};

	getService = () => {
		return getService().then((res) => {
			res.data.result = res.data.services;
			return res.data;
		});
	};

	render() {
		const { data, table, node, services, nodeTable, serviceTable } = this.state;
		return (
			<div>
				<Row>
					{data.map((item, idx) => (
						<MyCard
							title={item.title}
							table={table}
							item={item}
							key={idx}
							numKey={item.numKey}
							list={item.list}
							type={item.type}
							color={this.colorConfig[idx]}
							data={this.demoData}
						/>
					))}
					<MyCard
						title={node.title}
						table={nodeTable}
						item={node}
						data={this.demoData}
						numKey={node.numKey}
						color={this.colorConfig[6]}
					/>
					<MyCard title="服务监控" list={services} table={serviceTable} type="text" color={this.colorConfig[7]} />
				</Row>
			</div>
		);
	}
}

export default DashBoard;
