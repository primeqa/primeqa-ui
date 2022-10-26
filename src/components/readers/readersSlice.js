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

export const readersSlice = createSlice({
  name: "readers",
  initialState: {
    readers: [],
    selectedReader: null,
    loading: false,
    lastFetched: null,
  },
  reducers: {
    loadReadersStart: (state) => {
      state.loading = true;
    },
    loadReadersSuccess: (state, action) => {
      state.readers = action.payload.readers;
      state.lastFetched = action.payload.fetched;
      state.loading = false;
    },
    selectReader: (state, action) => {
      state.selectedReader = _.find(state.readers, {
        reader_id: action.payload.reader_id,
      });
    },
    unselectReader: (state) => {
      state.selectedReader = null;
    },
    updateParameterValue: (state, action) => {
      state.selectedReader.parameters = state.selectedReader.parameters.map(
        (parameter) => {
          if (parameter.parameter_id === action.payload.parameter_id) {
            return { ...parameter, value: action.payload.value };
          } else {
            return parameter;
          }
        }
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loadReadersStart,
  loadReadersSuccess,
  selectReader,
  unselectReader,
  updateParameterValue,
} = readersSlice.actions;

export default readersSlice.reducer;
