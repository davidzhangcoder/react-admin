import permissions from './permissions'

const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/home', // 对应的path
    icon: 'home', // 图标名称
    isPublic: true, // 公开的
    permissions:[]
  },

  {
    title: '品牌管理',
    key: '/brand',
    icon: 'product',
    permissions:[permissions.GetBrands,permissions.SaveBrand]
  },
  {
    title: '品牌管理-hook',
    key: '/brand-hook',
    icon: 'product',
    permissions:[permissions.test1,permissions.test2]
  },
  {
    title: '商品',
    key: '/products',
    icon: 'appstore',
    children: [ // 子菜单列表
      {
        title: '品类管理',
        key: '/category',
        icon: 'bars',
        permissions:[permissions.GetCategoriesByPage]
        // children: [ // 子菜单列表
        //   {
        //     title: '品类管理',
        //     key: '/category',
        //     icon: 'bars'
        //   },
        //   {
        //     title: '商品管理',
        //     key: '/product',
        //     icon: 'tool'
        //   },
        // ]
      },
      {
        title: '商品管理',
        key: '/product',
        icon: 'tool',
        permissions:[permissions.GetCategoriesByPage]
      },
    ]
  },

  {
    title: '用户管理',
    key: '/user',
    icon: 'user',
    permissions:[]
  },
  {
    title: '角色管理',
    key: '/role',
    icon: 'safety',
    permissions:[]
  },

  {
    title: '图形图表',
    key: '/charts',
    icon: 'area-chart',
    children: [
      {
        title: '柱形图',
        key: '/charts/bar',
        icon: 'bar-chart',
        permissions:[]
      },
      {
        title: '折线图',
        key: '/charts/line',
        icon: 'line-chart',
        permissions:[]
      },
      {
        title: '饼图',
        key: '/charts/pie',
        icon: 'pie-chart',
        permissions:[]
      },
    ]
  },
]

export default menuList