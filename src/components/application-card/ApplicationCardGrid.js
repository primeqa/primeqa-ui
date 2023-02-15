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

import { Book24, IbmWatsonDiscovery, IbmWatsonNaturalLanguageUnderstanding, Query, SearchLocate } from '@carbon/icons-react';
import { Column, Grid, Tile } from '@carbon/react';

import ApplicationCard from './ApplicationCard';
import React from 'react';

class ApplicationCardGrid extends React.Component {
    /**
     * 
     * @param {[Application]} props.application The applications to display
     */
  constructor(props) {
    super(props);
  }

  render() {
    return <div>
        <Grid>
          <Column lg={4} md={2} sm={4} className="application-card-grid-text">
            <h3 className='application-card-grid-header'>Models</h3>
            <p className='application-card-grid-description'>These PrimeQA models support End-to-end Question Answering across a variety of contexts and languages.</p>
          </Column>
          {/* TODO: for each application, render card. */}
         <ApplicationCard title="Machine Reading Comprehension" description="Extract and/or generate answers given the source document or passage." footer={"Link here"} icon={<SearchLocate size="32" />}/>
         <ApplicationCard title="Information Retrieval" description="Retrieving documents and passages using both traditional (e.g. BM25) and neural (e.g. ColBERT) models" icon={<IbmWatsonNaturalLanguageUnderstanding size="32"/>}/>
         <ApplicationCard title="Question Generation" description="Supports generation of questions for effective domain adaptation over tables and multilingual text." icon={<Query size="32"/>}/>
        </Grid>
    </div>
    
  }
}

export default ApplicationCardGrid;
