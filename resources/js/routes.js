import AllProducts from './components/AllProducts.vue';
import AddProduct from './components/AddProduct.vue';
import EditProduct from './components/EditProduct.vue';
import Login from './components/Login.vue';
import Test from './components/test.vue';
import Testnew from './components/Testnew.vue';
 
export const routes = [
    {
        name: 'home',
        path: '/',
        component: AllProducts,
		 meta: {requiresAuth: true}
    },
	{
        name: 'login',
        path: '/login',
        component: Login
    },
    {
        name: 'add',
        path: '/add',
        component: AddProduct,
		 meta: {requiresAuth: true}
		
    },
    {
        name: 'edit',
        path: '/edit/:id',
        component: EditProduct,
		 meta: {requiresAuth: true}
    },
    {
        name: 'test',
        path: '/test/',
        component: Test
    },
	 {
        name: 'testnew',
        path: '/testnew/',
        component: Testnew
    }
];