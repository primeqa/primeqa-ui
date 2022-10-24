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
import { Tile } from "@carbon/react";
import { Link } from "react-router-dom";

function ApplicationCard({ application, renderIcon }) {
  return (
    <Tile className="application--tile">
      <div className="application--tile-header">
        {renderIcon ? React.createElement(renderIcon) : null}
        <Link to={"/" + application.applicationId}>{application.name}</Link>
      </div>
      <div className="application--tile-description">
        {application.description}
      </div>
    </Tile>
  );
}

ApplicationCard.propTypes = {
  application: PropTypes.object,
  /**
   * Optional prop to allow overriding the icon rendering.
   * Can be a React component class
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default ApplicationCard;
