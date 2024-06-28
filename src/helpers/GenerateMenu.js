import { createRoutePath } from './Utils';
import { NavLink, useNavigate } from 'react-router-dom'; //, Link
import { setTopMenuActiveID } from '../redux/slices/navigation/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect /*, useState */ } from 'react';
import { getRouteMain } from "../constants/router";

export const GenHeaderMenu = (main_menu, lang, navigate) => {
  let childRoutes = [];

  if (main_menu.length) {
    const findPage = main_menu[0];
    childRoutes = findPage.children;
  }

  return (
    <ul>
      {childRoutes.map((menu_item, i) => {
        return (
          <li key={i}>
            {generateRoute(menu_item, main_menu, lang, navigate)}

            <ul className="submenu_list">
              {menu_item.children && menu_item.children.length
                ? menu_item.children.map((child, j) => {
                    return (
                      <li key={j}>
                        {generateRoute(child, main_menu, lang, navigate)}
                      </li>
                    );
                  })
                : ''}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

export const GenHeaderTopMenu = ({ main_menu, lang }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const topMenuActiveID = useSelector(
    (state) => state.navigation.topMenuActiveID
  );
  const onTopMenuClick = (menu) => {
    dispatch(setTopMenuActiveID(menu.id));
    navigate(lang ? `/${lang}/${menu.url}` : getRouteMain() + menu.url);
  };

  useEffect(() => {}, [topMenuActiveID]);
  return main_menu.length
    ? main_menu.map((menu, index) => {
        return (
          <li
            className={topMenuActiveID === menu.id ? 'current' : ''}
            onClick={() => onTopMenuClick(menu)}
            key={index}
          >
            <NavLink
              to={
                lang ? `/${lang}/${menu.url}` : getRouteMain() + menu.url
              }
            >
              {menu.title}
            </NavLink>
          </li>
        );
      })
    : '';
};

const generateRoute = (menu_item, main_menu, lang, navigate) => {
  let url = '';
  // let generatedUrl = "";
  const generateRoute = createRoutePath(menu_item, main_menu, lang, url, []);
  if (generateRoute.internal) {
    return <NavLink to={generateRoute.internal.url}>{menu_item.title}</NavLink>;
  } else if (generateRoute.external) {
    return generateRoute.external.target === '_blank' ? (
      <a
        href={generateRoute.external.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {menu_item.title}
      </a>
    ) : (
      <a href={generateRoute.external.url} rel="noopener noreferrer">
        {menu_item.title}
      </a>
    );
  }
};
