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

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import _ from "lodash";

import { Button, SkeletonText } from "@carbon/react";
import { LogoGithub, PhraseSentiment, Settings } from "@carbon/react/icons";

import HeaderContent from "../header/index";
import Notifications from "../notifications";
import Navigation from "../navigation";
import Retrieval from "../../applications/retrieval";
import Reading from "../../applications/reading";
import QuestionAnswering from "../../applications/qa";

import { listApplicationsIfRequired } from "../../components/applications";
import { loadApplication } from "./applicationSlice";
import { addNotification } from "../notifications/notificationsSlice";

import "./styles.scss";

const strings = {
  GITHUB: "Github",
  SEND_FEEDBACK: "Send us feedback",
  SETTINGS: "Application settings",
};

/**
 *
 * @param {string} applicationId
 * @param {object} loadedApplication
 * @param {Array<object>} loadedApplications
 * @param {object} dispatch
 */
export async function loadApplicationIfRequired(
  applicationId,
  loadedApplication,
  loadedApplications,
  dispatch
) {
  try {
    let applicationToLoad = null;
    // Step 1: Check if application exists, if not try to load from currently loaded applications
    if (
      !loadedApplication ||
      !loadedApplication.applicationId ||
      loadedApplication.applicationId !== applicationId
    ) {
      applicationToLoad = _.find(loadedApplications.applications, {
        applicationId: applicationId,
      });
    }

    // Step 2: If application exists
    if (applicationToLoad) {
      // Step 2.a: Dispatch addNotification event for load application
      dispatch(
        addNotification({
          notification: {
            type: "Toast",
            id: "load_application--success",
            kind: "success",
            title: "Application loaded",
            subtitle: applicationToLoad.name + " is now available.",
            caption: new Date().toLocaleTimeString(),
            timeout: 1500,
          },
        })
      );

      // Step 2.b: Dispatch loadApplication event
      dispatch(loadApplication({ ...applicationToLoad, fetched: Date.now() }));
    }
  } catch (err) {
    if (Object.hasOwn(err, "name") && err.name === "AxiosError") {
      dispatch(
        addNotification({
          notification: {
            id: "load_application--error",
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
            id: "load_application--error",
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

function Application() {
  const [showSettings, setShowSettings] = useState(true);

  // Router variables
  const params = useParams();

  // Redux connectivity
  const applications = useSelector((state) => state.applications);
  const application = useSelector((state) => state.application);
  const dispatch = useDispatch();

  // Trigger loadApplicationsIfRequired effect
  useEffect(() => {
    listApplicationsIfRequired(applications, dispatch);
  }, [applications, dispatch]);

  // Trigger loadApplicationIfRequired effect
  useEffect(() => {
    loadApplicationIfRequired(
      params.applicationID,
      application,
      applications,
      dispatch
    );
  }, [params.applicationID, application, applications, dispatch]);

  return (
    <React.Fragment>
      <HeaderContent />
      <div id="main-content" className="container__content">
        <Navigation
          applications={applications.applications}
          active_application={params.applicationID}
        ></Navigation>
        <div className="container__application">
          <div className="container__application__header">
            {!application || !application.name ? (
              <SkeletonText heading={true} />
            ) : (
              <h4>{application.name}</h4>
            )}
            <div className="container__application__tools">
              <Button
                hasIconOnly
                renderIcon={(props) => <LogoGithub size={24} {...props} />}
                href={application.githubLink}
                tooltipAlignment="center"
                tooltipPosition="bottom"
                iconDescription={strings.GITHUB}
                kind="ghost"
              />
              <Button
                hasIconOnly
                renderIcon={(props) => <PhraseSentiment size={24} {...props} />}
                href={application.feedbackLink}
                tooltipAlignment="center"
                tooltipPosition="bottom"
                iconDescription={strings.SEND_FEEDBACK}
                kind="ghost"
              />
              <div className="container__application__tools-divider"></div>
              <Button
                hasIconOnly
                renderIcon={(props) => <Settings size={24} {...props} />}
                tooltipAlignment="end"
                tooltipPosition="bottom"
                iconDescription={strings.SETTINGS}
                kind="ghost"
                onClick={() => {
                  setShowSettings(!showSettings);
                }}
              />
            </div>
          </div>
          <Notifications></Notifications>
          {application.applicationId === "retrieval" ? (
            <Retrieval
              application={application}
              showSettings={showSettings}
            ></Retrieval>
          ) : application.applicationId === "reading" ? (
            <Reading
              application={application}
              showSettings={showSettings}
            ></Reading>
          ) : application.applicationId === "qa" ? (
            <QuestionAnswering
              application={application}
              showSettings={showSettings}
            ></QuestionAnswering>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Application;
