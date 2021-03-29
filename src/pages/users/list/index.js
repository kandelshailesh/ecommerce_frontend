/* eslint-disable */
import React, { useEffect, useReducer } from 'react'
import { Button,Table, Icon, notification,Select, Dropdown, Popconfirm } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import Menu from 'components/Menu'
// import Table from 'components/Table'
import AddNew from 'components/CustomComponents/AddNew'
import useFetching from 'hooks/useFetching'
// import { CATALOG_API_URL, LINKS } from '_constants'
import isEmpty from 'lodash/isEmpty'
import callApi from 'utils/callApi'
import { STRINGS} from '_constants'
// import Upload from 'components/Upload'
// import { excelUploadSchema } from 'utils/Schema'
// import Form from 'components/Form'
import { connect } from 'react-redux'
import { deleteOp  } from 'services/addedit'
import { reducer, initialState } from './reducer'
import { createColumns ,categoryColumns,userColumns,doctorColumns,productColumns } from '../../columns'
import FilterProvider from 'components/RenderProps/FiltersProvider'

const scrollStyle = { x: '100%' }

const limits = [1, 10, 20, 50, 100]

const menuItems = [
  {
    key: 'active',
    title: 'Active',
  },
  {
    key: 'hold',
    title: 'Hold',
  },
]

