import React, { PureComponent } from 'react';
import { Card, Row, Col, Icon } from 'antd';
import { getMainServices } from '@/services/api-product';
import { MenuIcon, GatherIcon, SunnaryIcon, RelationIcon } from './icon';

import './serviceStyle.less';

class ServiceIndex extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.getMainServices().then((res) => {
			const { main_services } = res;
			this.setState({
				...main_services,
			});
		});
	}

	getMainServices = () => {
		return getMainServices().then((res) => {
			return res.data;
		});
	};

	render() {
		const { image, imgsize, networks, running, services, stopped, volumes } = this.state;
		return (
			<div className="main-services-box">
				<Row gutter={16}>
					<Col span={12} className="main-services-card">
						<Card>
							<Row>
								<Col span={6}>
									<GatherIcon className="main-services-title-icon" />
								</Col>
								<Col span={10}>
									<span className="main-services-num">{services}</span>
									<p className="main-services-title">Containers</p>
								</Col>
								<Col span={8} className="main-services-extra-box">
									<div>
										<Icon type="heart" style={{ color: '#0f0' }} /> {running} Running
									</div>
									<div>
										<Icon type="heart" style={{ color: '#f00' }} /> {stopped} Stopped
									</div>
								</Col>
							</Row>
						</Card>
					</Col>
					<Col span={12} className="main-services-card">
						<Card>
							<Col span={6}>
								<MenuIcon className="main-services-title-icon" />
							</Col>
							<Col span={10}>
								<span className="main-services-num">{image}</span>
								<p className="main-services-title">Images</p>
							</Col>
							<Col span={8} className="main-services-extra-box">
								<div>
									<Icon type="pie-chart" /> {imgsize} MB
								</div>
							</Col>
						</Card>
					</Col>
					<Col span={12} className="main-services-card">
						<Card>
							<Col span={6}>
								<SunnaryIcon className="main-services-title-icon" />
							</Col>
							<Col span={10}>
								<span className="main-services-num">{volumes}</span>
								<p className="main-services-title">Volumes</p>
							</Col>
							<Col span={8} className="main-services-extra-box">
								<div>
									<Icon type="credit-card" /> adfs driver
								</div>
							</Col>
						</Card>
					</Col>
					<Col span={12} className="main-services-card">
						<Card>
							<Col span={6}>
								<RelationIcon className="main-services-title-icon" />
							</Col>
							<Col span={10}>
								<span className="main-services-num">{networks}</span>
								<p className="main-services-title">Networks</p>
							</Col>
							<Col span={8} />
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}

export default ServiceIndex;
