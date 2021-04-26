// import { PATH_CUSTOM_ATTRIBUTES, LINKS } from '_constants'

export async function getLeftMenuData() {
  return [
    // Dashboard
    // {
    //   title: 'Dashboard',
    //   key: 'dashboardAlpha',
    //   url: '/dashboard',
    //   icon: 'icmn icmn-home',
    // },
    {
      divider: true,
    },
    {
      title: 'Users',
      key: 'users',
      pro: false,
      icon: 'icmn icmn-users',
      url: '/users',
    },
    {
      divider: true,
    },
    {
      title: 'Category',
      key: 'category',
      pro: false,
      icon: 'icmn icmn-tree',
      url: '/category',
    },
    {
      divider: true,
    },
    {
      title: 'Unit',
      key: 'unit',
      pro: false,
      icon: 'icmn icmn-barcode',
      url: '/unit',
    },
    {
      divider: true,
    },
    {
      title: 'Products',
      key: 'products',
      pro: false,
      icon: 'icmn icmn-user',
      url: '/products',
    },
    {
      divider: true,
    },

    {
      title: 'Doctors',
      key: 'doctors',
      pro: false,
      icon: 'icmn icmn-user-tie',
      url: '/doctors',
    },
    {
      divider: true,
    },
    {
      title: 'Orders',
      key: 'orders',
      pro: false,
      icon: 'icmn icmn-home',
      url: '/orders',
    },
    {
      divider: true,
    },
    {
      title: 'Subscribed Items',
      key: 'subscriber',
      pro: false,
      icon: 'icmn icmn-bell',
      url: '/subscriber',
    },
    {
      divider: true,
    },
  ]
}
export async function getTopMenuData() {
  return [
    {
      title: 'Settings',
      key: 'settings',
      icon: 'icmn icmn-cog utils__spin-delayed--pseudo-selector',
    },
    {
      title: 'Docs',
      key: 'documentation',
      url: 'https://docs.cleanuitemplate.com/react/getting-started',
      target: '_blank',
      icon: 'icmn icmn-books',
    },
  ]
}

export async function getLeftMenuDataUser() {
  return [
    {
      title: 'Settings',
      key: 'settings',
      icon: 'icmn icmn-cog utils__spin-delayed--pseudo-selector',
    },
    {
      title: 'Docs',
      key: 'documentation',
      url: 'https://docs.cleanuitemplate.com/react/getting-started',
      target: '_blank',
      icon: 'icmn icmn-books',
    },
  ]
}
