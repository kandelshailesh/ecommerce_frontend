/* eslint-disable */
import React, { useEffect, useReducer } from 'react'
import { Button,Table, Icon, notification,Select, Dropdown, Popconfirm } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import Menu from 'components/Menu'
import AddNew from 'components/AddNew'
import useFetching from 'hooks/useFetching'
import isEmpty from 'lodash/isEmpty'
import callApi from 'utils/callApi'
import { STRINGS} from '_constants'
import { connect } from 'react-redux'
import { Delete  } from 'services'
import { reducer, initialState } from './reducer'
import { createColumns ,categoryColumns,userColumns,doctorColumns,productColumns ,orderColumns,SubscribtionColumns} from '../../columns'
import FilterProvider from 'components/RenderProps/FiltersProvider'

const scrollStyle = { x: '100%' }

const limits = [1, 10, 20, 50, 100]


const orderStatus = [
  {
    key: 'PENDING',
    title: 'Pending',
  },
  {
    key: 'ACTIVE',
    title: 'Active',
  },
  {
    key: 'CANCELLED',
    title: 'Cancelled',
  },
  {
    key: 'SHIPPING',
    title: 'Shipping',
  },
  {
    key: 'COMPLETED',
    title: 'Completed',
  },
]

const subscribtionStatus= [
  {
    key: 'active',
    title: 'Active',
  },
  {
    key: 'cancelled',
    title: 'Cancelled',
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
useEffect(()=>{
   if(path=='/orders'){
    console.log("pathinsde",)  
    dispatch({
      type: 'changeMenuItems',
      payload: orderStatus,
    })
   }
   else if(path=='/subscriber'){
    dispatch({
      type: 'changeMenuItems',
      payload: subscribtionStatus,
    })   
   }
   else{
    console.log("else",)
    dispatch({
     type: 'resetMenuItems',
   })
   }
},[path])
  const handleMenuClick = async (e) => {
    // refetch
    // console.log('clicked on', e.key, clickedId)
    // const format = path === 'orders'
    try{
      const Jsonoptions={
        method:'PATCH',body:JSON.stringify({status:e.key}),
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const formData=new FormData()
      formData.append('status',e.key)
      const FormOptions={
        method:'POST',
        body:formData
      }
      const isUpdated = await callApi(
         path==='/orders'? `/api/backend/v1${path}`:`/api/backend/v1${path}/${state.statusClickedId}`,
         path==='/orders'?FormOptions:Jsonoptions
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
        description: err.message,
      })
    }

  }
  const menu = <Menu items={state.menuItems} onClick={handleMenuClick} />

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
      const isDeleted = await Delete(path,id)
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
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width:100,
      render: (text, record) => {
        let badge = 'badge-success'
        if (record.status === 'hold'||record.status === 'CANCELLED' || record.status === 'cancelled') badge = 'badge-danger'
        if (record.status === 'PENDING') badge = 'badge-primary'
        if (record.status === 'SHIPPING') badge = 'badge-warning'
        // if (record.status === 'COMPLETED') badge = 'badge-danger'
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
      filters:state.menuItems?.map((item)=>({ label:item.title,value:item.key,text:item.title})),
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
      if(path=='/category'){
        console.log("categoryolumns",categoryColumns)
       columns=[...categoryColumns,...columns]    
    }
    else if(path=='/users'){ 
      columns=[...userColumns,...columns]
      console.log("usercolumns",userColumns)
          
    }
    else if(path=='/unit'){ 
      columns=[...categoryColumns.map(({search,...item})=>item),...columns.filter(item=>item.key!=='status')]
      console.log("usercolumns",userColumns)     
    }
    else if(path=='/doctors'){ 
      columns=[...doctorColumns,...columns]
      console.log("usercolumns",userColumns)     
    }
    else if(path=='/products'){ 
      columns=[...productColumns,...columns.filter(item=>item.key!=='status')]
      console.log("usercolumns",userColumns)     
    }
    else if(path=='/orders'){ 
      // columns=[...productColumns,...columns.filter(item=>item.key!=='status')]
      columns=[...orderColumns,...columns]

      console.log("usercolumns",userColumns)  
      // menuItems=orderStatus   
    }
    else if(path=='/subscriber'){ 
      // columns=[...productColumns,...columns.filter(item=>item.key!=='status')]
      columns=[...SubscribtionColumns,...columns]

      console.log("usercolumns",userColumns)  
      // menuItems=orderStatus   
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
