import React, { PureComponent } from 'react';
import { Steps, Spin, Select, Input, Form, Button, message, Card } from 'antd';
import { getCreateServices } from '@/services/api-product';

import './serviceStyle.less';

let Option = Select.Option;

const { Step } = Steps;

const steps = [
	{
		title: '模版',
	},
	{
		title: '设置',
	},
	{
		title: '配置',
	},
];

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 5 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 12 },
	},
};

class CreateServiceForm extends PureComponent {
	constructor(props) {
		super(props);

		// 下拉列表宽度
		this.selectStyle = { width: 180 };

		// 选中值
		this.chooseData = {};

		this.state = {
			// 加载状态
			loading: false,
			current: 0,
		};
	}

	next() {
		const current = this.state.current + 1;
		this.setState({ current });
	}

	prev() {
		const current = this.state.current - 1;
		this.setState({ current });
	}

	/** 
    * [设定表单选择项]
    * @Author: enyue.guo
    * @returns {void} 
    */
	setFormFileds = (key, value) => {
		this.props.form.setFieldsValue({
			[key]: value,
		});
	};

	/** 
    * [提交函数]
    * @Author: enyue.guo 
    * @returns {void} 
    */
	createServiceHandler = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				// this.setState({
				// 	...values,
				// });
				Object.assign(this.chooseData, values);
				if (this.state.current === steps.length - 1) {
					this.setState({
						loading: true,
					});
					console.log(this.chooseData, 'chooseData');
					return;
				}
				this.next();
				// createService(postPayload)
				//     .then((res) => {
				//         message.success(res.result)
				//     })
				//     .catch((err) => {
				//         message.error(err.message || '发生了错误')
				//     })
				//     .finally(() => {
				//         this.setState({
				//             loading: false
				//         });
				//     });
			}
		});
	};

	/** 
    * [重置表单提交数据]
    * @Author: enyue.guo 
    * @description: 重置表单数据的同事也将额外备份配置重置
    * @returns {void} 
    */
	resetForm = () => {
		this.props.form.resetFields();
	};

	componentDidMount() {
		getCreateServices()
			.then(({ data: { create_services } }) => {
				console.log(create_services, 'create_services');
				this.setState({ ...create_services });
			})
			.catch((err) => console.log(err));
	}

	render() {
		const { loading, current, tempaltes = [], setup = {}, config = {} } = this.state;
		const { getFieldDecorator } = this.props.form;
		const { group: groups = [], territory = [], env = [] } = setup;
		const { labels = [], images = [], restart_policy = [] } = config;
		const {
			template,
			service_name,
			service_group,
			service_terr,
			service_env,
			container_name,
			service_tag,
			service_image,
			cpu_limit,
			memo_limit,
			cpu_prev,
			memo_prev,
			service_restart_policy,
			data_name,
			ip_address,
			port,
		} = this.chooseData;
		return (
			<Spin spinning={loading}>
				<Form onSubmit={this.createServiceHandler} {...formItemLayout} className="service-create">
					<div>
						<Steps current={current} type="navigation">
							{steps.map((item) => <Step key={item.title} title={item.title} />)}
						</Steps>
						<div className="steps-content">
							{current === 0 && (
								<Card bordered={false} title="选择模版">
									<Form.Item label="模版">
										{getFieldDecorator('template', {
											initialValue: template,
											rules: [
												{
													required: true,
													message: '必须设置一个模版',
												},
											],
										})(
											<Select
												showSearch
												style={this.selectStyle}
												placeholder="模版"
												defaultActiveFirstOption={true}
												showArrow
												filterOption={false}
												notFoundContent={null}
											>
												{tempaltes.map((d) => {
													const key = `${d.type}-${d.name}`;
													return <Option key={key}>{key}</Option>;
												})}
											</Select>
										)}
									</Form.Item>
								</Card>
							)}
							{current === 1 && (
								<Card bordered={false} title="服务设置">
									<Form.Item label="服务名">
										{getFieldDecorator('service_name', {
											initialValue: service_name,
											rules: [
												{
													required: true,
													message: '必须填写服务名',
												},
											],
										})(<Input placeholder="请输入服务名" />)}
									</Form.Item>
									<Form.Item label="服务组">
										{getFieldDecorator('service_group', {
											initialValue: service_group,
											rules: [
												{
													required: true,
													message: '必须选择一个服务组',
												},
											],
										})(
											<Select
												showSearch
												style={this.selectStyle}
												placeholder="服务组"
												defaultActiveFirstOption={true}
												showArrow
												filterOption={false}
												notFoundContent={null}
											>
												{groups.map((d) => <Option key={d}>{d}</Option>)}
											</Select>
										)}
									</Form.Item>
									<Form.Item label="地域">
										{getFieldDecorator('service_terr', {
											initialValue: service_terr,
											rules: [
												{
													required: true,
													message: '必须选择一个地域',
												},
											],
										})(
											<Select
												showSearch
												style={this.selectStyle}
												placeholder="地域"
												defaultActiveFirstOption={true}
												showArrow
												filterOption={false}
												notFoundContent={null}
											>
												{territory.map((d) => (
													<Option key={d} value={d}>
														{d}
													</Option>
												))}
											</Select>
										)}
									</Form.Item>
									<Form.Item label="服务环境">
										{getFieldDecorator('service_env', {
											initialValue: service_env,
											rules: [
												{
													required: true,
													message: '必须选择一个服务环境',
												},
											],
										})(
											<Select
												showSearch
												style={this.selectStyle}
												placeholder="库名"
												defaultActiveFirstOption={true}
												showArrow
												filterOption={false}
												notFoundContent={null}
											>
												{env.map((d) => <Option key={d}>{d}</Option>)}
											</Select>
										)}
									</Form.Item>
								</Card>
							)}
							{current === 2 && (
								<Card bordered={false} title="服务配置">
									<Card bordered={false} title="服务实例信息">
										<Form.Item label="容器名">
											{getFieldDecorator('container_name', {
												initialValue: container_name,
												rules: [
													{
														required: true,
														message: '必须填写容器名',
													},
												],
											})(<Input placeholder="请输入容器名" />)}
										</Form.Item>
										<Form.Item label="标签">
											{getFieldDecorator('service_tag', {
												initialValue: service_tag,
												rules: [
													{
														required: true,
														message: '必须选择一个标签',
													},
												],
											})(
												<Select
													showSearch
													style={this.selectStyle}
													placeholder="标签"
													defaultActiveFirstOption={true}
													showArrow
													filterOption={false}
													notFoundContent={null}
												>
													{labels.map((d) => <Option key={d}>{d}</Option>)}
												</Select>
											)}
										</Form.Item>
									</Card>
									<Card bordered={false} title="服务实例信息">
										<Form.Item label="镜像文件">
											{getFieldDecorator('service_image', {
												initialValue: service_image,
												rules: [
													{
														required: true,
														message: '必须选择一个镜像文件',
													},
												],
											})(
												<Select
													showSearch
													style={this.selectStyle}
													placeholder="镜像文件"
													defaultActiveFirstOption={true}
													showArrow
													filterOption={false}
													notFoundContent={null}
												>
													{images.map((d) => <Option key={d}>{d}</Option>)}
												</Select>
											)}
										</Form.Item>
										<Form.Item label="CPU限制">
											{getFieldDecorator('cpu_limit', {
												initialValue: cpu_limit,
												rules: [
													{
														required: true,
														message: '必须填写CPU限制',
													},
												],
											})(<Input placeholder="请输入CPU限制" />)}
										</Form.Item>
										<Form.Item label="内存限制">
											{getFieldDecorator('memo_limit', {
												initialValue: memo_limit,
												rules: [
													{
														required: true,
														message: '必须填写内存限制',
													},
												],
											})(<Input placeholder="请输入内存限制" />)}
										</Form.Item>
										<Form.Item label="预设CPU">
											{getFieldDecorator('cpu_prev', {
												initialValue: cpu_prev,
												rules: [
													{
														required: true,
														message: '必须填写预设CPU',
													},
												],
											})(<Input placeholder="请输入预设CPU" />)}
										</Form.Item>
										<Form.Item label="预设内存">
											{getFieldDecorator('memo_prev', {
												initialValue: memo_prev,
												rules: [
													{
														required: true,
														message: '必须填写预设内存',
													},
												],
											})(<Input placeholder="请输入预设内存" />)}
										</Form.Item>
										<Form.Item label="重启条件">
											{getFieldDecorator('service_restart_policy', {
												initialValue: service_restart_policy,
												rules: [
													{
														required: true,
														message: '必须选择一个条件',
													},
												],
											})(
												<Select
													showSearch
													style={this.selectStyle}
													placeholder="重启条件"
													defaultActiveFirstOption={true}
													showArrow
													filterOption={false}
													notFoundContent={null}
												>
													{restart_policy.map((d) => <Option key={d}>{d}</Option>)}
												</Select>
											)}
										</Form.Item>
										<Form.Item label="数据卷">
											{getFieldDecorator('data_name', {
												initialValue: data_name,
												rules: [
													{
														required: true,
														message: '必须填写数据卷',
													},
												],
											})(<Input placeholder="请输入数据卷" />)}
										</Form.Item>
										<Form.Item label="公有IP">
											{getFieldDecorator('ip_address', {
												initialValue: ip_address,
												rules: [
													{
														required: true,
														message: '必须填写公有IP',
													},
													{
														pattern: /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/g,
														message: '请正确填写公有IP格式',
													},
												],
											})(<Input placeholder="请输入公有IP" />)}
										</Form.Item>
										<Form.Item label="端口">
											{getFieldDecorator('port', {
												initialValue: port,
												rules: [
													{
														required: true,
														message: '必须填写端口',
													},
													{
														pattern: /^\d{1,5}$/g,
														message: '请正确端口号',
													},
												],
											})(<Input placeholder="请输入端口" />)}
										</Form.Item>
									</Card>
								</Card>
							)}
						</div>
						<div className="steps-action">
							<Button disabled={current === 0} style={{ marginRight: 8 }} onClick={() => this.prev()}>
								上一步
							</Button>
							<Button type="primary" htmlType="submit">
								{current === steps.length - 1 ? '完成' : '下一步'}
							</Button>
						</div>
					</div>
				</Form>
			</Spin>
		);
	}
}

const CreateService = Form.create({ name: 'CreateService' })(CreateServiceForm);

export default CreateService;
