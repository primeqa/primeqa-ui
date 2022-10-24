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

import React from "react";
import PropTypes from "prop-types";
import {
  Header,
  HeaderGlobalBar,
  HeaderGlobalAction,
  Theme,
} from "@carbon/react";
import { LogoGithub } from "@carbon/react/icons";

function HeaderContent() {
  return (
    <Theme theme="white">
      <Header aria-label="PrimeQA Applications">
        <a href="/">
          <img
            src={process.env.PUBLIC_URL + "/logo192.png"}
            alt="primeqa"
            className="center"
          />
        </a>
        <HeaderGlobalBar>
          <HeaderGlobalAction
            aria-label="Github"
            onClick={() => {
              const newWindow = window.open(
                "https://github.com/primeqa/primeqa-ui",
                "_blank",
                "noopener,noreferrer"
              );
              if (newWindow) newWindow.opener = null;
            }}
            tooltipAlignment="end"
          >
            <LogoGithub size={24}></LogoGithub>
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
    </Theme>
  );
}

HeaderContent.defaultProps = {
  onSettingsClick: () => {},
};

HeaderContent.propTypes = {
  onSettingsClick: PropTypes.func,
};

export default HeaderContent;
