import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, List, Tooltip, Button,Icon } from 'antd';
import AreaChart from '@/components/AreaChart';
import './cardStyle.less';

const ListItem = List.Item;

const CardHeader = function({ title, desc, isPercent, color }) {
	const style = { color };
	return (
		<div className="dashboard-card-title-box">
			<h3 className={`num-box ${isPercent ? 'precent-mode' : ''}`} style={style}>
				{title}
			</h3>
			{/* <p style={style}>{desc}</p> */}
		</div>
	);
};

class MyCard extends React.PureComponent {
	constructor(props) {
		super(props);
		this.style = {
			width: 300,
		};
	}

	UNSAFE_componentWillMount() {
		this.style = {
			...this.style,
			color: this.props.theme,
		};
	}

	render() {
		const { title, extra, item, color, data, type, list = [],table,numKey } = this.props;
		const {  isPercent, desc } = item || {};
		const maxListNums = 2;
		const renderList = list.slice(0, maxListNums);
		return (
			<Col span={8} className="dashboard-card-wrapper">
				<Card title={title} extra={extra} style={this.style} className="dashboard-card">
					{type !== 'text' ? (
						<Fragment>
							<CardHeader title={table[numKey]} isPercent={isPercent} desc={desc} color={color} />
							<AreaChart color={color} data={data} />
						</Fragment>
					) : (
						<Fragment>
							<List
								className="dashboard-list"
								itemLayout="horizontal"
								dataSource={renderList}
								renderItem={(item) => (
									// <ListItem/>
									<ListItem actions={[table[item.statusKey]==="off"?<Icon type="info-circle" style={{color:"#f60"}}/>:<Icon type="check-circle" style={{color:"#87d068"}}/>]}>
										<Tooltip title={item.title}>
											<p className="list-item-title" title={item.title}>
												{item.title}
											</p>
										</Tooltip>
									</ListItem>
								)}
							/>
							<div className="btn-box">
								{list.length > maxListNums && <Link to="/app/dashboard/server" >查看更多</Link>}
							</div>
						</Fragment>
					)}
				</Card>
			</Col>
		);
	}
}

export default MyCard;
