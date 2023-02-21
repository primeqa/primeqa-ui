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
import { ArrowRight } from '@carbon/icons-react';
import { Code } from '@carbon/icons-react';
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

  render() {
    return <div>
        <Grid>
          <Column lg={4} md={2} sm={4} className="application-card-grid-text">
            <h3 className='application-card-grid-header'>Models</h3>
            <p className='application-card-grid-description'>PrimeQA models support End-to-end Question Answering across a variety of contexts and languages.</p>
            <Button kind="ghost" href="https://huggingface.co/PrimeQA" renderIcon={ArrowRight} iconDescription="All Models">
              All Models
            </Button>
          </Column>
          
          {this.props.models.map(function(model, index){
            return <ApplicationCard key={model.id} title={model.title} description={model.description} icon={model.icon} footer={cardFooter(model)}/>
          })}
         </Grid>
    </div>
    
  }
}

function cardFooter(model){
  var sourceButton = <div></div>
  console.log(model)
  if (model){
    if(model.sourceLink){
      sourceButton = <Button kind="ghost" renderIcon={Code} iconDescription="Model Source" hasIconOnly href={model.sourceLink}/>
    }
  }
  return <div>
    {sourceButton}
  </div>
}

export default ApplicationCardGrid;
