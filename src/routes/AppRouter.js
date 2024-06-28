import { memo, useEffect, useState } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import { innerRoutes } from "./config/routeConfig";
import { getRouteLang, getRouteMain } from "../constants/router";

const AppRouter = () => {
    const [notArmenian, setNotArmenian] = useState(false);
    const { pathname }  = useLocation();
    const languageCodeRegex = /ru|en/;

    const withoutTranslateRoutes = useRoutes([{
        path: getRouteMain(),
        children: innerRoutes,
    }]);

    const withTranslateRoutes = useRoutes([{
        path: getRouteLang(),
        children: innerRoutes,
    }]);

    useEffect(() => {
        setNotArmenian(languageCodeRegex.test(pathname));
    }, [pathname]);

    return !notArmenian ? withoutTranslateRoutes : withTranslateRoutes
};

export default memo(AppRouter);
