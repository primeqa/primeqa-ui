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

import { configureStore } from "@reduxjs/toolkit";

import notificationsReducer from "../components/notifications/notificationsSlice";
import applicationsReducer from "../components/applications/applicationsSlice";
import applicationReducer from "../components/application/applicationSlice";
import retrieversReducer from "../components/retrievers/retrieversSlice";
import readersReducer from "../components/readers/readersSlice";

export default configureStore({
  reducer: {
    notifications: notificationsReducer,
    applications: applicationsReducer,
    application: applicationReducer,
    retrievers: retrieversReducer,
    readers: readersReducer,
  },
});
