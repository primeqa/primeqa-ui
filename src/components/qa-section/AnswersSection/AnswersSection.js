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

import Answer from '../../../util/answer';
import AnswerTile from './AnswerTile/AnswerTile';
import React from 'react';

/**
 * A component that displays a clickable list of answers 
 */
class AnswersSection extends React.Component {
    /**
     * 
     * @param {[Answer]} props.answers A list of answers
     * @param {string} props.question The question that was asked
     * @param {boolean} props.loading Whether the answers are being loaded
     * @param {fn} props.selectAnswer A function that is called when an answer is clicked
     * @param {fn} props.askAnother A function that is called to ask another question.
     * @param {Answer} props.selectedAnswer The answer that is currently selected, if any
     */
  constructor(props) {
    super(props);
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.isSelectedAnswer = this.isSelectedAnswer.bind(this);
  }

  /**
   * 
   * @param {*} answer The answer that was selected
   */
  handleAnswerClick(answer){
    if (this.props.selectAnswer){
      this.props.selectAnswer(answer);
    }
  } 

  /**
   * 
   * @returns A button that allows the user to ask another question
   */
  askAnotherButton(){
    return <div>
       <Button kind="ghost"  size="md" label="" onClick={() => {
          this.props.askAnother();
       }}>
          Ask Another
       </Button>
    </div>
  }

  /**
   * 
   * @param {Answer} answer The answer to check if is selected
   * @returns True if the answer is selected, false otherwise.
   */
  isSelectedAnswer(answer) {
    const isSelected = answer === this.props.selectedAnswer;
    return isSelected;
  }

  render() {
    var askAnother = this.props.loading ? <div></div> : <div>{this.askAnotherButton()}</div>
    const noAnswersFoundText = this.props.answers.length > 0 ? <div></div> : <div>No answers found.</div>;
    return (
        <div className="cds--col-lg-8 cds--col-md-8 ">
            <div className="question-heading questions-left-pad">Answers</div>
            <div className="asked-question-container">
                <TextInput type="text" id={"question-asked-disabled"} labelText="You Asked" value={this.props.question} disabled={true} />
                {askAnother}
            </div>
            {this.props.loading ? (
              <SkeletonPlaceholder className="loading-answer"/>
              ) : (
                <div className='answers-container demo-height'>
                  {this.props.answers.map((answer, index) => (
                      <AnswerTile key={index} answer={answer} isSelected={this.isSelectedAnswer(answer)}onClick={() => {
                          this.props.selectAnswer(answer);
                      }}/>
                  ))}
                  {noAnswersFoundText}
                </div>
              )}
        </div>
        );
  }
}

export default AnswersSection;
