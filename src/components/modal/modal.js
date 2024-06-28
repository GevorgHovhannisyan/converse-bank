import { useRef, useState } from 'react';
// import { FormattedMessage } from 'react-intl';
import { toggleClassList } from '../../helpers/Utils';
// import SimpleField from '../controls/simpleField/simpleField';
import './modal.scss';

const Modal = ({
  // visible,
  modalTitle,
  modalSubtitle,
  modalTopButton,
  modalBody,
  children,
  triggerButtonTitle,
  buttonClassName,
  blockClassName = '',
  wrapperClassName=''
}) => {
  const [createPopup, setCreate] = useState(false);
  const [showPopup, setShow] = useState(false);
  const bodyRef = useRef(document.body);

  // const bodyTeg = document.body;
  const bodyTeg = bodyRef.current;

  const toggleModal = (showModal) => {
    setCreate(showModal);
    toggleClassList(bodyTeg, 'popup_opened');
    setTimeout(() => {
      setShow(showModal);
    }, 0);
  };



  return (
    <div className={`popup_wrapper ${showPopup ? 'showed' : ''} ${wrapperClassName}`}>
      { (
        <button
          className={buttonClassName}
          onClick={() => toggleModal(true)}
        >
          {triggerButtonTitle}
        </button>
      )}
      {createPopup ? (
        <div className={`popup_block ${blockClassName}`}>
          <div className="popup_inner">
            <div className="popup_container">
              <button
                className="popup_close icon_close"
                aria-label="popup_close"
                onClick={() => toggleModal(false)}
              ></button>
              <div className="popup_title">{modalTitle}</div>
              {modalTopButton}
             {!!modalSubtitle && <div className="popup_description">{modalSubtitle}</div>}
              {modalBody}
              {children}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Modal;
