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

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? window.env.API_URL
    : process.env.REACT_APP_API_URL;

export const READING_PLAYROUND_URL = process.env.NODE_ENV === "production"
? window.env.READING_PLAYROUND_URL
: process.env.REACT_APP_READING_PLAYROUND_URL;

export const RETRIEVAL_PLAYGROUND_URL = process.env.NODE_ENV === "production"
? window.env.RETRIEVAL_PLAYGROUND_URL
: process.env.REACT_APP_RETRIEVAL_PLAYGROUND_URL;

export const QA_PLAYGROUND_URL = process.env.NODE_ENV === "production"
? window.env.REACT_APP_QA_PLAYGROUND_URL
: process.env.REACT_APP_QA_PLAYGROUND_URL;