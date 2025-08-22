import { APP_CONFIG } from "../../config"

// Local Config Endpoints
export const BASE_URL = APP_CONFIG.API_URL
export const COOKIE_NAME = APP_CONFIG.COOKIE_NAME

// auth endpoints
export const REGISTER = 'register';
export const LOGIN = 'login';
export const LOGOUT = 'logout';

// users endpoints
export const USER = 'user'
export const CURRENT_USER = 'user/current'
export const USERS = 'users'
export const ADD_USER = 'adduser'
export const DELETE_USER = 'deleteuser'
export const MODIFY_USER = 'updateuser'

// categories endpoints
export const CATEGORY = 'category'
export const CATEGORIES = 'categories'
export const ADD_CATEGORY = 'addcategory'
export const DELETE_CATEGORY = 'deletecategory'
export const MODIFY_Category = 'updatecategory'

// products endpoints
export const PRODUCT = 'product'
export const PRODUCTS = 'products'
export const ADD_PRODUCT = 'addproduct'
export const DELETE_PRODUCT = 'deleteproduct'
export const MODIFY_PRODUCT = 'updateproduct'

// orders endpoint
export const ORDER = 'order'
export const ORDERS = 'orders'