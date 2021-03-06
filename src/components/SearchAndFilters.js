/* eslint-disable */
import React, { Component } from 'react'
import { Input, Button, Select ,DatePicker } from 'antd'
import isEmpty from 'lodash/isEmpty'
import has from 'lodash/has'
import find from 'lodash/find'
import omit from 'lodash/omit'
import PropTypes from 'prop-types'
import moment from 'moment'
 
const styles = {
  divider: { margin: '4px 0' },
  clearWrapper: { display: 'flex', flexWrap: 'nowrap', padding: 8 },
  clearLink: {
    flex: 'none',
    padding: '8px',
    display: 'block',
    cursor: 'pointer',
  },
  select: {
    width: '100%',
  },
}

/**
 * @param {function} onSubmit
 * @param {function} onCancel
 * @param {array} attributes
 * @param {array} attributes[].filters if present will render select list
 * @param {boolean} attributes[].search if true, will render input and pass as search array
 * @param {string} filterLabel optional
 * @param {string} title
 * @param {boolean} loading
 */
class SearchAndFilters extends Component {
  state = {
    search: {},
    filters: {},
  }

  handleSubmitForm = (e) => {
    e.preventDefault()
    console.log(e.currentTarget.dataset)
    console.log('values', this.state)
    const { onSubmit } = this.props
    if (onSubmit) onSubmit(this.state)
  }

  handleCancel = () => {
    const { onCancel } = this.props
    this.setState({
      search: {},
      filters: {},
    })
    if (onCancel) onCancel()
  }

  handleChangeSearch = (e) => {
    const { name } = e.target
    const { value } = e.target
    // value = trim(value)

    this.setState(
      (prev) => {
        const { search } = prev
        let newVal = {
          [name]: value,
        }
        if (isEmpty(value)) newVal = {}
        if (has(search, name) && isEmpty(value)) delete search[name]
        return {
          ...prev,
          search: {
            ...search,
            ...newVal,
          },
        }
      },
      () => console.log(this.state.search),
    )
  }

  handleFilterChange = (value, key,fn) => {
    console.log('filters changed', key, value,fn)
    const filterQuery={
      [key]:value
    }
    if(fn) fn(filterQuery)
    if (!value) this.clearFilter(key)
    else
      this.setState((prev) => {
        return {
          ...prev,
          filters: {
            ...prev.filters,
            [key]: value,
          },
        }
      })
  }

  

  clearFilter = (key) => {
    const { filters } = this.state
    const newFilters = omit(filters, key)
    this.setState((prev) => ({
      ...prev,
      filters: newFilters,
    }))
  }

  render() {
    const { attributes, loading } = this.props
    const { search } = this.state

    const hasSearchProps = find(attributes, (a) => a.search === true || a.onSelectSearch === true)
    const dateFormat="YYYY-MM-DD"
    const renderSearchAndFilters = () => (
      <div className="filter-list">
        {attributes.map((i) => {
          if (i.search && !i?.dateFilter)
            return (
              /* <Form.Item key={i.key} label={i.title}>
                <Input onChange={this.handleChangeSearch} name={i.dataIndex} />
              </Form.Item> */
              <div className="filter-item" key={i.title || i.filterLabel}>
                <div className="label">{i.filterLabel || i.title}</div>
                <Input
                  allowClear
                  onChange={this.handleChangeSearch}
                  name={i.dataIndex}
                  value={search[i.dataIndex]}
                />
              </div>
            )
            if (i?.dateFilter)
            return (
              /* <Form.Item key={i.key} label={i.title}>
                <Input onChange={this.handleChangeSearch} name={i.dataIndex} />
              </Form.Item> */
              <div className="filter-item" key={i.title || i.filterLabel}>
                <div className="label">{i.filterLabel || i.title}</div>
                {/* <Input
                  allowClear
                  onChange={this.handleChangeSearch}
                  name={i.dataIndex}
                  value={search[i.dataIndex]}
                /> */}

                <DatePicker
                format={dateFormat}
                allowClear
                placeholder={i.title}
                value={this.state.filters[i?.dataIndex]?moment(this.state.filters[i?.dataIndex]) : ''}
                name={i.dataIndex}
                onChange={(val)=>this.handleFilterChange(moment(val).format(dateFormat),i.dataIndex)}
                />
              </div>
            )
          if (i.filters && !i.onSelectSearch) {
            if (!i.filters.length) return null
            return (
              <div className="filter-item" key={i.title}>
                <div className="label">{i.filterLabel || i.title}</div>
                <Select
                  allowClear
                  defaultValue="all"
                  style={styles.select}
                  // mode={i.filterMultiple ? 'multiple' : ''}
                  value={this.state.filters[i.dataIndex] || (i.filterMultiple ? [] : '')}
                  data-name={i.dataIndex}
                  onChange={(val) => this.handleFilterChange(val, i.dataIndex)}
                  // dropdownRender={menu => (
                  //   <div>
                  //     {menu}
                  //     <Divider style={styles.divider} />
                  //     <div style={styles.clearWrapper}>
                  //       <a
                  //         role="button"
                  //         tabIndex={-1}
                  //         style={styles.clearLink}
                  //         onClick={() => this.clearFilter(i.dataIndex)}
                  //         onKeyDown={() => this.clearFilter(i.dataIndex)}
                  //       >
                  //         <span>Clear</span>
                  //       </a>
                  //     </div>
                  //   </div>
                  // )}
                >
                  {i.filters.map((m) => (
                    <Select.Option key={m.value} value={m.value}>
                      {m.label}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            )
          }
          if (i.onSelectSearch) {
            return (
              <div className="filter-item" key={i.title}>
                <div className="label">{i.filterLabel || i.title}</div>
                <Select
                  // mode={i.filterMultiple ? 'multiple' : ''}
                  value={this.state.filters[i.dataIndex] || ''}
                  placeholder={`Select ${i.title}(s)`}
                  // notFoundContent={isFetchingProds ? <Spin size="small" /> : null}
                  filterOption={false}
                  // onSearch={i.onSelectSearch}
                  onChange={(val) => this.handleFilterChange(val, i.dataIndex,i.OnReturnId)}
                  style={i.style || styles.select}
                  defaultValue="all"
                  // onPopupScroll={this.handlePopupScroll}
                >
                  <Select.Option value="">All</Select.Option>
                  {i.filters &&
                    i.filters.map((d) => (
                      <Select.Option key={d.value} value={d.value}>
                        {d.label}
                      </Select.Option>
                    ))}
                </Select>
              </div>
            )
          }
          return null
        })}
      </div>
    )

    if (!hasSearchProps) return null

    return (
      <div className="filter-container">
        {/* <Form layout="inline" onSubmit={this.handleSubmitForm}>
          {renderSearch()}{' '}
          <Form.Item style={buttonStyle}>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </Form.Item>
        </Form> */}
        <h5>
          <strong>Filters</strong>
        </h5>
        {renderSearchAndFilters()}
        <div className="filter-footer">
          <Button loading={loading} onClick={this.handleSubmitForm} type="primary">
            Submit
          </Button>
          <Button onClick={this.handleCancel} type="dashed">
            Cancel
          </Button>
        </div>
      </div>
    )
  }
}

SearchAndFilters.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  attributes: PropTypes.array.isRequired,
  loading: PropTypes.bool,
}

SearchAndFilters.defaultProps = {
  loading: false,
}

export default SearchAndFilters
