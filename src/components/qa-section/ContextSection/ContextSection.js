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

import './context-section.scss';

import { Component } from "react";
import { Dropdown } from '@carbon/react';

/** 
 * The mode in which to display a Context. Can be MULTI, EDITABLE, or LOCKED
*/
const ContextMode = {
  LOCKED: "SINGLE_LOCKED",
  EDITABLE: "SINGLE_EDITABLE",
  MULTI: "MULTI"
};

/**
 * A scrollable component that displays a context. Highlights a subsection of text for answers, if desired.
 */
class ContextSection extends Component {
    /**
     * 
     * @param {ContextMode} props.mode The mode of the context (either multi, editable, or locked)
     * @param {Context} props.selected The selected context to display.
     * @param {fn} props.selectContext A callback function that is invoked when a context is selected
     * @param {[Context]} props.contexts An optional lists of contexts that can be selecte
     * @param {Answer} props.selectedAnswer The currently selected answer, if any

     */
  constructor(props) {
    super(props);
    this.highlightContext = this.highlightContext.bind(this);
  }

  /**
   * 
   * @param {Answer} answer The answer to highlight in the context
   * @returns a div of the highlighted text
   */
  highlightContext(answer){
    const firstIndex = this.props.selectedAnswer.start_char_offset;
    const lastIndex = this.props.selectedAnswer.end_char_offset;
    const highlightedText = <p className="context">
      {this.props.selected.text.slice(0,firstIndex )}
      <mark className='highlighted-answer'> {this.props.selected.text.slice(firstIndex, lastIndex)}</mark>
      {this.props.selected.text.slice(lastIndex+1)}
    </p>

    return highlightedText
  }


  render() {
    var contextBody = <div></div>
    if (this.props.mode == ContextMode.EDITABLE || !this.props.selected){
      contextBody = <div>{"edit text area"}</div>
    }else{
      if(this.props.selectedAnswer){
        contextBody = this.highlightContext(this.props.selectedAnswer); 
      }else{
        contextBody = <p className="context">{this.props.selected.text} </p>
      }
    }

    var contextHeader = <div></div>
    if (this.props.mode == ContextMode.MULTI) {
      contextHeader = <Dropdown id="inline" titleText="Context" label="Context Options" initialSelectedItem={this.props.selected} size="sm" type="inline" items={this.props.contexts} itemToString={(c) => (c ? c.title : "" )} onChange={this.props.selectContext}/>
    }else{
      contextHeader = <div className="context-heading">Context</div>
    }
        
    return (
        <div className="cds--col-lg-8 cds--col-md-8 demo-height context-section">
            {contextHeader}  
            {contextBody}
         </div>
    );
  }
}
export {ContextSection, ContextMode};