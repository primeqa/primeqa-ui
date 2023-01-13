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
import PropTypes from "prop-types";
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

import * as readersAPI from "../../api/readers";
import {
  loadReadersStart,
  loadReadersSuccess,
  selectReader,
  updateParameterValue,
} from "./readersSlice";
import { addNotification } from "../notifications/notificationsSlice";

import "./styles.scss";

function Readers({ disableParent }) {
  // Redux connectivity
  const readers = useSelector((state) => state.readers);
  const dispatch = useDispatch();

  // Load readers
  useEffect(() => {
    async function loadReadersIfRequired() {
      if (!readers.loading && !readers.lastFetched) {
        // Step 1: Dispatch listReadersStart event
        dispatch(loadReadersStart());

        //Step 2: Fetch readers
        try {
          // Step 2.a: Trigger [GET] /readers API call
          const fetchedReaders = await readersAPI.listReaders();

          // Step 2.b: Dispatch listReadersSuccess event
          dispatch(
            loadReadersSuccess({ readers: fetchedReaders, fetched: Date.now() })
          );

          // Step 2.c: Dispatch addNotification event for list readers
          dispatch(
            addNotification({
              notification: {
                type: "Toast",
                id: "list_readers--success",
                kind: "success",
                title: "Reader loaded",
                subtitle: !_.isEmpty(fetchedReaders)
                  ? fetchedReaders.length === 1
                    ? fetchedReaders.length + " reader is now available."
                    : fetchedReaders.length + " readers are now available."
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
                  id: "list_readers--error",
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
                  id: "list_readers--error",
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

    // On mount
    loadReadersIfRequired();
  }, [readers, disableParent, dispatch]);

  // Set first reader as default selected reader
  useEffect(() => {
    // Dispatch selectReader event
    if (readers.readers.length > 0) {
      dispatch(selectReader({ reader_id: readers.readers[0].reader_id }));
    }
  }, [readers.readers, dispatch]);

  return (
    <React.Fragment>
      <div className="settings__item">
        {readers.loading || !readers.selectedReader ? (
          <SelectSkeleton></SelectSkeleton>
        ) : (
          <Select
            id="select-reader"
            labelText="Reader"
            helperText="Select a reader"
            value={
              readers.selectedReader && readers.selectedReader.reader_id
                ? readers.selectedReader.reader_id
                : "placeholder-item"
            }
            onChange={(event) => {
              dispatch(selectReader({ reader_id: event.target.value }));
            }}
          >
            <SelectItem
              disabled
              hidden
              value="placeholder-item"
              text="Choose an option"
            />
            {readers.readers.map((reader, index) => {
              return (
                <SelectItem
                  key={"reader-" + index}
                  value={reader.reader_id}
                  text={reader.name || reader.reader_id}
                />
              );
            })}
          </Select>
        )}
      </div>
      {readers.selectedReader &&
      !_.isEmpty(readers.selectedReader.parameters) ? (
        <div className="settings__item">
          <h5>Reader Settings</h5>
          {readers.selectedReader.parameters.map((parameter, index) => {
            if (parameter.type === "Boolean") {
              return (
                <div
                  key={"reader_parameter" + index}
                  className="reader_parameter"
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
              return (
                <div
                  key={"reader_parameter" + index}
                  className="reader_parameter"
                >
                  {!_.isNil(parameter.range) && !_.isEmpty(parameter.range) ? (
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
                  ) : !_.isNil(parameter.options) &&
                    !_.isEmpty(parameter.options) ? (
                    <Select
                      id={"parameter-" + parameter.parameter_id}
                      labelText={parameter.name}
                      value={parameter.value || "placeholder-item"}
                      onChange={(event) => {
                        dispatch(
                          updateParameterValue({
                            parameter_id: parameter.parameter_id,
                            value: event.target.value,
                          })
                        );
                      }}
                    >
                      <SelectItem
                        disabled
                        hidden
                        value="placeholder-item"
                        text="Choose an option"
                      />
                      {parameter.options.map((option, index) => {
                        return (
                          <SelectItem
                            key={
                              "parameter-" +
                              parameter.parameter_id +
                              "__option-" +
                              index
                            }
                            value={option}
                            text={option}
                          />
                        );
                      })}
                    </Select>
                  ) : (
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
                  )}
                </div>
              );
            } else if (parameter.type === "String") {
              return (
                <div
                  key={"reader_parameter" + index}
                  className="reader_parameter"
                >
                  {!_.isNil(parameter.options) &&
                  !_.isEmpty(parameter.options) ? (
                    <Select
                      id={"parameter-" + parameter.parameter_id}
                      labelText={parameter.name}
                      value={parameter.value || "placeholder-item"}
                      onChange={(event) => {
                        dispatch(
                          updateParameterValue({
                            parameter_id: parameter.parameter_id,
                            value: event.target.value,
                          })
                        );
                      }}
                    >
                      <SelectItem
                        disabled
                        hidden
                        value="placeholder-item"
                        text="Choose an option"
                      />
                      {parameter.options.map((value, index) => {
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

Readers.propTypes = {
  disableParent: PropTypes.func,
};

export default Readers;
