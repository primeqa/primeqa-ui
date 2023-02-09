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
import { set } from 'lodash';

const ContextMode = {
  LOCKED: "SINGLE_LOCKED",
  EDITABLE: "SINGLE_EDITABLE",
};

// no either pass in 1 context or a group + idx.
// then mode 
/**
 * A scrollable section for a Context
 */
class ContextSection extends Component {
    /**
     * 
     * @param {ContextMode} props.mode The mode of the context (either editable or locked)
     * @param {Context} props.selectedContext A context to display.
     */
  constructor(props) {
    super(props);
  }

  render() {
    var context_content = <div></div>
    if (this.props.mode == ContextMode.EDITABLE || !this.props.context){
      context_content = <div>{"edit text area"}</div>
    }else{
      context_content = <p className="context">{this.props.context.text} </p>
    }
    return (
        <div className="cds--col-lg-8 cds--col-md-8 context-section">
            <div className="context-heading">
              Context
            </div>
            {context_content}
         </div>
    );
  }
}
export {ContextSection, ContextMode};