import React, { PureComponent, Fragment } from 'react';
import { List, Avatar, Upload, Button, Icon, message, Divider } from 'antd';
import { getUserInfo } from '@/services/api-product';

import './userInfoStyle.less';

const ListItem = List.Item;

// 用户名字`， 如：张三
// `用户职位`， 如：应急专员
// `部门`， 如： 应急厅
// `城市`， 如： 成都
// `简介`， 如：无

const props = {
	name: 'file',
	action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
	headers: {
		authorization: 'authorization-text',
	},
	disabled: true,
	onChange(info) {
		if (info.file.status !== 'uploading') {
			console.log(info.file, info.fileList);
		}
		if (info.file.status === 'done') {
			message.success(`${info.file.name} file uploaded successfully`);
		} else if (info.file.status === 'error') {
			message.error(`${info.file.name} file upload failed.`);
		}
	},
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

class UserInfo extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
		};
	}

	componentDidMount() {
		this.getUserInfo().then(({ result: data }) => {
			this.setState({
				data,
			});
		});
	}

	getUserInfo = () => {
		return getUserInfo().then((res) => {
			return res.data;
		});
	};

	render() {
		const { data } = this.state;
		const { name, role, department, city, intro, email, tel, permission } = data || {};
		const items = [
			{ label: '姓名', value: name },
			{ label: '职位', value: role },
			{ label: '部门', value: department },
			{ label: '城市', value: city },
			{ label: '简介', value: intro },
		];
		const aboutData = [
			{ label: '邮件', value: email },
			{ label: '电话', value: tel },
			{ label: '权限', value: permission },
		];
		return (
			<div className="user-profile-box">
				<ul>
					<ListItem extra={<Detail className="user-detail-card" data={items} />}>
						<div className="user-avatar-card">
							<Avatar src={data.photo_url} size={100} />
							<Divider />
							<Upload {...props}>
								<Button disabled>
									<Icon type="upload" /> 上传新头像
								</Button>
							</Upload>
						</div>
					</ListItem>
				</ul>
				<Detail
                    className="user-profile-list"
					data={aboutData}
					bordered={true}
					header={
						<div>
							<Icon type="star" /> 关于
						</div>
					}
				/>
			</div>
		);
	}
}

export default UserInfo;
