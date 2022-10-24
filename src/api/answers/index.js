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

import axios from "axios";
import _ from "lodash";

import { BASE_URL } from "../config";

/**
 * Trigger [POST] /GetAnswersRequest API
 * @param {String} question
 * @param {Object} context
 * @param {Object} reader
 * @returns {Object} list of answers
 */
export async function getAnswers(question, context, reader) {
  const config = {
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  };

  let url = `${BASE_URL}/GetAnswersRequest`;
  let data = {
    question: question,
    contexts: [context],
    reader: reader,
  };

  return axios
    .post(url, data, config)
    .then((response) => response.data)
    .catch((error) => Promise.reject(_.get(error, "response.data") || error));
}
