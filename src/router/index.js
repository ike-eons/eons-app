import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '../views/auth/Login.vue';
import Layout from '../views/Layout.vue';

import Dashboard from '../views/dashboard/index.vue';
import Category from '../views/categories/index.vue';
import Products from '../views/products/index.vue';
import Invoices from '../views/invoices/index.vue';
import NewInvoice from '../views/invoices/new.vue';
import ShowInvoice from '../views/invoices/show.vue';
import NewStock from '../views/stocks/new.vue';
import Stocks from '../views/stocks/index.vue';
import ShowStock from '../views/stocks/show.vue';
import Distributor from '../views/distributors/index.vue';
import Customer from '../views/customers/index.vue';
import User from '../views/users/index.vue';
import Settings from '../views/settings/index.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Login',
		component: Login,
	},
	{
		path: '/logout',
		name: 'Logout',
		component: Login,
	},

	{
		path: '/layout',
		name: 'Layout',
		component: Layout,
		children: [
			{
				path: '',
				name: 'Dashboard',
				component: Dashboard,
			},
			{
				path: '/invoices/new',
				name: 'NewInvoice',
				component: NewInvoice,
			},
			{
				path: '/invoices',
				name: 'Invoices',
				component: Invoices,
			},
			{
				path: '/invoices/:id',
				name: 'ShowInvoice',
				component: ShowInvoice,
			},

			{
				path: '/categories',
				name: 'Category',
				component: Category,
			},
			{
				path: '/products',
				name: 'Products',
				component: Products,
			},

			{
				path: '/stocks',
				name: 'Stocks',
				component: Stocks,
			},
			{
				path: '/stocks/new',
				name: 'NewStock',
				component: NewStock,
			},
			{
				path: '/stocks/:id',
				name: 'ShowStock',
				component: ShowStock,
			},
			{
				path: '/distributors',
				name: 'Distributor',
				component: Distributor,
			},
			{
				path: '/customers',
				name: 'Customer',
				component: Customer,
			},
			{
				path: '/user',
				name: 'User',
				component: User,
			},
			{
				path: '/setting',
				name: 'Settings',
				component: Settings,
			},
		],
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
