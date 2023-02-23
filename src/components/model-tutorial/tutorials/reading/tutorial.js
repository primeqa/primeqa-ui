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

import { Tutorial } from "../tutorial"
import diverse_contexts from "./steps/step2";
import infoStep from "./steps/info";
import lastStep from "./steps/lastStep";
import multilingualStep from "./steps/multilingual";
import step1 from "./steps/step1";

// Steps of the Reading tutorial


/**
 * Information and tutorial for the Reading comprehension model
 */
class ReadingTutorial extends Tutorial{
    constructor(enabled){
        super("Reading Comprehension", "Reading", [infoStep, step1, diverse_contexts, multilingualStep, lastStep], enabled)
    }
}

export default ReadingTutorial;