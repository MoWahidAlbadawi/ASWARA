import { APP_CONFIG } from "../../config"

// Local Config Endpoints
export const BASE_URL = APP_CONFIG.API_URL
export const COOKIE_NAME = APP_CONFIG.COOKIE_NAME
export const METAL_PRICE_API = APP_CONFIG.METAL_PRICE_API

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
export const UPDATE_ORDER = 'updateorder'

// notifications endpoints
export const NOTIFICATIONS = 'admin/notifications'
export const UNREAD_NOTIFICATIONS = 'admin/notifications/unread'
export const READ_NOTIFICATION = 'admin/notifications'
export const READ_ALL_NOTIFICATIONS = 'admin/notifications/read-all'

// review requests endpoints
export const REVIEWR_REQUESTS = 'review-requests'
export const APPROVE_REVIEWR_REQUEST = 'approve'
export const REJECT_REVIEWR_REQUESTS = 'reject'