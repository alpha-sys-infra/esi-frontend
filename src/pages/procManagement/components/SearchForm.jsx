import React from 'react';
import { Form, Row, Col, Input, Button } from 'antd';
import { NUM_LETTER_CHINE } from "@/utils/reg-exp";

class SearchForm extends React.Component {
    state = {
        expand: false
    }
    render() {
        const { form: { getFieldDecorator }, value: { procTitle, procName, procUser } } = this.props
        return (
            <Form className="table-search-form" autoComplete="off" labelAlign="left" onSubmit={this.handleSearch}>
                <Row gutter={24}>
                    <Col span={6}>
                        <Form.Item label="流程标题">
                            {getFieldDecorator('procTitle', {
                                initialValue: procTitle,
                                rules: [
                                    NUM_LETTER_CHINE
                                ]
                            })(<Input allowClear maxLength={20} />)}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="流程名称">
                            {getFieldDecorator('procName', {
                                initialValue: procName,
                                rules: [
                                    NUM_LETTER_CHINE
                                ]
                            }
                            )(<Input allowClear />)}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="发起人">
                            {getFieldDecorator('procUser', {
                                initialValue: procUser,
                                rules: [
                                    NUM_LETTER_CHINE
                                ]
                            }
                            )(<Input allowClear />)}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Button type="primary" htmlType="submit" icon="search">查询</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>清空</Button>
                    </Col>
                </Row>
            </Form>
        )
    }
    handleSearch = e => {
        e.preventDefault()
        // 验证成功后才提交
        this.props.form.validateFields((err, values) => {
            if (err) return
            this.props.onSearchHandler(values)
        })
    }
    handleReset = () => {
        this.props.form.resetFields()
        const condition = this.props.form.getFieldsValue()
        this.props.onSearchHandler(condition)
    }
}

export default Form.create()(SearchForm);