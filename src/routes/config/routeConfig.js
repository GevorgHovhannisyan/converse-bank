import {
    getRouteBlog,
    getRouteItem,
    getRouteQrPage,
    getRouteMobilApp,
    getRouteBusiness,
    getRouteNotFound,
    getRouteCategory,
    getRouteDynamicPage,
    getRouteUnderConstruction
} from "../../constants/router";
import IndividualHome from "../../pages/home/individual";
import QrPage from "../../pages/qrPage/qrPage";
import Blog from "../../pages/blog";
import React from "react";
import BlogInner from "../../pages/blog/blog-inner/blogInner";
import ComingSoon from "../../components/comingSoon/comingSoon";
import NotFound from "../../pages/error-page";
import Landing from "../../pages/landing/Landing";
import { MainLayout } from "../../layouts/MainLayout";

export const innerRoutes = [
    {
        index: true,
        element: <IndividualHome/>
    },
    {
        path: getRouteBusiness(),
        element: <IndividualHome/>,
    },
    {
        path: getRouteMobilApp(),
        element: <Landing/>,
    },
    {
        path: getRouteQrPage(),
        element: <QrPage/>,
    },
    {
        path: getRouteBlog(),
        element: <Blog />,
        children: [
            { path: getRouteCategory(), element: <> </> },
            { path: getRouteItem(), element: <BlogInner/> },
        ],
    },
    {
        path: getRouteUnderConstruction(),
        element: <MainLayout noFooter={true}><ComingSoon/></MainLayout>
    },
    {
        path: getRouteNotFound(),
        element: <MainLayout noFooter={true}><NotFound/></MainLayout>,
    },
    {
        path: getRouteDynamicPage(),
        // element: <DistributorPage />,
        element: <MainLayout noFooter={true}><NotFound/></MainLayout>,
    },
]
