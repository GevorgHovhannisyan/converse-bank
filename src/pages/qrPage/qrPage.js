import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { qrPage, skQrLoading } from '../../redux/slices/settings/settings';
import { MainLayout } from '../../layouts/MainLayout';
import { getQrPage } from '../../redux/thunks/settingsThunk';
import './qrPage.scss';
import { useParams } from "react-router-dom";
import { CreateSkeleton } from "../../components/hoc/skeleton/skeleton";
import '../../components/hoc/skeleton/skeleton.scss';
import settingsJson from '../../settings/settings.json'

const QrPage = () => {
    const dispatch = useDispatch();
    const {lang} = useParams();
    const qr_info = useSelector(qrPage);
    const skLoading = useSelector(skQrLoading);


    useEffect(() => {
        dispatch(getQrPage());
    }, [dispatch, lang]);

    return (
        <MainLayout>
            <div className="qr_page" style={{backgroundImage: `url("/resources/images/coming_soon.png")`}}>
                <div className="page_container">
                    {skLoading ? (
                        <>
                            <CreateSkeleton span={true} number={2} />
                        </>
                    ) : (
                        <div className="inner_section">
                            <div className="left_block">
                                <div className="section_title">{qr_info?.name}</div>
                                <div className="page_row">
                                    <a rel="noreferrer" href={`${settingsJson.android_url}`} target="_blank"
                                       className="app_form">
                                        <img src="/resources/images/img6.svg" title="" width="135" height="40" alt=""/>
                                    </a>
                                    <a rel="noreferrer" href={`${settingsJson.apple_url}`} target="_blank"
                                       className="app_form">
                                        <img src="/resources/images/img7.svg" title="" width="135" height="40" alt=""/>
                                    </a>
                                    <a rel="noreferrer" href={`${settingsJson.huawei_url}`} target="_blank"
                                       className="app_form">
                                        <img src="/resources/images/img8.svg" title="" width="135" height="40" alt=""/>
                                    </a>
                                </div>
                            </div>
                            <div className="right_block">
                                <img src={qr_info?.image} title={qr_info?.name} alt={qr_info?.name}/>
                            </div>
                        </div>
                    )}


                    <div className="section_pay">
                        <ul className="list_pay">
                            {qr_info?.sections && qr_info?.sections.map((section) => (
                                <li>
                                    <img src={section?.image} title={section?.title} alt={section?.title}/>
                                    <div>{section?.title}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </MainLayout>
);
};

export default QrPage;
