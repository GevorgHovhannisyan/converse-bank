import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/pages/actions";
import * as Pages from "../../helpers/Pages";
import Templates from "../../helpers/Templates";
import DefaultPage from "./default-page";
import { Helmet } from "react-helmet";




const PageController = ({ page }) => {
    const dispatch = useDispatch();
    const pageData = useSelector(({ Pages }) => Pages.getIn(['current', page.id]))
    const siteConfigs = useSelector(({ Settings }) => Settings.get('site_configs'))

    useEffect(() => {
        dispatch(actions.getPages(page.id));
        return () => {
            dispatch(actions.setPages({}));
            dispatch(actions.setModule());
        }
    }, [page, dispatch]);

    useEffect(() => {
        if (pageData) {
            dispatch(actions.setLastUpdate(pageData.update_date));
        }
    })
    let defaultMeta = {
        title: "",
        description: "",
    }
    const currentLang = JSON.parse(localStorage.getItem('locale'));

    siteConfigs && siteConfigs.map((item) => {
        switch (currentLang.id) {
            case 1: {
                if (item.key === "DEFAULT_META_TITLE_AM") {
                    defaultMeta.title = item.value
                } else if (item.key === "DEFAULT_META_DESCRIPTION_AM") {
                    defaultMeta.description = item.value
                }
                return defaultMeta;
            }
            case 2: {
                if (item.key === "DEFAULT_META_TITLE_RU") {
                    defaultMeta.title = item.value
                } else if (item.key === "DEFAULT_META_DESCRIPTION_RU") {
                    defaultMeta.description = item.value
                }
                return defaultMeta;
            }

            case 3: {
                if (item.key === "DEFAULT_META_TITLE_EN") {
                    defaultMeta.title = item.value
                } else if (item.key === "DEFAULT_META_DESCRIPTION_EN") {
                    defaultMeta.description = item.value
                }
                return defaultMeta;
            }

            default:
                return defaultMeta;
        }
    })


    if (!pageData)
        return false;

    let Component;
    if (page && page.template && Templates[page.template])
        Component = Templates[page.template];
    else if (page && page.module && Pages[page.module])
        Component = Pages[page.module];
    else
        Component = DefaultPage;
    return (
        <>
            <Helmet>
                <title>{pageData.meta_title ? pageData.meta_title : defaultMeta.title}</title>
                <meta property="og:title" content={pageData.meta_title ? pageData.meta_title : defaultMeta.title} />
                <meta name="description" content={pageData.meta_description ? pageData.meta_description : defaultMeta.description} />
                <meta name="keywords" content={pageData.meta_keywords} />
                <meta property="og:description" content={pageData.meta_description ? pageData.meta_description : defaultMeta.description} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image" content={pageData.image ? !(pageData.image.path.indexOf("http://") === 0 || pageData.image.path.indexOf("https://") === 0 ) ? `${window.location.origin}/image/${pageData.image.path}` : pageData.image.path : `${window.location.origin}/resources/images/logo.png`} />
                <meta name="twitter:title" content={pageData.meta_title ? pageData.meta_title : defaultMeta.title} />
                <meta name="twitter:description" content={pageData.meta_description ? pageData.meta_description : defaultMeta.description} />
                <meta name="twitter:url" content={window.location.href} />
            </Helmet>
            <Component page={pageData} />
        </>
    )
}

export default PageController;