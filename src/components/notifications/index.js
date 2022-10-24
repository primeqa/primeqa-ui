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
import { useSelector, useDispatch } from "react-redux";

import {
  ToastNotification,
  ActionableNotification,
  InlineNotification,
} from "@carbon/react";

import { dismissNotification } from "./notificationsSlice";

import "./styles.scss";

function Notifications() {
  // Redux connectivity
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );
  const dispatch = useDispatch();

  return (
    <div className="notifications">
      {notifications.map((notification) => {
        if (notification.type === "Inline") {
          return (
            <InlineNotification
              key={"notification--" + notification.id}
              kind={notification.kind}
              title={notification.title}
              subtitle={notification.subtitle}
              onClose={() => {
                dispatch(dismissNotification({ id: notification.id }));
              }}
            ></InlineNotification>
          );
        } else if (notification.type === "Actionable") {
          return (
            <ActionableNotification
              key={"notification--" + notification.id}
              kind={notification.kind}
              title={notification.title}
              subtitle={notification.subtitle}
              closeOnEscape={false}
              actionButtonLabel={"Resolve"}
              onActionButtonClick={() => {
                window.open(notification.url, "_blank", "noopener,noreferrer");
              }}
              onClose={() => {
                dispatch(dismissNotification({ id: notification.id }));
              }}
            ></ActionableNotification>
          );
        } else {
          return (
            <ToastNotification
              key={"notification--" + notification.id}
              kind={notification.kind}
              title={notification.title}
              subtitle={notification.subtitle}
              timeout={notification.timeout || 5000}
              caption={notification.caption || new Date().toLocaleTimeString()}
              onClose={() => {
                dispatch(dismissNotification({ id: notification.id }));
              }}
            ></ToastNotification>
          );
        }
      })}
    </div>
  );
}

export default Notifications;
