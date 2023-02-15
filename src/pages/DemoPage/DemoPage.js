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

import './demo.scss'

import React, { Component } from 'react';

import ModelInfo from '../../components/model-info';
import PlaygroundNav from '../../components/playground-nav/PlaygroundNav';
import SiteHeader from '../../components/header';
import { Theme } from '@carbon/react';

/**
 * Page where users can complete a demo of a given model
 */
class DemoPage extends Component{
  render(){
    return (
      <>
        <SiteHeader/>
        <PlaygroundNav/>

        <Theme theme="g90" className="demo-content">
            Machine reading comp
            <ModelInfo/>
        </Theme>
      </>
    );
  }
}

export default DemoPage;
