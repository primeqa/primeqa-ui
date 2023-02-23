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
  HeaderGlobalAction,
  HeaderGlobalBar,
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
import { LogoGithub, LogoSlack } from '@carbon/icons-react';
import { QA_PLAYGROUND_URL, READING_PLAYROUND_URL, RETRIEVAL_PLAYGROUND_URL } from '../../api/config';

import { Link } from 'react-router-dom';
import React from 'react';

/**
 * 
 * The navigation header for the site.
 */
const SiteHeader = () => {

  return (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <Header aria-label="PrimeQA">
        <SkipToContent />
        <HeaderMenuButton
          aria-label="Open menu"
          onClick={onClickSideNavExpand}
          isActive={isSideNavExpanded}
        />
        <HeaderName element={Link} to="/" prefix="IBM">
            PrimeQA
        </HeaderName>
        <HeaderNavigation aria-label="Carbon Tutorial">
          <HeaderMenuItem href="#about">About</HeaderMenuItem>
          <HeaderMenuItem href="#models">Models</HeaderMenuItem>
          <HeaderMenuItem href="#demos">Demos</HeaderMenuItem>
          <HeaderMenuItem href="#">Resources</HeaderMenuItem>
          <HeaderMenu aria-label="Playgrounds"  menuLinkName="Playgrounds">
             <HeaderMenuItem href={READING_PLAYROUND_URL}>Reading</HeaderMenuItem>
              <HeaderMenuItem href={RETRIEVAL_PLAYGROUND_URL}>Retrieval</HeaderMenuItem>
              <HeaderMenuItem href={QA_PLAYGROUND_URL}>QA</HeaderMenuItem>
          </HeaderMenu>
        </HeaderNavigation>
        <SideNav
          aria-label="Side navigation"
          expanded={isSideNavExpanded}
          isPersistent={false}
        >
          <SideNavItems>
            <HeaderSideNavItems>
            <HeaderMenuItem isCurrentPage href="#about">About</HeaderMenuItem>
              <HeaderMenuItem href="#models">Models</HeaderMenuItem>
              <HeaderMenuItem href="#demos">Demos</HeaderMenuItem>
              <HeaderMenuItem href="#">Resources</HeaderMenuItem>
              <HeaderMenu aria-label="Playgrounds"  menuLinkName="Playgrounds">
                <HeaderMenuItem href={READING_PLAYROUND_URL}>Reading</HeaderMenuItem>
                  <HeaderMenuItem href={RETRIEVAL_PLAYGROUND_URL}>Retrieval</HeaderMenuItem>
                  <HeaderMenuItem href={QA_PLAYGROUND_URL}>QA</HeaderMenuItem>
              </HeaderMenu>
            </HeaderSideNavItems>
          </SideNavItems>
        </SideNav>
          

        <HeaderGlobalBar>
          <HeaderGlobalAction aria-label="GitHub" href="https://github.com/primeqa">
            <LogoGithub size={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="Slack" href="https://join.slack.com/t/primeqaworkspace/shared_invite/zt-1edc4fn7n-6aUO0CCvDOMOLb0drROwSw">
            <LogoSlack size={20} />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
    )}
  />
)};

export default SiteHeader;