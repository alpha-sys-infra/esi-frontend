import React, { PureComponent } from 'react';
import { Table, Button, message } from 'antd';
import { getImages, deleteImage } from '@/services/api-product';

const makeColumns = (btnEvent) => [
	{
		title: 'ID',
		dataIndex: 'id',
		key: 'id',
	},
	{
		title: '标签',
		dataIndex: 'tag',
		key: 'tag',
	},
	{
		title: '创建日期',
		dataIndex: 'created',
		key: 'created',
	},
	{
		title: '容文件大小量',
		dataIndex: 'size',
		key: 'size',
	},
	{
		title: '操作',
		dataIndex: 'id',
		key: 'controls',
		render: (text, record) => {
			const clickHandler = () => btnEvent(text);
			return (
				<Button type="danger" onClick={clickHandler}>
					删除
				</Button>
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
		this.columns = makeColumns(this.deleteImage);
	}

	componentDidMount() {
		this.setImageData();
	}

	setImageData = () => {
		return this.getImages().then((res) => {
			const { images } = res;
			this.setState({
				data: images,
			});
		});
	};

	deleteImage = (id) => {
		deleteImage(id).then((res) => {
			message.success(`ID：${id}镜像删除成功`);
			this.setImageData();
		}).catch((err)=>{
			message.error(`ID：${id}镜像删除失败，请稍后重试`);
        });
	};

	getImages = () => {
		return getImages().then((res) => {
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
