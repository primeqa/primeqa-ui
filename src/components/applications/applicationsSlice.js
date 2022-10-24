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

export const applicationsSlice = createSlice({
  name: "applications",
  initialState: {
    applications: [],
    loading: false,
    lastFetched: null,
  },
  reducers: {
    listApplicationsStart: (state) => {
      state.loading = true;
    },
    listApplicationsSuccess: (state, action) => {
      state.applications = action.payload.applications;
      state.lastFetched = action.payload.fetched;
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { listApplicationsStart, listApplicationsSuccess } =
  applicationsSlice.actions;

export default applicationsSlice.reducer;
