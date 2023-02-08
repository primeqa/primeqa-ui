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

import { Context } from "../../context";
import { DefinitionTooltip } from "@carbon/react";
import QASection from "../../../../components/qa-section";
import { TutorialStep } from "../../tutorial";
import contexts from "../../sample-contexts";

// Read in the context from a sample.
let context = new Context(contexts[0].title, contexts[0].text, 0)


const dialog = <p>The same Reading Comprehension model works across a broad range of contexts without requiring extra training.<br></br> Try selecting one of the following contexts to explore.</p>

/**
 * The first step in the demo for the Reading tutorial. Explains what the context is and has the user ask a question.
 */
let diverse_contexts = new TutorialStep("Diverse contexts", dialog, <QASection context={contexts[0]}/>)

export default diverse_contexts;
