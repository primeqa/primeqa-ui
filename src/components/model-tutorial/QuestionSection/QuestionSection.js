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

import './question-section.scss';

import { Button, Tag, TextInput } from '@carbon/react';

import React from 'react';

/**
 * A section that takes in question input and/or sample questions. Can be used for demos and tutorials.
 */
class QuestionSection extends React.Component {
    /**
     * 
     * @param {[string]} props.samples A list of sample questions that can be selected from.
     */
  constructor(props) {
    super(props);
    this.state = {
      sampleQuestions: props.samples,
      questionText: ""
    };
    
    this.setQuestionText = this.setQuestionText.bind(this);
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
  }


  /**
   * 
   * @param {*} event The event for the text field updating
   */
  handleTextInputChange = (event) => {
    let newText = event.target.value;
    this.setQuestionText(newText);
  };

  /**
   * 
   * @param {string} text The text to set the question field to be.
   */
  setQuestionText(text) {
    this.setState({
        questionText: text
    })
  };

  
  render() {
    let sampleQuestionsHeader = this.state.sampleQuestions.length > 0 ?  <p className="sample-question-label">Sample Questions</p> : <></>

    return (
        <div className="cds--col-lg-8 cds--col-md-8 questions-section accent-color-section">
            <div className="question-heading questions-left-pad">Questions</div>
                <div className=" preset-questions-container questions-left-pad">
                    {sampleQuestionsHeader}
                    {this.state.sampleQuestions.map(function(question, index){
                        return <div key={index} onClick={() => {
                            console.log("clicked") // TODO: handle click. Set question text and submit.
                            }}>
                            <Tag size="md" className="preset-question" disabled={false} >{question}</Tag>
                        </div>
                    })}
                 </div>
            <div className="question-text-box questions-left-pad">
                <TextInput id="text-input-1" type="text" labelText="Ask a question" value={this.state.questionText} onChange={this.handleTextInputChange} />
                <Button kind="ghost" label="">
                    Ask
                </Button>
            </div>
        </div>
        );
  }
}

export default QuestionSection;
