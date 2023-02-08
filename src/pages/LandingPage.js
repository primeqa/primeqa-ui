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

import { Content, Theme } from '@carbon/react';
import React, { Component } from 'react';

import Banner from '../components/banner';
import ModelInfo from '../components/model-info';
import SiteHeader from '../components/header';

/**
 * Landing page for the PrimeQA site. Currently consists of banner and model information.
 */
class LandingPage extends Component{
  render(){
    return (
      <>
        <Theme theme="white">
          <SiteHeader/>
        </Theme>
        
        <Theme theme="g10">
                <Banner header="PrimeQA" subheader="State-of-the-art Question Answering R&D"/>
                {/* TODO: More detailed About */}
                <ModelInfo/>
                {/* TODO: Resources */}
        </Theme>
      </>
    );
  }
}

export default LandingPage;
