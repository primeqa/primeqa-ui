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

import { BASE_URL } from "../config";
import _ from "lodash";
import axios from "axios";

/**
 * Trigger [POST] /ask API
 * @param {String} question
 * @param {Object} retriever
 * @param {Object} collection
 * @param {Object} reader
 * @param {Object} model
 * @returns {Object} move response object
 */
export async function askQuestion(question, retriever, collection, reader) {
  const config = {
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  };

  let url = `${BASE_URL}/ask`;

  // Configure mandatory data object
  let data = {
    question: question,
    retriever: retriever,
    collection: collection,
    reader: reader,
  };

  return axios
    .post(url, data, config)
    .then((response) => response.data)
    .catch((error) => Promise.reject(_.get(error, "response.data") || error));
}

/**
 * @param {String} question
 * @param {[String]} contexts
 */
export async function demo_ask(question, contexts) {
  const config = {
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  };

  let url = "http://9.59.151.58:50059/applications/primeqa/GetAnswersRequest";

  let data = {
    question: question,
    contexts: contexts,
    reader: {
      "reader_id": "ExtractiveReader",
      "parameters": [
        {
          "parameter_id": "model",
          "name": "Model",
          "description": "",
          "type": "String",
          "value": "PrimeQA/nq_tydi_sq1-reader-xlmr_large-20221110",
          "options": [],
          "range": []
        },
        {
          "parameter_id": "max_num_answers",
          "name": "Maximum number of answers",
          "description": "",
          "type": "Numeric",
          "value": 3,
          "options": [],
          "range": [
            1,
            5,
            1
          ]
        },
        {
          "parameter_id": "max_answer_length",
          "name": "Maximum answer length",
          "description": "",
          "type": "Numeric",
          "value": 1000,
          "options": [],
          "range": [
            2,
            2000,
            2
          ]
        },
        {
          "parameter_id": "min_score_threshold",
          "name": "Minimum score threshold",
          "description": "",
          "type": "Numeric",
          "value": null,
          "options": [],
          "range": []
        }
      ],
      "provenance":null
    }
  };

  return axios
    .post(url, data, config)
    .then((response) => response.data)
    .catch((error) => Promise.reject(_.get(error, "response.data") || error));
}