const Products = (props) => {
  console.log("props",props)

  const {match:{path}}=props
  console.log("us",path)
  // const [selectedRowKeys, setSelectedRowKeys] = useState([])
  // const [itemsPerPage, setItemsPerPage] = useState(2);
  const [state, dispatch] = useReducer(reducer, initialState)
  // /employee?type=leadgen/bussiness_development
//     `/api/backend/v1/users?${isEmpty(state.searchQuery) ? '' : `&${state.searchQuery}`}${
  // isEmpty(state.filterQuery) ? '' : `&${state.filterQuery}`}&page=${state.current}&limit=${state.pageSize}`
  const [{ response, loading, error }] = useFetching(
    `/api/backend/v1${path}`
  )

  const handleMenuClick = async (e) => {
    // refetch
    // console.log('clicked on', e.key, clickedId)

    try{
      const isUpdated = await callApi(
        `/api/backend/v1${path}/${state.statusClickedId}`,

        {method:'PATCH',body:{status:e.key}}
      )
      console.log("is",isUpdated)
      if (isUpdated?.success) {
        console.log("in",e.key)
        dispatch({
          type: 'updateClickedProdStatus',
          payload: e.key,
        })
        notification.success({
          message: 'Success',
          description: STRINGS.editSuccess,
        })
      }
      // dispatch({
      //   type: 'clearStatusClickedId',
      // })
    }
    catch(err){
      notification.error({
        message: 'Error',
        description: error,
      })
    }

  }
  const menu = <Menu items={menuItems} onClick={handleMenuClick} />

  useEffect(() => {
    console.log("inside",response)
    const fetchdata=response?.data || response?.DATA
    if (response && fetchdata) {
      console.log(response)
      dispatch({
        type: 'setProducts',
        payload: fetchdata,
      })
      dispatch({
        type: 'setTotal',
        payload: fetchdata.length,
      })
    }
    console.log(error, response)
    if (error) {
      dispatch({
        type: 'clearProducts',
      })
      dispatch({
        type: 'clearPagination',
      })
      notification.error({
        message: 'Error',
        description: error.message ,
      })
    }
  }, [response,error])

  // const onSelectChange = sRkeys => {
  //   console.log('selectedRowKeys changed: ', sRkeys)
  //   setSelectedRowKeys(sRkeys)
  // }

  const handleDelete = async (id) => {
    // use refetch in usefetching

    try{
      const isDeleted = await deleteOp(path,id)
      if (isDeleted) {
        dispatch({
          type: 'deleteProduct',
          payload: id,
        })
      
      notification.success({
        message: 'Success',
        description: STRINGS.deleteSuccess,
      })
    }
    }
    catch(err){
      notification.error({
        message: 'Error',
        description: error,
      })
    }
  
  }

  const setRowKey = (record) => {
    // console.log(record)
    return record.id
  }

  const handleStatusClick = React.useCallback((id) => {
    dispatch({
      type: 'setStatusClickedId',
      payload: id,
    })
  }, [])

  const handleLimitChange = (selLimit) => {
    // const { onLimitChange } = props
    // if (onLimitChange) onLimitChange(l)
    console.log('SElelLimit')
     dispatch({
          type: 'clearCurrentPage',
          // payload: params.current,
        })
    dispatch({
      type: 'setPageSize',
      payload: Number(selLimit),
    })
  }

  const handleTableChange =  (paginationParams, filters, sorters) => {
    console.log('handleTableChange params', paginationParams, filters, sorters)
    dispatch({
      type: 'setCurrentPage',
      payload: Number(paginationParams.current),
    })
    dispatch({
      type: 'setPageSize',
      payload:Number(paginationParams.pageSize),
    })

    if (!isEmpty(sorters)) {
      console.log('sortParams.field', sorters.field)
      console.log('sortParams.order', sorters.order)
      dispatch({
        type: 'setSorters',
        payload: {
          sortField: sorters.field,
          sortOrder: sorters.order,
        },
      })
      // const sortObj = {
      //   sort: {
      //     [sortParams.field]: sortParams.order === 'descend' ? 'desc' : 'asc',
      //   },
      // }
      // setSortQuery(qs.stringify(sortObj))
    } else {
      dispatch({
        type: 'clearSorters',
      })
    }

    dispatch({
      type: 'setSearchers',
      payload: filters.search,
    })
    dispatch({
      type: 'setFilters',
      payload: filters.filters,
    })
    // setSearchQuery(qs.stringify({ search: filters.search }))
  }

  const pagination = {
    current: state.current,
    pageSize: state.pageSize,
    total: state.total,
  }
// let columns=[]
 

  let columns = [
    // {
    //   title: 'Full Name',
    //   dataIndex: 'fullName',
    //   key: 'fullName',
    //   search:true,
    //   width:100,
    //   // sorter: (a, b) => a.name.localeCompare(b.name),
    //   // sorter: true,
    //   // multiple: 1,
    //   render: (text, record) => (
    //     <Link className="utils__link--underlined" to={`modules/add-edit/${record.id}`}>
    //       {text}
    //     </Link>
    //   ),
    // },
    // {
    //   title: 'Email',
    //   dataIndex: 'email',
    //   key: 'email',
    //   // search: true,
    //   width: 100,
    //   // sorter: (a, b) => a.name.localeCompare(b.name),
    //   // sorter: true,
    //   // multiple: 1,
    //   render: (text, record) => (
    //     <span
    //       style={{
    //         textTransform: 'lowercase',
    //       }}
    //     >
    //       {text}
    //     </span>
    //   ),
    // },
    // {
    //   title: 'Phone',
    //   dataIndex: 'phone',
    //   key: 'phone',
    //   width: 100,
    //   // search: true,
    //   // sorter: (a, b) => a.name.localeCompare(b.name),
    //   // sorter: true,
    //   // multiple: 1,
    //   render: (text, record) => (text !== null ? <span>{text}</span> : <span>-</span>),
    // },
    // {
    //   title: 'Category',
    //   dataIndex: 'category',
    //   key: 'category',
    //   width:100,
    //   render: (text, record) => <span>{text}</span>,
    //   filters: [
    //     {
    //       label: 'Lead',
    //       value: 'leadgen',
    //       text: 'Lead',
    //     },
    //     {
    //       label: 'Business Development',
    //       value: 'bussiness_development',
    //       text: 'Business Development',
    //     },
    //     // {
    //     //   label: 'Admin',
    //     //   value: 'admin',
    //     //   text: 'Admin',
    //     // },
    //   ],
    //   onFilter: (value, record) => record.category.indexOf(value) === 0,
    // },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width:100,
      render: (text, record) => {
        let badge = 'badge-success'
        if (record.status === 'hold') badge = 'badge-danger'
        return (
          <Dropdown
            overlay={menu}
            id={record.id}
            onClick={() => handleStatusClick(record.id)}
            trigger={['click']}
          >
            <span className={`font-size-12 badge ${badge} 'badgeText'`}>
              {text?.toUpperCase()}
              <Icon type="down" />
            </span>
          </Dropdown>
        )
      },
      filters: [
        {
          label: 'Active',
          value: 'active',
          text: 'Active',
        },
        {
          label: 'Hold',
          value: 'hold',
          text: 'Hold',
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: 'Action',
      key: 'action',
      width:100,
      render: (record) => (
        <span>
          <Link to={`${path}/add-edit/${record.id}`}>
            <Button icon="edit" className="mr-1" size="small" />
          </Link>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
              <Button icon="close" size="small" />
            </Popconfirm>
        </span>
      ),
    },
  ]
  let newColArray=[]
  let category=[]
  // useEffect(()=>{
    if(path){
      if(path==='/category'){
        console.log("categoryolumns",categoryColumns)
       columns=[...categoryColumns,...columns]    
    }
    else if(path==='/users'){ 
      columns=[...userColumns,...columns]
      console.log("usercolumns",userColumns)
          
    }
    else if(path==='/unit'){ 
      columns=[...categoryColumns.map(({search,...item})=>item),...columns.filter(item=>item.key!=='status')]
      console.log("usercolumns",userColumns)     
    }
    else if(path==='/doctors'){ 
      columns=[...doctorColumns,...columns]
      console.log("usercolumns",userColumns)     
    }
    else if(path==='/products'){ 
      columns=[...productColumns,...columns.filter(item=>item.key!=='status')]
      console.log("usercolumns",userColumns)     
    }
  }
  // },[columns])

  return (
    <div>
      <Helmet title={`${path.slice(1)} List`} />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>{path.slice(1)} List</strong>
            <AddNew add   attribute={path}
                link={`${path}/add-edit`} />
          </div>
        </div>

        <div className="card-body">
        <FilterProvider data={state.products} columns={columns}>
            {(filteredData) => (
              <>
                {console.log('filterData', filteredData)}
                {limits.length > 0 && (
                  <div className="right-flex">
                    <span>
                      <strong>Items per page:&nbsp;</strong>
                    </span>
                    <Select value={Number(pagination.pageSize)} onChange={handleLimitChange}>
                      {limits.map((i) => (
                        <Select.Option key={i}>{Number(i)}</Select.Option>
                      ))}
                    </Select>
                  </div>
                )}
                <Table
                  className="utils__scrollTable"
                  scroll={scrollStyle}
                  loading={loading}
                  limits={limits}
                  initialLimit={limits[0]}
                  currentPage={pagination.current}
                  limit={pagination.pageSize}
                  total={pagination.total}
                  // pagination={PagePagination}
                  // onLimitChange={handleItemsChange}
                  // scroll={scrollStyle}
                  // pagination={pagination}
                  // rowSelection={rowSelection}
                  // sortDirections={['ascend']}
                  pagination={pagination}
                  columns={columns}
                  dataSource={filteredData}
                  rowKey={setRowKey}
                  onChange={handleTableChange}
                />
              </>
            )}
          </FilterProvider>
        </div>
      </div>
    </div>
  )
}

export default connect(({ user }) => ({ user }))(Products)
