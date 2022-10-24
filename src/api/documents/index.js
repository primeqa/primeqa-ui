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
 * Trigger [POST] /GetDocumentsRequest API
 * @param {String} question
 * @param {Object} retriever
 * @param {Object} collection
 * @param {Object} reader
 * @returns {Object} list of documents
 */
export async function getDocuments(question, retriever, collection) {
  const config = {
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  };

  let url = `${BASE_URL}/GetDocumentsRequest`;
  let data = {
    question: question,
    retriever: retriever,
    collection: collection,
  };

  return axios
    .post(url, data, config)
    .then((response) => response.data)
    .catch((error) => Promise.reject(_.get(error, "response.data") || error));
}
