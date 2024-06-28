
import { Helmet } from 'react-helmet';
export const HelmetComponent = ({pageData}) => {
    const defaultMeta = {
        title: pageData.title,
        description: pageData.description,
    }
    return (
        <Helmet>
        <title>{pageData.title ? pageData.title : defaultMeta.title}</title>
        <meta property="og:title" content={pageData.title ? pageData.title : defaultMeta.title} />
        <meta name="description" content={pageData.meta_description ? pageData.meta_description : defaultMeta.description} />
        {/* <meta name="facebook-domain-verification" content={FB_VERIFY_CODE} /> */}
        <meta name="keywords" content={pageData.meta_keywords} />
        <meta property="og:description" content={pageData.meta_description ? pageData.meta_description : defaultMeta.description} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content={pageData.image ? pageData.image  :  `/resources/images/main_logo.svg`} />
        <meta name="twitter:title" content={pageData.title ? pageData.title : defaultMeta.title} />
        <meta name="twitter:description" content={pageData.meta_description ? pageData.meta_description : defaultMeta.description} />
        <meta name="twitter:url" content={window.location.href} />
      </Helmet>
    )
}