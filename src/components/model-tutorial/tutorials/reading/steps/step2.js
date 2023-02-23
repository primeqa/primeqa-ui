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

const trainingDefinition =  <DefinitionTooltip definition={"The process of adjusting the combination of weights and bias to minimize a loss function over the prediction range."}>training</DefinitionTooltip>;
const dialog = <p>The model can extract information from highly-specialized contexts like legal documents, technical documentation, and fantasy novels without requiring additional {trainingDefinition}. <br></br><br></br>Try selecting one of the specialized contexts from the context dropdown on the right and ask some questions.</p>


/**
 * The first step in the demo for the Reading tutorial. Explains what the context is and has the user ask a question.
 */
let diverse_contexts = new TutorialStep("Diverse contexts", dialog, <QASection contexts={sample_contexts} context={sample_contexts[1]} contextMode={ContextMode.MULTI} showAnswers={false} question={null} loading={false}/>)

export default diverse_contexts;
