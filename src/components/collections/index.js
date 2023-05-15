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
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import _ from "lodash";

import { SelectSkeleton, Select, SelectItem } from "@carbon/react";

import { listCollectionsForRetriever } from "../../api/retrievers";
import { addNotification } from "../notifications/notificationsSlice";

import "./styles.scss";

function Collections({
  retriever,
  selectedCollection,
  setSelectedCollection,
  disableParent,
}) {
  const [state, setState] = useState({
    loading: false,
    retrieverId: null,
    collections: [],
    lastFetched: null,
  });

  // Redux connectivity
  const dispatch = useDispatch();

  useEffect(() => {
    async function listCollectionsIfRequired() {
      if (
        !state.loading &&
        retriever &&
        (!state.lastFetched ||
          _.isNil(state.retrieverId) ||
          retriever.retriever_id !== state.retrieverId)
      ) {
        // Step 1: Dispatch state update with loading set to true
        setState({ ...state, loading: true });

        //Step 2: Fetch collection
        try {
          // Step 2.a: Trigger [GET] /retrievers/<retrieverID>/collections API call
          const fetchedCollections = await listCollectionsForRetriever(
            retriever.retriever_id
          );

          // Step 2.b: Dispatch state update
          setState({
            ...state,
            loading: false,
            retrieverId: retriever.retriever_id,
            collections: fetchedCollections,
            lastFetched: Date.now(),
          });

          // Step 2.c: Set first collection as default selected collection
          if (fetchedCollections.length > 0) {
            setSelectedCollection(fetchedCollections[0]);
          }

          // Step 2.d: Dispatch addNotification event for list collections
          dispatch(
            addNotification({
              notification: {
                type: "Toast",
                id: "list_collections--success",
                kind: "success",
                title: "Collections loaded",
                subtitle: !_.isEmpty(fetchedCollections)
                  ? fetchedCollections.length === 1
                    ? fetchedCollections.length +
                      " collection is now available."
                    : fetchedCollections.length +
                      " collections are now available."
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
                  id: "list_collections--error",
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
                  id: "list_collections--error",
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

    listCollectionsIfRequired();
  }, [retriever, state, dispatch]);

  return (
    <React.Fragment>
      <div className="settings__item">
        {state.loading ? (
          <SelectSkeleton></SelectSkeleton>
        ) : (
          <Select
            id="select-corpus"
            labelText="Corpus"
            helperText={
              selectedCollection
                ? selectedCollection.description
                : 'Select a corpus'
            }
            value={
              selectedCollection
                ? selectedCollection.collection_id
                : "placeholder-item"
            }
            onChange={(event) => {
              setSelectedCollection(
                _.find(state.collections, {
                  collection_id: event.target.value,
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
            {state.collections.map((collection, index) => {
              return (
                <SelectItem
                  key={"collection-" + index}
                  value={collection.collection_id}
                  text={collection.name}
                />
              );
            })}
          </Select>
        )}
      </div>
    </React.Fragment>
  );
}

Collections.propTypes = {
  retriever: PropTypes.object,
  selectedCollection: PropTypes.object,
  setSelectedCollection: PropTypes.func,
  disableParent: PropTypes.func,
};

export default Collections;
