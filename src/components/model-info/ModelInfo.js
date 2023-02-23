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

import './model-info.scss';

import { Column, Grid, Tab, TabList, TabPanel, TabPanels, Tabs, Theme } from '@carbon/react';
import { QATutorial, ReadingTutorial, RetrievalTutorial } from '../model-tutorial/tutorials';

import { Component } from 'react';
import ModelTutorial from '../model-tutorial';

/**
 * Displays information and/or demos for a set of featured PrimeQA models
 */
class ModelInfo extends Component{
    constructor(){
        super();
        this.tutorials = {
          reading: new ReadingTutorial(true),
          retrieval: new RetrievalTutorial(false),
          qa: new QATutorial(false)
        };
    }
    render(){
      return (
      <div > 
        <Grid>
            <Column lg={8} md={8} sm={4} className="">
                <h3 className=''>Demos</h3>
                <div className='demos-description'>
                  Explore the capabilities of state-of-the art PrimeQA models without any technical expertise or setup required.
                </div>
            </Column>         
        </Grid>
        <Theme theme="white">
          <div className="cds--grid"> 
          <Tabs >
              <TabList activation="manual"  aria-label="List of tabs"  light={true}>
                {Object.keys(this.tutorials).map((key, idx) => 
                  <Tab key={idx} className="bx--tabs__nav-item" disabled={!this.tutorials[key].enabled}>{this.tutorials[key].shortTitle}</Tab>
                  )}
              </TabList> 
              <TabPanels className="tab-background">
                {Object.keys(this.tutorials).map((key, idx) => 
                    <TabPanel key={idx} className="tab-panel-no-pad">
                      <ModelTutorial tutorial={this.tutorials[key]} />
                    </TabPanel> 
                )}
              </TabPanels>
            </Tabs>
          </div>
        </Theme>       
        
      </div>
      );
    }
}

export default ModelInfo;