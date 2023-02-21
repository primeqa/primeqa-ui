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

import { ContextMode } from "../../../../qa-section/ContextSection/ContextSection";
import { DefinitionTooltip } from "@carbon/react";
import QASection from "../../../../qa-section";
import { TutorialStep } from "../../tutorial";
import {sample_contexts} from "../../sample-contexts";

const contextDefinition =  <DefinitionTooltip definition={"A document or piece of text that the model uses to form a response."}>context</DefinitionTooltip>;
const dialog = <p>The Reading Comprehension model can be used to quickly extract information from a {contextDefinition}.<br></br><br></br>Try it out by asking question about the example context to the right, or select one of the sample questions, then click Ask.</p>

let content =  <div>
    <QASection context={sample_contexts[0]} contextMode={ContextMode.LOCKED}/>
</div>

/**
 * The first step in the demo for the Reading tutorial. Explains what the context is and has the user ask a question.
 */
let step1 = new TutorialStep("Asking Questions", dialog, content)

export default step1;