import React, { PureComponent, Fragment } from 'react';
import { Table,Badge } from 'antd';
import { getService } from '@/services/api-product';

const columns = [
	{
		title: '服务名',
		dataIndex: 'name',
		key: 'name'
	},
	{
		title: '状态',
		dataIndex: 'status',
		key: 'status',
		render: (text, record)=>{
			const isOff = text ==='off';
			if(isOff){
				return <Badge status="error" text="OFF" />
			}else{
				return <Badge status="success" text="ON" />
			}
		}
	},
	{
		title: '版本号',
		dataIndex: 'version',
		key: 'version',
	},
	{
		title: '地域',
		dataIndex: 'region',
		key: 'region',
	},
	{
		title: '云节点数',
		dataIndex: 'nodes_num',
		key: 'nodes_num',
	},
	{
		title: '其他',
		dataIndex: 'other',
		key: 'other',
	}
];

const getUniqueKey = (row, index) => {
	return index;
};

class ServerServiceList extends PureComponent {
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
		this.getNodes().then(({ services }) => {
			if (this.destroy) return;
			this.setState(
				{
					data: services,
				},
				() => {
					this.mockWSTimer = setTimeout(this.mockWbsocket, 5000);
				}
			);
		});
	};

	getNodes = () => {
		return getService().then((res) => res.data);
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

export default ServerServiceList;
