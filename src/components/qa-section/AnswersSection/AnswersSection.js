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

import { Button, SkeletonPlaceholder, TextInput } from '@carbon/react';

import AnswerTile from './AnswerTile/AnswerTile';
import React from 'react';

/**
 *
 */
class AnswersSection extends React.Component {
    // 
    /**
     * 
     * @param {[string]} props.answers A list of answers
     * @param {string} props.question The question that was asked
     * @param {boolean} props.loading Whether the answers are being loaded
     * @param {fn} props.highlightAnswerInContext A function that is called when an asnwer is clicked
     */
  constructor(props) {
    super(props);
    this.state = {
      selectedAnswer: null
    };
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
  }

  handleAnswerClick(answer){
    console.log(answer);
    if (this.props.highlightAnswerInContext){
      this.props.highlightAnswerInContext(answer);
    }
  }

  askAnotherButton(){
    return <div>
       <Button kind="ghost"  size="md" label="" onClick={() => {
          this.props.askAnother();
       }}>
          Ask Another
       </Button>
    </div>
  }

  render() {

    var askAnother = this.props.loading ? <div></div> : <div>{this.askAnotherButton()}</div>
    return (
        <div className="cds--col-lg-8 cds--col-md-8 ">
            <div className="question-heading questions-left-pad">Answers</div>
            {/* TODO: put in question askwed */}
            <div className="asked-question-container">
                <TextInput type="text" labelText="You Asked" value={this.props.question} disabled={true} />
                {askAnother}
            </div>
            {this.props.loading ? (
              <SkeletonPlaceholder className="loading-answer"/>
              ) : (
                <div>
                  <AnswerTile/>
                </div>
              )}
            {/* // TODO: ask another question button */}
            {/* Put answers here */}
        </div>
        );
  }
}

export default AnswersSection;
