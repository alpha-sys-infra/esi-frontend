import React, { PureComponent, Fragment } from 'react';
import { Table, Tag, Progress } from 'antd';
import { getNodes } from '@/services/api-product';

const columns = [
	{
		title: '节点IP地址',
		dataIndex: 'ip',
		key: 'ip',
	},
	{
		title: '状态',
		dataIndex: 'status',
		key: 'status',
		render: (text, record) => {
			const isOff = text === 'off';
			if (isOff) {
				return <Tag color="#f50">OFF</Tag>;
			} else {
				return <Tag color="#87d068">ON</Tag>;
			}
		},
	},
	{
		title: '地域',
		dataIndex: 'region',
		key: 'region',
	},
	{
		title: 'CPU使用率',
		dataIndex: 'cpu_num',
		key: 'cpu_num',
		render: (text, record) => {
			const isOver = text > 80;
			const strokeColor = isOver ? '#f50' : '#87d068';
			return <Progress percent={text} strokeColor={strokeColor} size="small" />;
		},
	},
	{
		title: '内存使用率',
		dataIndex: 'mem_total',
		key: 'mem_total',
		render: (text, record) => {
			const isOver = text > 80;
			const strokeColor = isOver ? '#f50' : '#87d068';
			return <Progress percent={text} strokeColor={strokeColor} size="small" />;
		},
	},
];

const getUniqueKey = (row, index) => {
	return index;
};

class NodesList extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
		};
		this.columns = columns;
		this.mockWSTimer = null;
		this.destroy = false;
	}

	componentDidMount() {
		this.mockWbsocket();
	}

	componentWillUnmount() {
		clearTimeout(this.mockWSTimer);
		this.destroy = true;
	}

	mockWbsocket = () => {
		this.getNodes().then(({ nodes }) => {
			if (this.destroy) return;
			this.setState(
				{
					data: nodes,
				},
				() => {
					this.mockWSTimer = setTimeout(this.mockWbsocket, 5000);
				}
			);
		});
	};

	getNodes = () => {
		return getNodes().then((res) => res.data);
	};

	render() {
		const { data } = this.state;
		return (
			<div>
				<Table columns={columns} rowKey={getUniqueKey} dataSource={data} pagination={false} />
			</div>
		);
	}
}

export default NodesList;
