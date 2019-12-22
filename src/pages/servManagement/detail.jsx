import React, { PureComponent } from 'react';
import { Table, List,Divider } from 'antd';
import { withRouter } from 'react-router';
import { getServiceDetail } from '@/services/api-product';
import { getUrlQueryString } from '@/utils/util';

const ListItem = List.Item;

const makeColumns = (btnEvent) => [
	{
		title: 'UID',
		dataIndex: 'uid',
		key: 'uid',
	},
	{
		title: 'PID',
		dataIndex: 'pid',
		key: 'pid',
	},
	{
		title: 'TTY',
		dataIndex: 'tty',
		key: 'tty',
	},
	{
		title: 'CPU',
		dataIndex: 'cpu',
		key: 'cpu',
	},
	{
		title: '内存',
		dataIndex: 'mem',
		key: 'mem',
	},
	{
		title: '创建时间',
		dataIndex: 'created',
		key: 'created',
	},
	{
		title: '运行时间',
		dataIndex: 'runtime',
		key: 'runtime',
	}
];

const getUniqueKey = (row, index) => {
	return index;
};


const Detail = ({ className, data, header, size, bordered }) => {
	return (
		<List
			header={header}
			size={size}
			bordered={bordered}
			className={className}
			dataSource={data}
			renderItem={(item) => (
				<ListItem>
					{item.label}：{item.value}
				</ListItem>
			)}
		/>
	);
};

class ServiceIndex extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
		};
		this.columns = makeColumns(this.deleteImage);
	}

	componentDidMount() {
        const id = getUrlQueryString('id', this.props.history.location.search);
        console.log(id,"id")
		if (id) {
			this.setServiceDeatil(id);
		}
	}

	setServiceDeatil = (id) => {
		return this.getServiceDetail(id).then((res) => {
			const { data } = res;
			this.setState({
				data: data,
			});
		});
	};

	getServiceDetail = (id) => {
		return getServiceDetail(id).then((res) => {
			return res.data;
		});
	};

	render() {
        const { data } = this.state;
        const tableData = [data];
        const detailData =[{ label: 'ID', value:data.id },{ label: '服务名', value: data.name },{ label: '映像文件', value: data.image },{ label: '命令', value: data.command },{ label: '服务端口', value: data.ports },{ label: '服务状态', value: data.status }];
		return (
			<div>
                <Detail data={detailData}/>
                <Divider></Divider>
				<Table columns={this.columns} rowKey={getUniqueKey} dataSource={tableData} pagination={false} />
			</div>
		);
	}
}

export default withRouter(ServiceIndex);
