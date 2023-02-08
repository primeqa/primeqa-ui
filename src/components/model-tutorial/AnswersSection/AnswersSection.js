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

import './answers-section.scss';

import { Button, Tag, TextInput } from '@carbon/react';

import React from 'react';

/**
 *
 */
class AnswersSection extends React.Component {
    // 
    /**
     * 
     * @param {[string]} props.answers A list of answers
     * @param {fn} props.selectAnswer A function that is called when an asnwer is clicked

     */
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  
  render() {
    return (
        <div className="cds--col-lg-8 cds--col-md-8 ">
            <div className="question-heading questions-left-pad">Answers</div>
            {/* // TODO: ask another question button */}
{/* TODO: put in question askwed */}
            {/* Put answers here */}
        </div>
        );
  }
}

export default AnswersSection;
