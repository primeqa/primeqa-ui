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

import { generateUUID } from "../../util/uuid";
import {
  getFeedbacks as getFeedbacksAPI,
  postFeedback as postFeedbackAPI,
  updateFeedback as updateFeedbackAPI,
} from "../../api/feedbacks";
import { addNotification } from "../../components/notifications/notificationsSlice";
import "./styles.scss";

async function buildDocumentsWithFeedback(
  question,
  documents,
  setDocumentsWithFeedback,
  dispatch
) {
  // Step 1: Build feedbackIdToAnswerIndex map and answersWithFeedback list
  let feedbackIdToDocumentIndexMap = new Map();
  let documentsWithFeedback = [];

  // Step 1.a: Iterate over each answer
  documents.forEach((document, documentIndex) => {
    // Step 1.a.i: Generate feedback_id
    const feedback_id = generateUUID(
      question + "::" + document.text.replace(/\s/g, "")
    );

    // Step 1.a.ii: Update feedbackIdToAnswerIndexMap
    feedbackIdToDocumentIndexMap.set(feedback_id, documentIndex);

    // Step 1.a.iii: Copy answer over and add feedback information
    documentsWithFeedback.push({
      ...document,
      feedback: { feedback_id: feedback_id },
    });
  });

  // Step 2: Trigger [GET] /feedbacks API call for all identified feedback_ids
  let feedbacks = [];
  if (!_.isEmpty(feedbackIdToDocumentIndexMap)) {
    try {
      feedbacks = await getFeedbacksAPI([
        ...feedbackIdToDocumentIndexMap.keys(),
      ]);
    } catch (err) {
      // Step 1: Dispatch appropriate add error notification event
      if (Object.hasOwn(err, "name") && err.name === "AxiosError") {
        dispatch(
          addNotification({
            notification: {
              notification: {
                id: "get_feedbacks--error",
                type: "Toast",
                kind: "error",
                title: err.name + " : " + err.message,
                subtitle: "Feedbacks may not be up-to-date.",
              },
            },
          })
        );
      } else {
        dispatch(
          addNotification({
            notification: {
              id: "get_feedbacks--error",
              type: "Toast",
              kind: "error",
              title: err.detail.code + " : " + err.detail.message,
              subtitle: "Feedbacks may not be up-to-date.",
            },
          })
        );
      }
    }
  }

  // Step 3: If feedbacks exist, update feedback information in answersWithFeedback for appropriate answer
  if (!_.isEmpty(feedbacks)) {
    // Step 3.a: Iterate over each feedback
    feedbacks.forEach((feedback) => {
      const answerIndex = feedbackIdToDocumentIndexMap.get(
        feedback.feedback_id
      );
      if (!_.isNil(answerIndex)) {
        documentsWithFeedback[answerIndex].feedback = { ...feedback };
      }
    });
  }

  // Step 4: Set answersWithFeedback
  setDocumentsWithFeedback(documentsWithFeedback);
}

