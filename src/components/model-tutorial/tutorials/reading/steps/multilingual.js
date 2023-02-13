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
import { TutorialStep } from "../../tutorial";
import {sample_multilingual_contexts} from "../../sample-contexts";

const dialog = <p>The Reading Comprehension model has built-in multi-language support. Without requiring  additional training, the model can ask intelligently can return answers from a context that is in a different language from the question. To try this out, try asking some of the questions on this context. You can toggle the language of questions to try this out.</p>

var contexts = []
for (const c in sample_multilingual_contexts) {
    console.log(c)
    let newContext = new Context(c, sample_multilingual_contexts[c].title, sample_multilingual_contexts[c].text, sample_multilingual_contexts[c].questions)
    contexts.push(newContext);
}
console.log(contexts);

let content =  <QASection contexts={contexts} context={contexts[0]} contextMode={ContextMode.MULTI}/>;

/**
 * The first step in the demo for the Reading tutorial. Explains what the context is and has the user ask a question.
 */
let multilingualStep = new TutorialStep("Multi-Lingual Suppport", dialog, content)

export default multilingualStep;
