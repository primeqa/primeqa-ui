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
import { getUserID } from "../../util/uuid";

export const feedbacksEndpoint = () => `${BASE_URL}/feedbacks`;

/**
 *
 * @param {Array} feedbackIDs
 * @param {String} question
 * @returns
 */
export async function getFeedbacks(feedbackIDs = null) {
  const config = {
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  };

  let url = feedbacksEndpoint();
  if (!_.isNil(feedbackIDs) && !_.isEmpty(feedbackIDs)) {
    url = url + "?feedback_id=" + feedbackIDs.join("&feedback_id=");
  }

  return axios
    .get(encodeURI(url), config)
    .then((response) => response.data)
    .catch((error) => Promise.reject(_.get(error, "response.data") || error));
}

/**
 * Post feedback
 * @param {Object} feedback
 * @returns {Object} response object
 */
export async function postFeedback(feedback) {
  const config = {
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  };

  // Step 1: Add user id
  feedback.user_id = await getUserID();

  // Step 2: Trigger [POST] /feedbacks API call
  return axios
    .post(feedbacksEndpoint(), feedback, config)
    .then((response) => response.data)
    .catch((error) => Promise.reject(_.get(error, "response.data") || error));
}

/**
 *
 * @param {String} feedbackId
 * @param {Object} update
 */
export async function updateFeedback(feedbackId, update) {
  const config = {
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  };

  // Step 1: Add user id information
  update.user_id = await getUserID();
  
  // Step 2: Trigger [PATCH] /feedbacks/{feedback_id} API call
  return axios
    .patch(feedbacksEndpoint() + "/" + feedbackId, update, config)
    .then((response) => response.data)
    .catch((error) => Promise.reject(_.get(error, "response.data") || error));
}
