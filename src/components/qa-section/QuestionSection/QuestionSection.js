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
     * @param {fn} props.ask A function that is called when a question is asked

     */
  constructor(props) {
    super(props);
    this.state = {
      questionText: ""
    };
    
    this.sampleQuestionButton = this.sampleQuestionButton.bind(this)
;   this.handleSampleQuestionClick = this.handleSampleQuestionClick.bind(this);
    this.setQuestionText = this.setQuestionText.bind(this);
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
  }

  /**
   * 
   * @param {*} event The event for the text field updating
   */
  handleTextInputChange = (event) => {
    let newText = event.target.value;
    this.setState({
      questionText: newText
    });
  };

  /**
   * 
   * @param {string} text The text to set the question field to be.
   */
  setQuestionText(text) {
    this.setState({
      questionText: text
    }, () => {
      // Ask the question
      this.props.ask(this.state.questionText);
    });
  };

  /**
   * 
   * @param {*} event The click event for a sampleQuestionButton
   */
  handleSampleQuestionClick = (event) => {
    if (event.target.title){
      this.setQuestionText(event.target.title);
    }
  }


  /**
   * 
   * @param {string} question  The text of the question
   * @param {number} index The index of the button in the list of sample questions
   * @returns A button that can be clicked to select the sample question 
   */
  sampleQuestionButton(question, index) {
    return <div key={index} onClick={this.handleSampleQuestionClick}>
        <Tag size="md" className="preset-question" disabled={false} >{question}</Tag>
    </div>
  }

  askQuestionButton(){
    // TODO: validate that the user can ask a question.
      // if text empty, grey out buttto
    return <div>
       <Button kind="primary"  size="md" label="" onClick={() => {
          this.props.ask(this.state.questionText)
       }}>
          Ask
       </Button>
    </div>
  }
  
  render() {
    let sampleQuestionsHeader = this.props.samples.length > 0 ?  <p className="sample-question-label">Sample Questions</p> : <></>

    return (
        <div className="cds--col-lg-8 cds--col-md-8">
            <div className="question-heading ">Question</div>
            
            <div className="ask-question-container">
                <TextInput className="" id="text-input-1" placeholder="Ask a question" type="text" labelText="" value={this.state.questionText} onChange={this.handleTextInputChange} />
                {this.askQuestionButton()}
            </div>
            
            <div className='preset-question-title'>
              {sampleQuestionsHeader}
              <div className="preset-questions-container">
                  {this.props.samples.map(this.sampleQuestionButton)}
              </div>
            </div>
            
        </div>
        );
  }
}

export default QuestionSection;
