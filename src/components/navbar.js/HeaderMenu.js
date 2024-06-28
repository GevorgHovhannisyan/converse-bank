import { useRef, useState } from 'react';
import { isTouchDevice } from '../../helpers/isTouch';
import './headerMenu.css';


const isTouch = isTouchDevice();
export const HeaderMenu = ({ menu = { children: [] } }) => {
  const timerRef = useRef({ enter: null, leave: null, timeout: 300, openedID: null });

  const [hiddenClassName, sethiddenClassName] = useState({})

  function NavBar({ menu, depth = 1 }) {

    return menu.map((menuItem) => {


      // toggleClassList()

  const onMouseEnter = (item) => {
    clearTimeout(timerRef.current.leave);
    if(timerRef.current.openedID === item.id) {
      return;
    }

    timerRef.current.enter = setTimeout(() => {
      timerRef.current.openedID = item.id
      sethiddenClassName(p => ({  [item.id]: true}))
    }, timerRef.current.timeout);
  };

  const onMouseLeave = (item) => {
    clearTimeout(timerRef.current.enter);

    timerRef.current.leave = setTimeout(() => {
      sethiddenClassName(p => ({  [item.id]: false}))
      timerRef.current.openedID = null;
    }, 0);
  };

  

      // TODO on line 68 add arrow icon to
      
      if (!!menuItem.children.length) {
        return (
          <li
            className={`${hiddenClassName[menuItem.id] ? 'opened' : ''}`}
            onMouseLeave={() => onMouseLeave(menuItem)}
            key={menuItem.id}
          >
            {isTouch ? (
              <button
                onMouseEnter={() => onMouseEnter(menuItem)}
                onTouchStart={() => onMouseEnter(menuItem)}
                className="submenu_btn"
              >
                {menuItem.title}
              </button>
            ) : (
              <a
                onMouseEnter={() => onMouseEnter(menuItem)}
                onTouchStart={() => onMouseEnter(menuItem)}
                className="submenu_btn"
                href={menuItem.url}
              >
                {' '}
                {menuItem.title}{' '}
              </a>
            )}

            <ul
              className={`submenu_list  menu_sub_${depth} ${
                !hiddenClassName[menuItem.id] ? 'hidden' : ''
              }`}
            >
              {menuItem.children.map((subItem) => {
                return (
                  <li key={subItem.id} className={'submenu_item'}>
                    <a target={subItem.target === '_blank'?'_blank':null} href={subItem.url} rel='noreferrer'> {subItem.title}</a>
                  </li>
                );
              })}

              {isTouch && (
                <li>
                  <a rel="noreferrer" target={menuItem.target === '_blank'?'_blank':null} href={menuItem.url}> {'View all'}</a>
                </li>
              )}
            </ul>
          </li>
        );
      }
      return (
          <li key={menuItem.id}>
              <a  rel="noreferrer" target={menuItem.target === '_blank'?'_blank':null} href={menuItem.url}>
                {menuItem.title}
              </a>
          </li>
      );
    });
  }

  return (
 
        <ul>
            <NavBar menu={menu.children} />
        </ul>
  );
};
