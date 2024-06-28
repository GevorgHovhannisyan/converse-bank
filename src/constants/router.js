export const AppRoutes =  {
    MAIN: 'main',
    BUSINESS: 'business',
    MOBILE_APP: 'mobileapp',
    QR_PAGE: 'qr-page',
    BLOG: 'blog',
    CATEGORY: 'category',
    ITEM: 'item',
    UNDER_CONSTRUCTION: 'under-construction',
    LANGUAGE: 'lang',
    DYNAMIC_PAGE: '*',
    NOT_FOUND: 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteLang = () => '/:lang?/';
export const getRouteBusiness = () => 'business';
export const getRouteMobilApp = () => 'mobileapp';
export const getRouteQrPage = () => 'qr-page';
export const getRouteBlog = () => 'blog';
export const getRouteCategory = () => `:category`;
export const getRouteItem = () => `item/:slugOfBlog`;
export const getRouteUnderConstruction = () => 'under-construction';
export const getRouteDynamicPage = () => '*';
export const getRouteNotFound = () => 'not_found';

export const AppRouteByPathPattern = {
    [getRouteMain()]: AppRoutes.MAIN,
    [getRouteLang()]: AppRoutes.LANGUAGE,
    [getRouteBusiness()]: AppRoutes.BUSINESS,
    [getRouteMobilApp()]: AppRoutes.MOBILE_APP,
    [getRouteQrPage()]: AppRoutes.QR_PAGE,
    [getRouteBlog()]: AppRoutes.BLOG,
    [getRouteCategory()]: AppRoutes.CATEGORY,
    [getRouteItem()]: AppRoutes.ITEM,
    [getRouteUnderConstruction()]: AppRoutes.UNDER_CONSTRUCTION,
    [getRouteDynamicPage()]: AppRoutes.DYNAMIC_PAGE,
    [getRouteNotFound()]: AppRoutes.NOT_FOUND,
};
