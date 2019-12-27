/* eslint-disable max-classes-per-file */
import React, { PureComponent, Children } from 'react';
import { Table, Form } from 'antd';
import { executeCB } from '../../utils/util';
import './index.less';

class SearchTableBar extends PureComponent {
  componentDidMount() {
    executeCB(this.props.getForm, this.props.form);
  }

  componentWillUnmount() {
    executeCB(this.props.getForm, null);
  }

  getChildren = () => {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
    return Children.toArray(this.props.children).map((child, index) => {
      const { type } = child;
      // 如果是需要自动包裹formItem及getFieldDecorator的元素需要给子元素添加
      // needwrap属性，为true时候自动添加以上内容，为false时直接返回子元素
      // 其中子元素的layout作为formItem的layout，ikey作为组件的key，rules作为getFieldDecorator的rules参数
      // name作为getFieldDecorator的name参数，其值映射到form的提交函数中对应的name值
      if (type && child.props.needwrap) {
        const Child = child.type;
        const { label, name, rules, ikey, layout, needwrap, ...extraProps } =
          child.props || {};
        const wrapperProps = { key: ikey + (ikey ? 'formitem' : '') + index };
        const itemLayout = layout || formItemLayout;
        return (
          <Form.Item label={label} {...wrapperProps} {...itemLayout}>
            {getFieldDecorator(name, {
              rules,
            })(<Child {...extraProps} />)}
          </Form.Item>
        );
      }
      return child;
    });
  };

  handleSubmit = e => {
    if (this.props.loading) {
      return;
    }
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        executeCB(this.props.onSearch, values);
      }
    });
  };

  render() {
    const { layoutSize } = this.props;
    const formItemLayout = layoutSize || {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    const renderChild = this.getChildren();
    const enableRender = renderChild.length > 0;
    return (
      (enableRender && (
        <Form layout="inline" onSubmit={this.handleSubmit} {...formItemLayout}>
          {renderChild}
        </Form>
      )) ||
      null
    );
  }
}

const SearchTableHeaderBar = Form.create({ name: 'dynamic_form_item' })(
  SearchTableBar,
);

/**
 * 搜索表格组件
 *
 * @export
 * @class SearchTable
 * @extends {PureComponent}
 */
class SearchTable extends PureComponent {
  formItemLayoutWithOutLabel = {
    labelCol: { span: 10 },
    wrapperCol: { span: 24 },
  };

  render() {
    const {
      onSearch,
      children,
      loading,
      getForm,
      scroll,
      pagination,
      ...tableProps
    } = this.props;

    return (
      <div className="search-list">
        <div className="table-header">
          <SearchTableHeaderBar
            loading={loading}
            layoutSize={this.formItemLayoutWithOutLabel}
            onSearch={onSearch}
            getForm={getForm}
          >
            {children}
          </SearchTableHeaderBar>
        </div>
        <Table
          loading={loading}
          scroll={scroll}
          pagination={pagination}
          {...tableProps}
        />
      </div>
    );
  }
}

/**
 * [自定义表单项目]
 * @author   enyue.guo
 * @param    {Object}         props.label     配置formItem的title
 * @param    {string}         props.name      配置当前控件的name
 * @param    {Object}         props.rules     配置getFieldDecorator的组件验证规则
 * @param    {string}         props.ikey      react组件需要的key
 * @param    {Object}         props.layout    配置formItem的layout
 * @param    {boolean}        props.needwrap  是否需要被formItem包裹
 *
 */

/**
 * [带搜索扩展的表格]
 * @author   enyue.guo
 * @param    {function}         props.onSearch   搜索回调函数，参数是表单对象
 * @param    {any}              props.children   自定义表单项目，见上方注释
 * @param    {boolean}          props.loading    表格加载状态
 * @param    {function}         props.getForm    获取表单对象即props.form
 * @param    {Object}           props.scroll     表格滚动配置对象
 * @param    {Object}           props.pagination 表格分页配置对象
 * @param    {Object}           props.tableProps 表格配置对象
 *
 */

export default SearchTable;
