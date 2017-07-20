import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
// import StateBase from '@/components/state/StateBase'
// import ScanStatement from '@/components/state/ScanStatement'
// import StateLease3Day from '@/components/state/StateLease3Day'
// import OrderStatement from '@/components/state/OrderStatement'
// import OrderManage from '@/components/order/OrderManage'
// import WithdrawManage from '@/components/withdraw/WithdrawManage'
// import Terminal from '@/components/terminal/Terminal'
// import TerminalAd from '@/components/terminal/TerminalAd'
// import MechantsManage from '@/components/merchants/MerchantsManage'
const Hello = resolve => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['@/components/Hello'], () => {
    resolve(require('@/components/Hello'))
  })
}
const StateBase = r => { require.ensure(['@/components/state/StateBase'], () => { r( require('@/components/state/StateBase'))})}
const ScanStatement = r => { require.ensure(['@/components/state/ScanStatement'], () => { r( require('@/components/state/ScanStatement'))})}
const StateLease3Day = r => { require.ensure(['@/components/state/StateLease3Day'], () => { r( require('@/components/state/StateLease3Day'))})}
const OrderStatement = r => { require.ensure(['@/components/state/OrderStatement'], () => { r( require('@/components/state/OrderStatement'))})}
const OrderManage = r => { require.ensure(['@/components/order/OrderManage'], () => { r( require('@/components/order/OrderManage'))})}
const WithdrawManage = r => { require.ensure(['@/components/withdraw/WithdrawManage'], () => { r( require('@/components/withdraw/WithdrawManage'))})}
const Terminal = r => { require.ensure(['@/components/terminal/Terminal'], () => { r( require('@/components/terminal/Terminal'))})}
const TerminalAd = r => { require.ensure(['@/components/terminal/TerminalAd'], () => { r( require('@/components/terminal/TerminalAd'))})}
const MechantsManage = r => { require.ensure(['@/components/merchants/MerchantsManage'], () => { r( require('@/components/merchants/MerchantsManage'))})}


Vue.use(Router);

let R = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/state-today',
      name: 'stateToday',
      component: StateBase,
      meta: {
        title: '今日新增',
        kind: 'today'
      }
    },
    {
      path: '/state-month',
      name: 'stateMonth',
      component: StateBase,
      meta: {
        title: '当月新增',
        kind: 'month'
      }
    },
    {
      path: '/state-accumulate',
      name: 'stateAccumulate',
      component: StateBase,
      meta: {
        title: '累计统计',
        kind: 'accumulate'
      }
    },
    {
      path: '/state-scan',
      name: 'stateScan',
      component: ScanStatement,
    },
    {
      //TODO: 组件有问题
      path: '/state-lease-3day',
      name: 'stateLease3Day',
      // component: Hello

      component: StateLease3Day
    },
    {
      path: '/state-order',
      name: 'stateOrder',
      component: OrderStatement
    },
    {
      path: '/terminal',
      name: 'terminal',
      component: Terminal
    },
    {
      path: '/terminal-ad',
      name: 'terminalAd',
      component: TerminalAd
    },
    {
      path: '/merchants',
      name: 'merchants',
      component: MechantsManage
    },
    {
      path: '/merchants-terminal',
      name: 'merchantsTerminal',
      component: Hello
    },
    {
      path: '/order-manage',
      name: 'orderManage',
      component: OrderManage
    },
    {
      path: '/withdraw-manage',
      name: 'withdrawManage',
      component: WithdrawManage
    },

  ]
});

export default R
