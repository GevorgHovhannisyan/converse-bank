import './popups.scss';
import { useEffect, useRef, useState } from 'react';
import { toggleClassList } from '../../helpers/Utils';
/* eslint-disable */

const PopupSuccess = ({
  titleText,
  descriptionText,
  popupOpen,
  closeSuccessPopup,
  children,
}) => {
  const showCustomerPopup = () => {
    setCreate(true);
    toggleClassList(bodyTeg, 'popup_msg');
    setTimeout(() => {
      setShow(true);
    }, 10);
  };

  const closeCustomerPopup = () => {
    setShow(false);

    toggleClassList(bodyTeg, 'popup_msg');

    setTimeout(() => {
      closeSuccessPopup();
      setCreate(false);
    }, 300);
  };

  useEffect(() => {
    if (popupOpen) {
      showCustomerPopup();
    }
  }, [popupOpen]);
  //   const dispatch = useDispatch();

  const [createPopup, setCreate] = useState(false);
  const [showPopup, setShow] = useState(false);
  const bodyRef = useRef(document.body);
  const bodyTeg = bodyRef.current;

  return (
    <div className="popup_msg">
      {createPopup ? (
        <div className={`popup_wrapper ${showPopup ? 'showed' : ''}`}>
          <div className={`popup_block`}>
            <div className="popup_inner">
              <div className="popup_container">
                <button
                  className="popup_close icon_close"
                  aria-label="popup_close"
                  onClick={closeCustomerPopup}
                ></button>
                <div className="popup_title">{titleText}</div>
                <div className="popup_description">{descriptionText}</div>
                {children}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export { PopupSuccess };
