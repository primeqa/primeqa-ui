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
import QASection from "../../../../qa-section";
import { TutorialStep } from "../../tutorial";
import {sample_multilingual_contexts} from "../../sample-contexts";

// const selectLanguageDropdown
const dialog = <p>Without requiring  additional training, the model can intelligently can return answers from a context that is in a different language from the question.<br></br><br></br>Try asking questions in a language of your choice, or select one of the pre-populated questions.</p>

let content =  <div>
    <QASection contexts={sample_multilingual_contexts} context={sample_multilingual_contexts[0]} contextMode={ContextMode.MULTI}/>
</div>

/**
 * The first step in the demo for the Reading tutorial. Explains what the context is and has the user ask a question.
 */
let multilingualStep = new TutorialStep("Multilingual Capabilities", dialog, content)

export default multilingualStep;
