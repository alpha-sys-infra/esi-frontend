import React, { Component } from 'react'
import { Table } from 'antd'
import { TodoProcModle } from './model'
import SearchForm from './components/SearchForm'

export default class TodoProc extends Component {
    state = {
        condition: {            /* 查询条件 */
            procTitle: null,    // 流程标题
            procName: null,     // 流程名称
            procUser: null      // 流程发起人
        },
        tableLoading: false,
        tableData: [],
        total: 0,
        rows: 20,
        page: 1,
    }
    columns = [
        {
            title: '流程编号',
            width: 200,
            align: 'center',
            dataIndex: 'procCode'
        },
        {
            title: '流程标题',
            ellipsis: true,
            dataIndex: 'procTitle'
        },
        {
            title: '操作',
            dataIndex: 'procStatus',
            align: 'center',
            render: (val, record) => {
                switch (val) {
                    case 1:
                        return <a onClick={e => this.handleRowDetailClick(e, record)} className="primary-font">【查看】</a>
                    case 2:
                        return <a onClick={e => this.handleRowDetailClick(e, record)} className="success-font">【处理】</a>
                    case 3:
                        return <a onClick={e => this.handleRowDetailClick(e, record)} className="warning-font">【撤销】</a>
                }
            }
        },
        {
            title: '到达时间',
            align: 'center',
            dataIndex: 'procStartTime',
            defaultSortOrder: 'descend',
            sortDirections: ['ascend', 'descend'],
            sorter: (a, b) => a.procStartTime - b.procStartTime,
        },
        {
            title: '流程名称',
            ellipsis: true,
            dataIndex: 'procName'
        },
        {
            title: '步骤名称',
            ellipsis: true,
            dataIndex: 'stepName'
        },
        {
            title: '发起人',
            dataIndex: 'procUser'
        },
    ]
    componentDidMount() {
        this.fetchTableData()
    }
    fetchTableData() {
        this.setState({
            tableLoading: true
        }, async () => {
            const { condition, rows, page } = this.state
            const params = { ...condition, rows, page }
            const { data, total } = await TodoProcModle(params)
            this.setState({
                tableData: data,
                total,
                tableLoading: false
            })
        })

    }
    render() {
        const { page, rows, total, tableData, tableLoading,condition } = this.state
        return (
            <div className="table-data-container">
                <SearchForm
                    onSearchHandler={this.handleSearch}
                    value={condition}
                />
                <Table
                    className="table-content-container"
                    columns={this.columns}
                    rowKey={record => record.guid}
                    dataSource={tableData}
                    loading={tableLoading}
                    pagination={{
                        showSizeChanger: true,
                        current: page,
                        pageSize: rows,
                        pageSizeOptions: ['20', '50', '100', '200'],
                        showTotal: () => `总共 ${total} 条`,
                        onChange: this.handlePageChange,
                        onShowSizeChange: this.handleRowsChange
                    }}
                />
            </div>
        )
    }
    handlePageChange = (page) => {
        this.setState({ page }, () => {
            this.fetchTableData()
        })
    }
    handleRowsChange = (_, rows) => {
        this.setState({ rows, page: 1 }, () => {
            this.fetchTableData()
        })
    }

    handleRowDetailClick(e, record) {
        e.persist()
        e.preventDefault()
    }

    // 查询操作
    handleSearch = condition => {
        if (!condition) return
        this.setState({
            page: 1,
            rows: 20,
            condition
        }, () => {
            this.fetchTableData()
        })
    }
}