const home = () => import('@/views/home/index') //首页

const views = {
  Home: home,
  SystemManage: home,
    Menu: () => import(`@/views/menu/index`), //菜单
    User: () => import(`@/views/user/index`), //用户
    Role: () => import(`@/views/role/index`), //角色
  Personal: home,
  Assembly: home,
    Draggable: () => import(`@/views/draggable/index`), //拖拽
}

export default views;