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
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";

import { Button, SkeletonText } from "@carbon/react";
import {
  ThumbsUp,
  ThumbsUpFilled,
  ThumbsDown,
  ThumbsDownFilled,
} from "@carbon/react/icons";

import "./styles.scss";

function Documents({ question, documents, loading, source }) {
  const [documentsWithFeedback, setDocumentsWithFeedback] = useState([]);

  // Redux connectivity
  const dispatch = useDispatch();

  useEffect(() => {
    if (_.isNil(documents) || _.isEmpty(documents)) {
      setDocumentsWithFeedback([]);
    } else {
      setDocumentsWithFeedback(
        documents.map((document) => {
          return {
            ...document,
            feedback: { thumbs_up: false, thumbs_down: false },
          };
        })
      );
    }
  }, [question, documents, dispatch]);

  return (
    <React.Fragment>
      {!loading && !_.isEmpty(documentsWithFeedback) ? (
        <React.Fragment>
          <div className="documents--details">
            <h6>{documentsWithFeedback.length} documents from articles</h6>
          </div>
          <div className="documents--items">
            {documentsWithFeedback.map((documentWithFeedback, index) => {
              return (
                <div
                  id={"answer--item-" + index}
                  key={"answer--item-" + index}
                  className="documents--item"
                >
                  {documentWithFeedback.title ? (
                    <h6>Title: {documentWithFeedback.title}</h6>
                  ) : (
                    <h6>Title: {"Document " + index}</h6>
                  )}

                  <div className="documents--item__content">
                    <div className="documents--item__content--left">
                      <div className="documents--item__content__text">
                        <h6>Text:</h6>
                        <span>{documentWithFeedback.text}</span>
                      </div>
                    </div>
                    <div className="documents--item__content--right">
                      {!_.isNil(documentWithFeedback.score) ? (
                        <div className="documents--item__score">
                          Score:
                          <span>
                            {documentWithFeedback.score.toLocaleString(
                              "en-US",
                              {
                                maximumFractionDigits: 2,
                                minimumFractionDigits: 2,
                              }
                            )}
                          </span>
                        </div>
                      ) : null}
                      <div className="documents--item__feedback">
                        Was this document useful?
                        <Button
                          kind="ghost"
                          renderIcon={
                            !_.isNil(documentWithFeedback.feedback.thumbs_up) &&
                            documentWithFeedback.feedback.thumbs_up
                              ? ThumbsUpFilled
                              : ThumbsUp
                          }
                          iconDescription="Yes"
                          onClick={() => {
                            setDocumentsWithFeedback(
                              documentsWithFeedback.map((entry, entry_idx) => {
                                if (entry_idx === index) {
                                  // Step 1.a.i: Create deep copy of the documentWithFeedback object to be updated
                                  let updatedDocumentWithFeedback =
                                    _.cloneDeep(entry);

                                  // Step 1.a.ii: Update "feedback" value
                                  updatedDocumentWithFeedback.feedback = {
                                    thumbs_up: true,
                                    thumbs_down: false,
                                  };

                                  // Step 1.a.iii: Return updated documentWithFeedback object
                                  return updatedDocumentWithFeedback;
                                } else {
                                  // Step 1.b: Return other documentWithFeedback objects as it is
                                  return entry;
                                }
                              })
                            );
                          }}
                        ></Button>
                        <Button
                          kind="ghost"
                          renderIcon={
                            !_.isNil(
                              documentWithFeedback.feedback.thumbs_down
                            ) && documentWithFeedback.feedback.thumbs_down
                              ? ThumbsDownFilled
                              : ThumbsDown
                          }
                          iconDescription="Yes"
                          onClick={() => {
                            setDocumentsWithFeedback(
                              documentsWithFeedback.map((entry, entry_idx) => {
                                if (entry_idx === index) {
                                  // Step 1.a.i: Create deep copy of the documentWithFeedback object to be updated
                                  let updatedDocumentWithFeedback =
                                    _.cloneDeep(entry);

                                  // Step 1.a.ii: Update "feedback" value
                                  updatedDocumentWithFeedback.feedback = {
                                    thumbs_up: false,
                                    thumbs_down: true,
                                  };

                                  // Step 1.a.iii: Return updated documentWithFeedback object
                                  return updatedDocumentWithFeedback;
                                } else {
                                  // Step 1.b: Return other documentWithFeedback objects as it is
                                  return entry;
                                }
                              })
                            );
                          }}
                        ></Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </React.Fragment>
      ) : loading ? (
        <React.Fragment>
          <div className="documents--details">
            <h6>Extracting the most relevant documents</h6>
          </div>
          <div className="documents--items">
            {[1, 2, 3].map((index) => {
              return (
                <div
                  id={"document--item-" + index}
                  key={"document--item-" + index}
                  className="documents--item"
                >
                  <SkeletonText width="20%"></SkeletonText>
                  <SkeletonText paragraph={true} lineCount={3}></SkeletonText>
                </div>
              );
            })}
          </div>
        </React.Fragment>
      ) : (
        <div className="documents--details">
          Oops! Sorry we couldn't find anything matching your question.
        </div>
      )}
    </React.Fragment>
  );
}

Documents.propTypes = {
  question: PropTypes.string,
  documents: PropTypes.array,
  loading: PropTypes.bool,
  source: PropTypes.string,
};

export default Documents;
