import { Button, Column, Tile } from "@carbon/react";

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
import React from 'react';

class ApplicationCard extends React.Component {
   /**
     * 
     * @param {string} props.title The title of the application 
     * @param {string} props.description The description of the application 
     * @param {string} props.icon The icon of the card
     * @param {string} props.footer An optional footer to display on the card
     */
   constructor(props) {
    super(props);
  }

  render() {
    return <Column lg={4} md={2} sm={4}>
      <Tile>
          <div className='application-card'>
              <div>
                  <div>{this.props.icon || ""}</div>
                  <div className='application-card-heading'>{this.props.title || ""}</div>
                  <div className='application-card-description'>{this.props.description || ""}</div>
              </div>
              <div>
                {this.props.footer || ""}
              </div>
          </div>
      </Tile>
    </Column>
  }
}

export default ApplicationCard;
