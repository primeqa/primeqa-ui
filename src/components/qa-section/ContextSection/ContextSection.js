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

/**
 * A scrollable section for a Context
 */
class ContextSection extends Component {
    /**
     * 
     * @param {Context} props.context The Context to display
     */
  constructor(props) {
    super(props);
    this.state = {
      context: props.context
    };
  }

  // selectedContent(){
  //   <b style="font-size: 16px; background-color: rgb(5, 48, 173); color: rgb(255, 255, 255); padding: 0.2rem;">$6.99 per month</b>
  // }

  render() {
    return (
        <div className="cds--col-lg-8 cds--col-md-8 context-section">
          <div className='cds--row'>
            <div className="context-heading horizontal-padding">Context</div>
            {/* <div className="context-heading">{this.state.context.title}</div> */}
          </div>
            <p className="context ">{this.state.context.text} </p>
         </div>
    );
  }
}
export default ContextSection;