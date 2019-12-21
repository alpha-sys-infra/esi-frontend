import React, { PureComponent } from 'react';
import { Table } from 'antd';
import { getEndPoint } from '@/services/api-product';

import './serviceStyle.less';
const columns = [
	{
		title: '名称',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: '类型',
		dataIndex: 'type',
		key: 'type',
	},
	{
		title: '地址',
		dataIndex: 'url',
		key: 'url',
	},
	{
		title: '组',
		dataIndex: 'group',
		key: 'group',
	},
];

const getUniqueKey = (row, index) => {
	return index;
};

class ServiceIndex extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
		};
	}

	componentDidMount() {
		this.getEndPoint().then((res) => {
			const { endpoint } = res;
			this.setState({
				data: endpoint,
			});
		});
	}

	getEndPoint = () => {
		return getEndPoint().then((res) => {
			return res.data;
		});
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

export default ServiceIndex;
