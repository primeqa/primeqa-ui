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

import React from "react";
import { Routes, Route } from "react-router-dom";
import Application from "./components/application";
import Applications from "./components/applications";

import "./scss/styles.scss";


function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Applications />} />
      <Route exact path="/:applicationID" element={<Application />} />
    </Routes>
  );
}

export default App;
