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

import Context from "../../context";
import { ContextMode } from "../../../../qa-section/ContextSection/ContextSection";
import { DefinitionTooltip } from "@carbon/react";
import QASection from "../../../../qa-section";
import QASectionTest from "../../../../qa-section/MultiSelectContext";
import { TutorialStep } from "../../tutorial";
import {sample_contexts} from "../../sample-contexts";

const trainingDefinition =  <DefinitionTooltip definition={"Training is...."}>training</DefinitionTooltip>;

const dialog = <p>The Reading Comprehension model works across a diverse range of contexts without requiring additional {trainingDefinition}.<br></br><br></br> Try selecting a different context from the dropdown above the context text and ask some questions about it.</p>

var contexts = []
for (const c in sample_contexts) {
    console.log(c)
    let newContext = new Context(c, sample_contexts[c].title, sample_contexts[c].text, sample_contexts[c].questions)
    contexts.push(newContext);
}
console.log(contexts);
/**
 * The first step in the demo for the Reading tutorial. Explains what the context is and has the user ask a question.
 */
let diverse_contexts = new TutorialStep("Diverse contexts", dialog, <QASection contexts={contexts} context={contexts[0]} contextMode={ContextMode.MULTI} showAnswers={false} question={null} loading={false}/>)

export default diverse_contexts;
