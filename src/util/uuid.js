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

const uuid_generator = require("uuid-by-string");
export function generateUUID(string) {
  return uuid_generator(string);
}

export async function getIP() {
  const config = {
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  };

  return axios
    .get("https://api.ipify.org?format=json", config)
    .then((response) => response.data)
    .catch((error) => Promise.reject(_.get(error, "response.data") || error));
}

export async function getUserID() {
  // Step 1: Check if user id exists in local storage
  localStorage.clear();
  let userId = localStorage.getItem("userId");

  // Step 2: If not present, create new user id
  if (!userId) {
    // Step 2.a: Get user's IPv4 and use it as user id
    const resp = await getIP();
    userId = resp.ip;
    // Step 2.b: Save newly generated user id
    localStorage.setItem("userId", userId);
  }

  return userId;
}

getUserID();
