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

import './application-card.scss';
import './application-card-grid.scss';

import { Button, Column, Grid } from '@carbon/react';

import ApplicationCard from './ApplicationCard';
import Model from '../../util/model';
import React from 'react';

class ApplicationCardGrid extends React.Component {
    /**
     * 
     * @param {[Model]} props.models The model information cards to display
     */
  constructor(props) {
    super(props);
  }

  footer(demoLink, sourceCodeLink){
    return <div>
      
    </div>
  }

  render() {
    return <div>
        <Grid>
          <Column lg={4} md={2} sm={4} className="application-card-grid-text">
            <h3 className='application-card-grid-header'>Models</h3>
            <p className='application-card-grid-description'>PrimeQA models support End-to-end Question Answering across a variety of contexts and languages.</p>
            <Button kind="secondary" href="https://huggingface.co/PrimeQA" iconDescription="Download Models">
              More Models
            </Button>
          </Column>
          
          {this.props.models.map(function(model, index){
            return <ApplicationCard key={model.id} title={model.title} description={model.description} icon={model.icon}/>
          })}
         </Grid>
    </div>
    
  }
}

export default ApplicationCardGrid;
