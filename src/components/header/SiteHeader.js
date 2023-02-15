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

import {
  Header,
  HeaderContainer,
  HeaderMenu,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
  HeaderSideNavItems,
  SideNav,
  SideNavItems,
  SkipToContent
} from '@carbon/react';

import { Link } from 'react-router-dom';
import React from 'react';

/**
 * 
 * The navigation header for the site.
 */
const SiteHeader = () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <Header aria-label="PrimeQA">
        <SkipToContent />
        <HeaderMenuButton
          aria-label="Open menu"
          onClick={onClickSideNavExpand}
          // isActive={isSideNavExpanded}
        />
        <HeaderName element={Link} to="/" prefix="IBM">
            PrimeQA
        </HeaderName>
        <HeaderNavigation aria-label="Carbon Tutorial">
          <HeaderMenuItem isCurrentPage href="/">About</HeaderMenuItem>
          <HeaderMenuItem href="#">Models</HeaderMenuItem>
          <HeaderMenuItem href="#">Demos</HeaderMenuItem>
          <HeaderMenuItem href="#">Resources</HeaderMenuItem>
          <HeaderMenu aria-label="Playgrounds"  menuLinkName="Playgrounds">
             <HeaderMenuItem href="/playground">Reading</HeaderMenuItem>
              <HeaderMenuItem href="#two">Retrieval</HeaderMenuItem>
              <HeaderMenuItem href="#three">QA</HeaderMenuItem>
          </HeaderMenu>
        </HeaderNavigation>
        {/* <SideNav
          aria-label="Side navigation"
          expanded={isSideNavExpanded}
          isPersistent={false}
        >
          <SideNavItems>
            <HeaderSideNavItems>
              <HeaderMenuItem isCurrentPage href="/">About</HeaderMenuItem>
              <HeaderMenuItem href="#">Models</HeaderMenuItem>
              <HeaderMenu aria-label="Playgrounds" menuLinkName="Playgrounds">
             <HeaderMenuItem href="#one">Reading</HeaderMenuItem>
              <HeaderMenuItem href="#two">Retrieval</HeaderMenuItem>
              <HeaderMenuItem href="#three">QA</HeaderMenuItem>
              </HeaderMenu>
              <HeaderMenuItem href="#">Resources</HeaderMenuItem>
            </HeaderSideNavItems>
          </SideNavItems>
        </SideNav> */}
      </Header>
    )}
  />
);

export default SiteHeader;