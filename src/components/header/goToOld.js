import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router";

const GoToOldPage = () => {
    const [isShow, setShow] = useState(true);
    const [hide, setHide] = useState(false);
    const {lang} = useParams()
    const removeGoToOld = () => {
        setHide(true);
        setTimeout(() => {
            setShow(false)
        },500)
        
    }


  const onClickHeader = (e) => {
    document.body.classList.remove('menu_opened');
  }
   return (
        isShow && <div className={`go_to_old ${hide ? 'closed' : ''}`}>
            <div onClick={onClickHeader} className="page_container">
                <a rel='noreferrer' href={`https://www.conversebank.am/${lang?lang:'hy'}/home`} target="_blank"><FormattedMessage id="To the old site" /></a>
               {/* <a rel='noreferrer' href="https://conversebank.am/hy/announcements/item/1951/" target="_blank"><FormattedMessage id="To the old site" /></a>*/}
                <button className="remove_btn icon_close" aria-label="remove" onClick={removeGoToOld}></button>
            </div>
        </div> 
   );       
}

export default GoToOldPage;