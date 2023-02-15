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

import './landing-page.scss';

import React, { Component } from 'react';

import AboutSection from '../../components/about-section/AboutSection';
import ApplicationCardGrid from '../../components/application-card/ApplicationCardGrid';
import Banner from '../../components/banner';
import SiteHeader from '../../components/header';
import { Theme } from '@carbon/react';
import about_information from '../../util/about-text';
import models from '../../util/models';

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
            <Banner header="PrimeQA" subheader="PrimeQA is a public open source repository that enables researchers and developers to train state-of-the-art models for question answering (QA)."/>
            <Theme theme="white" className="model-information-section">
              <div className="about-section">
                <AboutSection info={about_information} />
              </div>
              <div className="about-section">
                <ApplicationCardGrid models={models}/>
              </div>
            </Theme>
            {/* TODO: Resources */}
        </Theme>
      </>
    );
  }
}

export default LandingPage;
