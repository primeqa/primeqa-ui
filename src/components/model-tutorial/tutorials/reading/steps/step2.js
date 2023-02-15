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

const trainingDefinition =  <DefinitionTooltip definition={"Training is...."}>training</DefinitionTooltip>;

const dialog = <p>The Reading Comprehension model works across a multitude of context types without requiring additional {trainingDefinition}.<br></br><br></br> The model can evem extract information from highly-specialized contexts like legal documents, technical documentation, and fantasy novels out of the box. Try selecting a new context from the dropdown on the right and try it out.</p>


/**
 * The first step in the demo for the Reading tutorial. Explains what the context is and has the user ask a question.
 */
let diverse_contexts = new TutorialStep("Diverse contexts", dialog, <QASection contexts={sample_contexts} context={sample_contexts[1]} contextMode={ContextMode.MULTI} showAnswers={false} question={null} loading={false}/>)

export default diverse_contexts;
