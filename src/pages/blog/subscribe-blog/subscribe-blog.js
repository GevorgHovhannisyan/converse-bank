import {useState} from "react";
import './subscibeBlog.scss';
import {FormattedMessage} from "react-intl";
import * as Yup from "yup";
import {useFormik} from "formik";
import HomeAppSection from "../../../components/homeAppSection";
/* eslint-disable */
const SubscribeBlog = () => {
    const [hasError,setError] = useState(true);


    //validation form
    const validationSchema = Yup.object().shape({
        email: Yup.string().required(<span><FormattedMessage id="Email error" /></span>).email( <span><FormattedMessage id="Invalid email" /></span> ),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        // validateOnChange: false,
        // validateOnBlur: false,
        onSubmit: (data,formikBag) => {
            setError(false)
        },
    });
    //validation form
    return (
        <div className="subscribe_blog_section">
            <HomeAppSection/>
        </div>
    )
}

export default SubscribeBlog;