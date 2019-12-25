import React, { PureComponent, Fragment } from 'react';
import { Table, Tag, Card } from 'antd';
import { getMultiplatServices } from '@/services/api-product';

const columns = [
	{
		title: '服务类型',
		dataIndex: 'service',
		key: 'service',
	},
	{
		title: '服务总数',
		dataIndex: 'total_amount',
		key: 'total_amount',
	},
	{
		title: '在线服务数',
		dataIndex: 'up_amount',
		key: 'up_amount',
		render: (text, record) => <Tag color="#87d068">{text}</Tag>,
	},
	{
		title: '服务停止数',
		dataIndex: 'down_amount',
		key: 'down_amount',
		render: (text, record) => <Tag color="#f50">{text}</Tag>,
	},
];

const getUniqueKey = (row, index) => {
	return index;
};

class PlatformMultiplatServices extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
		};
		this.columns = columns;
		this.cards = [
			{
				title: '国家平台服务类型',
				key: 'state',
			},
			{
				title: '省平台服务类型',
				key: 'province',
			},
			{
				title: '市平台服务类型',
				key: 'city',
			},
			{
				title: '县平台服务类型',
				key: 'county',
			},
		];
	}

	componentDidMount() {
		this.setMultiplatServices();
	}

	setMultiplatServices = () => {
		this.getMultiplatServices().then(({ multiplat_services }) => {
			this.setState({
				data: multiplat_services,
			});
		});
	};

	getMultiplatServices = () => {
		return getMultiplatServices().then((res) => res.data);
	};

	render() {
		const { data = {} } = this.state;
		return (
			<div>
				{this.cards.map(({ title, key }) => (
					<Card title={title} bordered={false} key={key}>
						<Table columns={columns} rowKey={getUniqueKey} dataSource={data[key]} pagination={false} />
					</Card>
				))}
			</div>
		);
	}
}

export default PlatformMultiplatServices;
