/* eslint-disable */
import React, { useEffect, useReducer } from 'react'
export const categoryColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    search: true,
    render: (text, record) => (text !== null ? <span>{text}</span> : <span>-</span>),
  },
]

export const userColumns = [
  {
    title: 'Full Name',
    dataIndex: 'fullName',
    key: 'fullName',
    width: 100,
    search: true,
    render: (text, record) => (text !== null ? <span>{text}</span> : <span>-</span>),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: 100,
    render: (text, record) => (
      <span
        style={{
          textTransform: 'lowercase',
        }}
      >
        {text}
      </span>
    ),
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
     width: 100,
      render: (text, record) => (text !== null ? <span>{text}</span> : <span>-</span>),

  },
]

export const doctorColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      search: true,
      render: (text, record) => (text !== null ? <span>{text}</span> : <span>-</span>),
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
         width: 100,
          render: (text, record) => (text !== null ? <span>{text}</span> : <span>-</span>),
    
      },
      {
        title: 'Hospital',
        dataIndex: 'hospital',
        key: 'hospital',
         width: 100,
          render: (text, record) => (text !== null ? <span>{text}</span> : <span>-</span>),
    
      },

  ]
  
  export const productColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      // search: true,
      render: (text, record) => (text !== null ? <span>{text}</span> : <span>-</span>),
    },
    {
        title: 'Total Quantity',
        dataIndex: 'total_quantity',
        key: 'total_quantity',
        width: 100,
        // search: true,
        render: (text, record) => (text !== null ? <span>{text}</span> : <span>-</span>),
      },
      {
        title: 'Unit Price',
        dataIndex: 'unit_price',
        key: 'unit_price',
        width: 100,
        // search: true,
        render: (text, record) => (text !== null ? <span><i className="fa fa-rupee"> {text}</i></span> : <span>-</span>),
      },
      {
        title: 'Discount Amount',
        dataIndex: 'discount_amount',
        key: 'discount_amount',
        width: 100,
        // search: true,
      render: (text, record) => (text !== null ? <span>{text} {record?.discount_type}</span> : <span>-</span>),
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        width: 100,
        // search: true,
        render: (text, record) => (record.category !== null || record?.category ? <span>{record?.category?.name}</span> : <span>-</span>),
       

      }

  ]

export const createColumns = (param) => {
  const columnarray = param.map((item) => ({
    title: item.title,
    dataIndex: item.dataIndex,
    key: item.dataIndex,
    width: 100,
    search: item?.search ? true : false,
    render: (text, record) => (text !== null ? <span>{text}</span> : <span>-</span>),
  }))
  return columnarray
}
