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

import { createSlice } from "@reduxjs/toolkit";

export const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applicationId: null,
    name: null,
    description: null,
    githubLink: null,
    feedbackLink: null,
    settings: null,
    lastFetched: null,
  },
  reducers: {
    loadApplication: (state, action) => {
      state.applicationId =
        action.payload.applicationId || action.payload.application_id;
      state.name = action.payload.name;
      state.description = action.payload.description || null;
      state.githubLink = action.payload.githubLink || null;
      state.feedbackLink = action.payload.feedbackLink || null;
      state.githubLink = action.payload.githubLink || null;
      state.settings = action.payload.settings || null;
      state.lastFetched = action.payload.fetched;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadApplication } = applicationSlice.actions;

export default applicationSlice.reducer;
