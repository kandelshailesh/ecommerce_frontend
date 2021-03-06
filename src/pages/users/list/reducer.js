/* eslint-disable no-underscore-dangle */
import findIndex from 'lodash/findIndex'
import qs from 'qs'

const initialState = {
  current: 1,
  pageSize: 20,
  total: 0,
  filters: {},
  sorters: {},
  statusClickedId: null,
  products: [],
  sortQuery: '',
  searchQuery: '',
  categories: [],
  selectedRowKeys: [],
  menuItems: [
    {
      key: 'active',
      title: 'Active',
    },
    {
      key: 'hold',
      title: 'Hold',
    },
  ],
}

function reducer(state, action) {
  switch (action.type) {
    case 'setCurrentPage':
      return { ...state, current: action.payload }
    case 'clearCurrentPage':
      return { ...state, current: initialState.current }
    case 'setPageSize':
      return { ...state, pageSize: action.payload }
    case 'setTotal':
      return { ...state, total: action.payload }
    case 'setStatusClickedId':
      return { ...state, statusClickedId: action.payload }
    case 'clearStatusClickedId':
      return { ...state, statusClickedId: null }
    case 'setSorters':
      if (action.payload.sortField && action.payload.sortOrder)
        return {
          ...state,
          sorters: {
            sortField: action.payload.sortField,
            sortOrder: action.payload.sortOrder,
          },
          sortQuery: qs.stringify({
            sort: { [action.payload.sortField]: action.payload.sortOrder },
          }),
        }
      return { ...state }
    case 'clearSorters':
      return { ...state, sortQuery: '', sorters: {} }
    case 'setProducts':
      return { ...state, products: action.payload }
    case 'updateClickedProdStatus': {
      // const { id, status } = action.payload
      if (state.statusClickedId) {
        const index = findIndex(state.products, (i) => i.id === state.statusClickedId)
        if (index > -1) state.products[index].status = action.payload
        return { ...state, statusClickedId: null }
      }
      // break
      return { ...state }
    }
    case 'deleteProduct': {
      const id = action.payload
      const products = state.products.filter((i) => i.id !== id)
      return { ...state, products }
    }
    case 'setSearchers':
      return {
        ...state,
        search: action.payload,
        searchQuery: qs.stringify({ search: action.payload }),
      }
    case 'setFilters': {
      console.log('setFilters reducer', action.payload)
      return {
        ...state,
        filterQuery: qs.stringify(action.payload),
      }
    }
    case 'clearProducts':
      return { ...state, products: [] }
    case 'setCategories':
      return { ...state, categories: action.payload }
    case 'changeMenuItems':
      return { ...state, menuItems: action.payload }
    case 'resetMenuItems':
      return { ...state, menuItems: initialState.menuItems }

    case 'clearPagination':
      return {
        ...state,
        current: initialState.current,
        pageSize: initialState.pageSize,
        total: initialState.total,
      }
    default: {
      let newState = {}
      if (action.payload) newState = { ...action.payload }
      return { ...state, ...newState }
    }
  }
}

export { reducer, initialState }
