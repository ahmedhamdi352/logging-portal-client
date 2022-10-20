import React from 'react';
import { Link } from 'react-router-dom';
// import { siteConfig } from "../../settings";

// import logo from '../../image/logo/n1.png';
import logo from '../../image/logo/barq.svg';
// import logosmall from '../../image/logo/n2.png';

export default ({ collapsed }) => {
  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div>
          <h3>
            <Link to="/dashboard/docs">
              {/* <i className={siteConfig.siteIcon} /> */}
              <img src={logo} width="50" alt="Site Icon" />
            </Link>
          </h3>
        </div>
      ) : (
        <h3>
          <Link to="/dashboard/docs">
            {/* <div class="sc-logo-header logo"></div> */}
            <img src={logo} width="110" alt="BARQ Logo" />
          </Link>
        </h3>
      )}
    </div>
  );
};
