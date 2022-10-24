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
import _ from "lodash";

export const retrieversSlice = createSlice({
  name: "retrievers",
  initialState: {
    retrievers: [],
    selectedRetriever: null,
    loading: false,
    lastFetched: null,
  },
  reducers: {
    loadRetrieversStart: (state) => {
      state.loading = true;
    },
    loadRetrieversSuccess: (state, action) => {
      state.retrievers = action.payload.retrievers;
      state.lastFetched = action.payload.fetched;
      state.loading = false;
    },
    selectRetriever: (state, action) => {
      state.selectedRetriever = _.find(state.retrievers, {
        retriever_id: action.payload.retriever_id,
      });
    },
    unselectRetriever: (state) => {
      state.selectedRetriever = null;
    },
    updateParameterValue: (state, action) => {
      state.selectedRetriever.parameters =
        state.selectedRetriever.parameters.map((parameter) => {
          if (parameter.parameter_id === action.payload.parameter_id) {
            return { ...parameter, value: action.payload.value };
          } else {
            return parameter;
          }
        });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loadRetrieversStart,
  loadRetrieversSuccess,
  selectRetriever,
  unselectRetriever,
  updateParameterValue,
} = retrieversSlice.actions;

export default retrieversSlice.reducer;
