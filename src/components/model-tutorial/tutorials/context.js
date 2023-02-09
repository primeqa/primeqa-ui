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

/**
 * A piece of text to be used with a model.
 */
class Context{
    /**
     * 
     * @param {number} id The ID of the context
     * @param {string} title The title describing the context
     * @param {string} text The body of the context
     * @param {[string]} questions A list of sample questions that can be asked about the context
     */
    constructor(id, title, text, questions){
        this.title = title;
        this.text = text;
        this.id = id;
        this.questions = questions;
    }
}

export default Context;
