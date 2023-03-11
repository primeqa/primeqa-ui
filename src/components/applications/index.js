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

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import { Search, Book, SearchLocate, Application } from "@carbon/react/icons";

import { 
  DESCRIPTION_RETRIEVAL, 
  DESCRIPTION_READING, 
  DESCRIPTION_QA, 
} from "../../api/config";

import HeaderContent from "../header/index";
import Notifications from "../notifications";
import Navigation from "../navigation";
import ApplicationCard from "../application-card/index";

import * as settingsAPI from "../../api/settings";
import {
  listApplicationsStart,
  listApplicationsSuccess,
} from "./applicationsSlice";
import { addNotification } from "../notifications/notificationsSlice";

import "./styles.scss";

export async function listApplicationsIfRequired(applications, dispatch) {
  if (!applications.loading && !applications.lastFetched) {
    //Step 1: Fetch applications
    try {
      // Step 1: Dispatch listApplicationsStart event
      dispatch(listApplicationsStart());

      // Step 2: Trigger [GET] /settings API call
      const settings = await settingsAPI.getSettings();

      // Step 3: Load default applications
      const fetchedApplications = [
        {
          applicationId: "retrieval",
          name: "Retrieval",
          description:
            DESCRIPTION_RETRIEVAL || "Search a document collection using dense and sparse information retrieval techniques",
          githubLink: "https://github.com/primeqa/primeqa",
          feedbackLink: "https://github.com/primeqa/primeqa/issues/new",
          settings: settings,
        },
        {
          applicationId: "reading",
          name: "Reading",
          description:
            DESCRIPTION_READING || "Find answer to questions based on a given context",
          githubLink: "https://github.com/primeqa/primeqa",
          feedbackLink: "https://github.com/primeqa/primeqa/issues/new",
          settings: settings,
        },
        {
          applicationId: "qa",
          name: "Question Answering",
          description:
            DESCRIPTION_QA || "Find answers to question from retrieved evidence blocks",
          githubLink: "https://github.com/primeqa/primeqa",
          feedbackLink: "https://github.com/primeqa/primeqa/issues/new",
          settings: settings,
        },
      ];

      // Step 4: Dispatch listApplicationsSuccess event
      dispatch(
        listApplicationsSuccess({
          applications: fetchedApplications,
          fetched: Date.now(),
        })
      );

      // Step 5: Dispatch addNotification event for list applications
      dispatch(
        addNotification({
          notification: {
            type: "Toast",
            id: "list_applications--success",
            kind: "success",
            title: "Applications loaded",
            subtitle: !_.isEmpty(fetchedApplications)
              ? fetchedApplications.length === 1
                ? fetchedApplications.length + " application is now available."
                : fetchedApplications.length +
                  " applications are now available."
              : null,
            caption: new Date().toLocaleTimeString(),
            timeout: 1500,
          },
        })
      );
    } catch (err) {
      if (Object.hasOwn(err, "name") && err.name === "AxiosError") {
        dispatch(
          addNotification({
            notification: {
              id: "list_applications--error",
              type: "Toast",
              kind: "error",
              title: err.name + " : " + err.message,
              subtitle: "Refer: contact us in README.",
            },
          })
        );
      } else {
        dispatch(
          addNotification({
            notification: {
              id: "list_applications--error",
              type: "Toast",
              kind: "error",
              title: err.detail.code + " : " + err.detail.message,
              subtitle: "Refer: contact us in README.",
            },
          })
        );
      }
    }
  }
}

function Applications() {
  // Redux connectivity
  const applications = useSelector((state) => state.applications);
  const dispatch = useDispatch();

  // Trigger listApplicationsIfRequired effect
  useEffect(() => {
    listApplicationsIfRequired(applications, dispatch);
  });

  return (
    <React.Fragment>
      <HeaderContent />
      <Notifications />
      <div id="main-content" className="cds--content">
        <Navigation
          applications={applications.applications}
          active_application="home"
        ></Navigation>
        <img
          src={process.env.PUBLIC_URL + "/logo192.png"}
          alt="primeqa"
          className="center"
        />
        <div className="applications">
          {!_.isEmpty(applications.applications)
            ? applications.applications.map((application, index) => {
                return (
                  <ApplicationCard
                    application={application}
                    renderIcon={
                      application.applicationId === "retrieval"
                        ? Search
                        : application.applicationId === "reading"
                        ? Book
                        : application.applicationId === "qa"
                        ? SearchLocate
                        : Application
                    }
                    key={"application-" + index}
                  ></ApplicationCard>
                );
              })
            : null}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Applications;
