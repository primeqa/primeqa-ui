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

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import React from "react";
import { Theme } from "@carbon/react";
import { createRoot } from "react-dom/client";
import store from "./store/index";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <IntlProvider locale="en" defaultLocale="en">
    <Provider store={store}>
      <BrowserRouter>
        <Theme theme={"g10"}>
          <App />
        </Theme>
      </BrowserRouter>
    </Provider>
  </IntlProvider>
);
