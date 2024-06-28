import { FormattedMessage } from 'react-intl';
import { NavLink, useParams } from 'react-router-dom';
import './breadcrumb.scss';
import { getRouteMain } from "../../../constants/router";

const SimpleField = ({ routes }) => {
  const { lang } = useParams();
  return (
    <div className="breadcrumbs">
      <div className="page_container">
        <ul>
          <li>
            <NavLink to={lang ? `/${lang}/` : getRouteMain()}>
              <FormattedMessage id="Home page" />
            </NavLink>
          </li>
          {!!routes.length &&
            routes.map((route, index) => {
              return (
                <li key={index}>
                  <NavLink to={route.url}> {route.name}</NavLink>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default SimpleField;
