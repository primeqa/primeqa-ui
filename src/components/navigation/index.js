/**
*
* Copyright 2022 PrimeQA Team
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*/

import PropTypes from "prop-types";
import React from "react";

import {
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavDivider,
  Theme,
} from "@carbon/react";
import {
  Home,
  Search,
  Book,
  SearchLocate,
  Application,
} from "@carbon/react/icons";

import "./styles.scss";

function Navigation({ applications, active_application }) {
  return (
    <Theme theme="white">
      <SideNav aria-label="Side navigation" isRail>
        <SideNavItems>
          <SideNavLink
            key="navigation--home"
            renderIcon={Home}
            href="/"
            isActive={active_application === "home" ? true : false}
          >
            Home
          </SideNavLink>
          <SideNavDivider></SideNavDivider>
          {applications.map((application) => (
            <SideNavLink
              key={"navigation--" + application.applicationId}
              renderIcon={
                application.applicationId === "retrieval"
                  ? Search
                  : application.applicationId === "reading"
                  ? Book
                  : application.applicationId === "qa"
                  ? SearchLocate
                  : Application
              }
              href={"/" + application.applicationId}
              isActive={
                active_application === application.applicationId ? true : false
              }
            >
              {application.name}
            </SideNavLink>
          ))}
        </SideNavItems>
      </SideNav>
    </Theme>
  );
}

Navigation.defaultProps = {
  active_application: "home",
};
Navigation.propTypes = {
  applications: PropTypes.array,
  active_application: PropTypes.string,
};

export default Navigation;
