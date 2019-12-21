import React, { PureComponent, Fragment } from 'react';
import { Table, Badge, Tag } from 'antd';
import { getNetwork } from '@/services/api-product';

const columns = [
	{
		title: '服务地址名',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: '请求成功数',
		dataIndex: 'success',
		key: 'success',
		render: (text, record) => {
			return <Badge status="success" text={text} />;
		},
	},
	{
		title: '请求失败数',
		dataIndex: 'failure',
		key: 'failure',
		render: (text, record) => {
			return <Badge status="error" text={text} />;
		},
	},
	{
		title: '请求失败率',
		render: (text, record) => {
			const { success, failure } = record;
			const precentNum = failure / (success + failure);
            const precent = parseFloat(failure / (success + failure) * 100).toFixed(2);
			if (precentNum > 0.3) {
				return <Tag color="#f50">{precent}%</Tag>;
			} else {
				return <Tag color="#87d068">{precent}%</Tag>;
			}
		},
	},
];

const getUniqueKey = (row, index) => {
	return index;
};

class NetworkingList extends PureComponent {
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
		this.getNetwork().then(({ networking: result }) => {
			if (this.destroy) return;
			this.setState(
				{
					data: result,
				},
				() => {
					this.mockWSTimer = setTimeout(this.mockWbsocket, 5000);
				}
			);
		});
	};

	getNetwork = () => {
		return getNetwork().then((res) => res.data);
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

export default NetworkingList;