async function updateFeedback(
  feedbackId,
  update,
  documentsWithFeedback,
  setDocumentsWithFeedback,
  dispatch
) {
  try {
    // Step 1: Trigger [PATCH] /feedbacks/{feedback_id} API call
    const updatedFeedback = await updateFeedbackAPI(feedbackId, update);

    // Step 2: Build updatedDocumentWithFeedback
    let updatedDocumentsWithFeedback = documentsWithFeedback.map(
      (documentWithFeedback) => {
        // Step 2.a: If feedback_id of new feedback matches with answerWithFeedback's feedback.feedback_id, update that answersWithFeedback
        if (
          documentWithFeedback.feedback.feedback_id ===
          updatedFeedback.feedback_id
        ) {
          return { ...documentWithFeedback, feedback: updatedFeedback };
        } else {
          // Step 2.b: Return existing answerWithFeedback
          return documentWithFeedback;
        }
      }
    );

    // Step 3: Set AnswersWithFeedback to new value
    setDocumentsWithFeedback(updatedDocumentsWithFeedback);
  } catch (err) {
    // Step 1: Dispatch appropriate add error notification event
    if (Object.hasOwn(err, "name") && err.name === "AxiosError") {
      dispatch(
        addNotification({
          notification: {
            notification: {
              id: "update_feedback--error",
              type: "Toast",
              kind: "error",
              title: err.name + " : " + err.message,
              subtitle: "Refer: contact us in README.",
            },
          },
        })
      );
    } else {
      dispatch(
        addNotification({
          notification: {
            id: "update_feedback--error",
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

async function postFeedback(
  feedback,
  documentsWithFeedback,
  setDocumentsWithFeedback,
  dispatch
) {
  try {
    // Step 1: Trigger [POST] /feedbacks API call
    const newFeedback = await postFeedbackAPI(feedback);

    // Step 2: Build updatedDocumentWithFeedback
    let updatedDocumentWithFeedback = documentsWithFeedback.map(
      (documentWithFeedback) => {
        // Step 2.a: If feedback_id of new feedback matches with documentWithFeedback's feedback.feedback_id, update that documentWithFeedback
        if (
          documentWithFeedback.feedback.feedback_id === newFeedback.feedback_id
        ) {
          return { ...documentWithFeedback, feedback: newFeedback };
        } else {
          // Step 2.b: Return existing documentWithFeedback
          return documentWithFeedback;
        }
      }
    );

    // Step 3: Set AnswersWithFeedback to new value
    setDocumentsWithFeedback(updatedDocumentWithFeedback);
  } catch (err) {
    // Step 1: Dispatch appropriate add error notification event
    if (Object.hasOwn(err, "name") && err.name === "AxiosError") {
      dispatch(
        addNotification({
          notification: {
            notification: {
              id: "post_feedback--error",
              type: "Toast",
              kind: "error",
              title: err.name + " : " + err.message,
              subtitle: "Refer: contact us in README.",
            },
          },
        })
      );
    } else {
      dispatch(
        addNotification({
          notification: {
            id: "post_feedback--error",
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

function Documents({ question, documents, loading, source }) {
  const [documentsWithFeedback, setDocumentsWithFeedback] = useState([]);

  // Redux connectivity
  const dispatch = useDispatch();

  useEffect(() => {
    if (_.isNil(documents) || _.isEmpty(documents)) {
      setDocumentsWithFeedback([]);
    } else {
      buildDocumentsWithFeedback(
        question,
        documents,
        setDocumentsWithFeedback,
        dispatch
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
                      {!_.isNil(documentWithFeedback.confidence) ? (
                        <div className="documents--item__confidence">
                          Score (out of 100):
                          <span>
                            {Math.round(documentWithFeedback.confidence * 100)}
                          </span>
                        </div>
                      ) : null}
                      {!_.isNil(documentWithFeedback.confidence) ? (
                        <div className="documents--item__score">
                          Score:
                          <span>{documentWithFeedback.score}</span>
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
                            // Step 1: If existing feedback exist, update with new information
                            if (
                              !_.isNil(
                                documentWithFeedback.feedback.thumbs_up
                              ) ||
                              !_.isNil(
                                documentWithFeedback.feedback.thumbs_down
                              )
                            ) {
                              updateFeedback(
                                documentWithFeedback.feedback.feedback_id,
                                {
                                  thumbs_up: true,
                                  thumbs_down: false,
                                },
                                documentsWithFeedback,
                                setDocumentsWithFeedback,
                                dispatch
                              );
                            } else {
                              // Step 2: Create new feedback
                              postFeedback(
                                {
                                  feedback_id:
                                    documentWithFeedback.feedback.feedback_id,
                                  question: question,
                                  answer: documentWithFeedback.text,
                                  thumbs_up: true,
                                  thumbs_down: false,
                                  application: source,
                                },
                                documentsWithFeedback,
                                setDocumentsWithFeedback,
                                dispatch
                              );
                            }
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
                            // Step 1: If existing feedback exist, update with new information
                            if (
                              !_.isNil(
                                documentWithFeedback.feedback.thumbs_up
                              ) ||
                              !_.isNil(
                                documentWithFeedback.feedback.thumbs_down
                              )
                            ) {
                              updateFeedback(
                                documentWithFeedback.feedback.feedback_id,
                                {
                                  thumbs_up: false,
                                  thumbs_down: true,
                                },
                                documentsWithFeedback,
                                setDocumentsWithFeedback,
                                dispatch
                              );
                            } else {
                              // Step 2: Create new feedback
                              postFeedback(
                                {
                                  feedback_id:
                                    documentWithFeedback.feedback.feedback_id,
                                  question: question,
                                  answer: documentWithFeedback.text,
                                  thumbs_up: false,
                                  thumbs_down: true,
                                  application: source,
                                },
                                documentsWithFeedback,
                                setDocumentsWithFeedback,
                                dispatch
                              );
                            }
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
