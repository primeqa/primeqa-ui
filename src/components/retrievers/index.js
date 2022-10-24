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

import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import {
  SelectSkeleton,
  Select,
  SelectItem,
  Toggle,
  Slider,
  TextInput,
} from "@carbon/react";

import * as retrieversAPI from "../../api/retrievers";
import {
  loadRetrieversStart,
  loadRetrieversSuccess,
  selectRetriever,
  updateParameterValue,
} from "./retrieversSlice";
import { addNotification } from "../notifications/notificationsSlice";
import { DEFAULT_CACHE } from "../../store/config";

import "./styles.scss";

function Retrievers({ disableParent }) {
  // Redux connectivity
  const retrievers = useSelector((state) => state.retrievers);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadRetrieversIfRequired() {
      if (
        !retrievers.loading &&
        (!retrievers.lastFetched ||
          Date.now() - retrievers.lastFetched > DEFAULT_CACHE)
      ) {
        // Step 1: Dispatch listRetrieversStart event
        dispatch(loadRetrieversStart());

        //Step 2: Fetch retrievers
        try {
          // Step 2.a: Trigger [GET] /retrievers API call
          const fetchedRetrievers = await retrieversAPI.listRetrievers();

          // Step 2.b: Dispatch listRetrieversSuccess event
          dispatch(
            loadRetrieversSuccess({
              retrievers: fetchedRetrievers,
              fetched: Date.now(),
            })
          );

          // Step 2.c: Dispatch addNotification event for list retrievers
          dispatch(
            addNotification({
              notification: {
                type: "Toast",
                id: "list_retrievers--success",
                kind: "success",
                title: "Retrievers loaded",
                subtitle: !_.isEmpty(fetchedRetrievers)
                  ? fetchedRetrievers.length === 1
                    ? fetchedRetrievers.length + " retriever is now available."
                    : fetchedRetrievers.length +
                      " retrievers are now available."
                  : null,
                caption: new Date().toLocaleTimeString(),
                timeout: 1500,
              },
            })
          );
        } catch (err) {
          // Step 1: Trigger appropriate add error notification event
          if (Object.hasOwn(err, "name") && err.name === "AxiosError") {
            dispatch(
              addNotification({
                notification: {
                  id: "list_retrievers--error",
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
                  id: "list_retrievers--error",
                  type: "Toast",
                  kind: "error",
                  title: err.detail.code + " : " + err.detail.message,
                  subtitle: "Refer: contact us in README.",
                },
              })
            );
          }

          // Step 2: Disable parent
          disableParent(true);
        }
      }
    }

    loadRetrieversIfRequired();
  }, [retrievers, disableParent, dispatch]);

  // Set first retriever as default selected retriever
  useEffect(() => {
    // Dispatch selectRetriever event
    if (retrievers.retrievers.length > 0) {
      dispatch(
        selectRetriever({ retriever_id: retrievers.retrievers[0].retriever_id })
      );
    }
  }, [retrievers.retrievers, dispatch]);

  return (
    <React.Fragment>
      <div className="settings__item">
        {retrievers.loading || !retrievers.selectedRetriever ? (
          <SelectSkeleton></SelectSkeleton>
        ) : (
          <Select
            id="select-retriever"
            labelText="Retriever"
            helperText="Select a retriever"
            defaultValue={
              retrievers.selectedRetriever &&
              retrievers.selectedRetriever.retriever_id
                ? retrievers.selectedRetriever.retriever_id
                : "placeholder-item"
            }
            onChange={(event) => {
              dispatch(selectRetriever({ retriever_id: event.target.value }));
            }}
          >
            <SelectItem
              disabled
              hidden
              value="placeholder-item"
              text="Choose an option"
            />
            {retrievers.retrievers.map((retriever, index) => {
              return (
                <SelectItem
                  key={"retriever-" + index}
                  value={retriever.retriever_id}
                  text={retriever.name || retriever.retriever_id}
                />
              );
            })}
          </Select>
        )}
      </div>
      {retrievers.selectedRetriever &&
      !_.isEmpty(retrievers.selectedRetriever.parameters) ? (
        <div className="settings__item">
          <h5>Retriever Settings</h5>
          {retrievers.selectedRetriever.parameters.map((parameter, index) => {
            if (parameter.type === "Boolean") {
              return (
                <div
                  key={"retriever_parameter" + index}
                  className="retriever_parameter"
                >
                  <Toggle
                    labelText={parameter.name}
                    labelA="Off"
                    labelB="On"
                    defaultToggled={Boolean(parameter.value)}
                    id={"parameter-" + parameter.parameter_id}
                    onToggle={(status) => {
                      dispatch(
                        updateParameterValue({
                          parameter_id: parameter.parameter_id,
                          value: status,
                        })
                      );
                    }}
                  />
                </div>
              );
            } else if (parameter.type === "Numeric") {
              if (_.isEmpty(parameter.range)) {
                return (
                  <div
                    key={"retriever_parameter" + index}
                    className="retriever_parameter"
                  >
                    <TextInput
                      id={"parameter-" + parameter.parameter_id}
                      labelText={parameter.name}
                      value={parameter.value || "Optional"}
                      onChange={(target) => {
                        dispatch(
                          updateParameterValue({
                            parameter_id: parameter.parameter_id,
                            value: target.value,
                          })
                        );
                      }}
                    ></TextInput>
                  </div>
                );
              } else {
                return (
                  <div
                    key={"retriever_parameter" + index}
                    className="retriever_parameter"
                  >
                    <Slider
                      id={"parameter-" + parameter.parameter_id}
                      labelText={parameter.name}
                      value={parameter.value}
                      min={parameter.range[0]}
                      max={parameter.range[1]}
                      step={parameter.range[2]}
                      onChange={(target) => {
                        dispatch(
                          updateParameterValue({
                            parameter_id: parameter.parameter_id,
                            value: target.value,
                          })
                        );
                      }}
                    />
                  </div>
                );
              }
            } else if (parameter.type === "String") {
              return (
                <div
                  key={"retriever_parameter" + index}
                  className="retriever_parameter"
                >
                  {!_.isNil(parameter.range) && !_.isEmpty(parameter.range) ? (
                    <Select
                      id={"parameter-" + parameter.parameter_id}
                      labelText={parameter.name}
                      defaultValue={parameter.value}
                      onChange={(event) => {
                        dispatch(
                          updateParameterValue({
                            parameter_id: parameter.parameter_id,
                            value: event.target.value,
                          })
                        );
                      }}
                    >
                      {parameter.range.map((value, index) => {
                        return (
                          <SelectItem
                            key={
                              "parameter-" +
                              parameter.parameter_id +
                              "-value-" +
                              index
                            }
                            value={value}
                            text={value}
                          />
                        );
                      })}
                    </Select>
                  ) : (
                    <TextInput
                      id={"parameter-" + parameter.parameter_id}
                      labelText={parameter.name}
                      defaultValue={parameter.value}
                      onChange={(event) => {
                        dispatch(
                          updateParameterValue({
                            parameter_id: parameter.parameter_id,
                            value: event.target.value,
                          })
                        );
                      }}
                    ></TextInput>
                  )}
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      ) : null}
      :
    </React.Fragment>
  );
}

Retrievers.propTypes = {
  disableParent: PropTypes.func,
};

export default Retrievers;
