import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import StateBase from '@/components/state/StateBase'
import StateLease3Day from '@/components/state/StateLease3Day'
import OrderManage from '@/components/order/OrderManage'
import WithdrawManage from '@/components/withdraw/WithdrawManage'

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
      path: '/state-lease-3day',
      name: 'stateLease3Day',
      component: StateLease3Day
    },
    {
      path: '/state-order',
      name: 'stateOrder',
      component: Hello
    },
    {
      path: '/terminal',
      name: 'terminal',
      component: Hello
    },
    {
      path: '/terminal-ad',
      name: 'terminalAd',
      component: Hello
    },
    {
      path: '/merchants',
      name: 'merchants',
      component: Hello
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
