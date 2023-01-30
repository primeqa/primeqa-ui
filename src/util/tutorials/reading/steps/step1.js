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
import ContextSection from "../../../../components/model-tutorial/ContextSection/ContextSection";
import { DefinitionTooltip } from "@carbon/react";
import QuestionSection from "../../../../components/model-tutorial/QuestionSection/QuestionSection";
import { TutorialStep } from "../../tutorial";
import contexts from "../../sample-contexts";

// Read in the context from a sample.
let context = new Context(contexts[0].title, contexts[0].text, 0)

// The dialog to show the user.
let dialog = <p>The Reading Comprehension model can be used to quickly extract information from a <DefinitionTooltip definition={"A context is a document or text. more explanation needed"}>context</DefinitionTooltip>. <br></br><br></br>To find some information about XYZ from the sample context, try selecting one of the provided questions or write your own in the text box, then click Ask.</p>

/**
 * The first step in the demo for the Reading tutorial. Explains what the context is and has the user ask a question.
 */
let step1 = new TutorialStep(dialog, <QuestionSection samples={contexts[0].questions} />, <ContextSection context={context}/>)

export default step1;