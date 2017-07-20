// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './util/dateUtil'
import { Button,
  Input,
  Select,
  Notification,
  Row,
  Col,
  Collapse,
  CollapseItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Form,
  FormItem,
  Table,
  TableColumn,
  Dialog,
  Loading,
  DatePicker,
  Option,
  Cascader,
  Pagination} from 'element-ui'
Vue.component(Button.name, Button)
Vue.component(Notification.name, Notification)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(CollapseItem.name, CollapseItem)
Vue.component(Collapse.name, Collapse)
Vue.component(Menu.name, Menu)
Vue.component(Submenu.name, Submenu)
Vue.component(MenuItem.name, MenuItem)
Vue.component(MenuItemGroup.name, MenuItemGroup)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Input.name, Input)
Vue.component(Select.name, Select)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Dialog.name, Dialog)
Vue.component(DatePicker.name, DatePicker)
Vue.component(Option.name, Option)
Vue.component(Cascader.name, Cascader)
Vue.component(Pagination.name, Pagination)


Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
// Vue.prototype.$msgbox = MessageBox;
// Vue.prototype.$alert = MessageBox.alert;
// Vue.prototype.$confirm = MessageBox.confirm;
// Vue.prototype.$prompt = MessageBox.prompt;
// Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification

Vue.config.productionTip = true;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
