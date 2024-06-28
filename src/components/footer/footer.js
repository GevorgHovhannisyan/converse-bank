import {useState, useEffect} from 'react';
import {FormattedMessage} from 'react-intl';
import BottomFooter from './components/bottom-footer/bottom-footer';
import TopFooter from './components/top-footer/top-footer';

import './footer.scss';

const Footer = ({lang}) => {
    const [showTopBtn, setShowTopBtn] = useState();

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className="footer">
            <div className="page_container">
                <TopFooter lang={lang}/>
                <BottomFooter/>
            </div>
            {showTopBtn && (
                <div className="scroll_top_btn" onClick={goToTop}>
                    <FormattedMessage id="Up"/> <span className='icon_arrow_down'></span>
                </div>
            )}
        </div>
    );
};

export default Footer;
