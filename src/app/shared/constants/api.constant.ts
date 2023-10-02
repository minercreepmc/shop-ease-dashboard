const ApiBaseUrl = 'http://localhost:3002/api';

export const ApiApplication = {
  AUTH: {
    CONTROLLER: ApiBaseUrl + '/auth',
    LOGIN: '/log-in',
    LOGOUT: '/log-out',
    GET_PROFILE: '/profile',
  },
  PRODUCT: {
    CONTROLLER: ApiBaseUrl + '/product',
    CREATE: '/',
    UPDATE: '/:id',
    DELETE: '/:id',
    DELETE_MANY: '/delete-many',
    GET_ALL: '/',
    GET_ONE: '/:id',
  },
  USER: {
    CONTROLLER: ApiBaseUrl + '/user',
    CREATE_MEMBER: 'member',
    CREATE_ADMIN: 'admin',
    CREATE_STAFF: 'staff',
    CREATE_SHIPPER: 'shipper',
    GET_ALL_USER: '',
    GET_ALL_SHIPPER: 'shipper',
    GET_ONE: ':id',
    UPDATE: ':id',
  },
  CATEGORY: {
    CONTROLLER: ApiBaseUrl + '/category',
    CREATE: '/',
    UPDATE: '/:id',
    DELETE: '/:id',
    GET_ALL: '/',
    GET_ONE: '/:id',
  },
  DISCOUNT: {
    CONTROLLER: ApiBaseUrl + '/discount',
    CREATE: '',
    UPDATE: ':id',
    DELETE: ':id',
    DELETE_MANY: 'delete-many',
    GET_ALL: '',
    GET_ONE: ':id',
  },
  CART: {
    CONTROLLER: ApiBaseUrl + '/cart',
    CREATE: '',
    GET: '',
    GET_ITEMS: 'items',
  },
  CART_ITEM: {
    CONTROLLER: ApiBaseUrl + '/cart-item',
    CREATE: '',
    UPDATE: ':id',
    DELETE: ':id',
  },
  UPLOAD: {
    CONTROLLER: ApiBaseUrl + '/upload',
    UPLOAD: '',
    DESTROY: 'destroy',
  },
  PRODUCT_IMAGE: {
    CONTROLLER: ApiBaseUrl + '/product-image',
    ADD: '',
    GET_PRODUCT_IMAGES: ':productId',
  },
};
