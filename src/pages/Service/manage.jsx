import React, { PureComponent } from 'react';
import { Table, Button, message } from 'antd';
import { getManageServices, deleteService, startService, stopService } from '@/services/api-product';
const makeColumns = ({ startEvent, stopEvent, delEvent }) => [
	{
		title: 'ID',
		dataIndex: 'id',
		key: 'id',
	},
	{
		title: '服务名',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: '映像文件',
		dataIndex: 'image',
		key: 'image',
	},
	{
		title: '命令',
		dataIndex: 'command',
		key: 'command',
	},
	{
		title: '服务端口',
		dataIndex: 'ports',
		key: 'ports',
	},
	{
		title: '服务状态',
		dataIndex: 'status',
		key: 'status',
	},
	{
		title: '操作',
		dataIndex: 'operations',
		key: 'operations',
		render: (text, record) => {
			const enableDel = text === 'started';
			const delHandler = () => {
					delEvent(record);
				},
				startHandler = () => {
					startEvent(record);
				},
				stopHandler = () => {
					stopEvent(record);
				};
			return enableDel ? (
				<div>
					<Button onClick={startHandler} style={{ background: '#52c41a', color: '#fff' }} type="success">
						开始
					</Button>
					<Button onClick={delHandler} type="danger">
						删除
					</Button>
				</div>
			) : (
				<div>
					<Button onClick={stopHandler} style={{ background: '#faad14', color: '#fff' }}>
						停止
					</Button>
				</div>
			);
		},
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
		this.columns = makeColumns({
			startEvent: this.startService,
			stopEvent: this.stopService,
			delEvent: this.delService,
		});
	}

	startService = (record) => {
		const { id } = record;
		startService(id)
			.then(() => {
				message.success('服务开启成功');
				this.setServiceData();
			})
			.catch(() => {
				message.error('服务开启失败');
			});
	};
	stopService = (record) => {
		const { id } = record;
		stopService(id)
			.then(() => {
				message.success('服务关闭成功');
				this.setServiceData();
			})
			.catch(() => {
				message.error('服务关闭失败');
			});
	};
	delService = (record) => {
		const { id } = record;
		deleteService(id)
			.then(() => {
				message.success('服务删除成功');
				this.setServiceData();
			})
			.catch(() => {
				message.error('服务删除失败');
			});
	};

	componentDidMount() {
		this.setServiceData();
	}

	setServiceData = () => {
		return this.getManageServices().then((res) => {
			const { services } = res;
			this.setState({
				data: services,
			});
		});
	};

	getManageServices = () => {
		return getManageServices().then((res) => {
			return res.data;
		});
	};

	render() {
		const { data } = this.state;
		return (
			<div>
				<Table columns={this.columns} rowKey={getUniqueKey} dataSource={data} pagination={false} />
			</div>
		);
	}
}

export default ServiceIndex;
