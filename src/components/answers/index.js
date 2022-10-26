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

import {
  Button,
  SkeletonText,
  Accordion,
  AccordionItem,
  Link,
} from "@carbon/react";
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

async function buildAnswersWithFeedback(
  question,
  answers,
  setAnswersWithFeedback,
  dispatch
) {
  // Step 1: Build feedbackIdToAnswerIndex map and answersWithFeedback list
  let feedbackIdToAnswerIndexMap = new Map();
  let answersWithFeedback = [];

  // Step 1.a: Iterate over each answer
  answers.forEach((answer, answerIndex) => {
    // Step 1.a.i: Generate feedback_id
    const feedback_id = generateUUID(
      question +
        "::" +
        answer.context.replace(/\s/g, "") +
        "::" +
        answer.text.replace(/\s/g, "") +
        "::" +
        answer.startCharOffset +
        "::" +
        answer.endCharOffset
    );

    // Step 1.a.ii: Update feedbackIdToAnswerIndexMap
    feedbackIdToAnswerIndexMap.set(feedback_id, answerIndex);

    // Step 1.a.iii: Copy answer over and add feedback information
    answersWithFeedback.push({
      ...answer,
      feedback: { feedback_id: feedback_id },
    });
  });

  // Step 2: Trigger [GET] /feedbacks API call for all identified feedback_ids
  let feedbacks = [];
  if (!_.isEmpty(feedbackIdToAnswerIndexMap)) {
    try {
      feedbacks = await getFeedbacksAPI([...feedbackIdToAnswerIndexMap.keys()]);
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
      const answerIndex = feedbackIdToAnswerIndexMap.get(feedback.feedback_id);
      if (!_.isNil(answerIndex)) {
        answersWithFeedback[answerIndex].feedback = { ...feedback };
      }
    });
  }

  // Step 4: Set answersWithFeedback
  setAnswersWithFeedback(answersWithFeedback);
}

async function updateFeedback(
  feedbackId,
  update,
  answersWithFeedback,
  setAnswersWithFeedback,
  dispatch
) {
  try {
    // Step 1: Trigger [PATCH] /feedbacks/{feedback_id} API call
    const updatedFeedback = await updateFeedbackAPI(feedbackId, update);

    // Step 2: Copy existing answer index to feedback map
    let updatedAnswersWithFeedback = answersWithFeedback.map(
      (answerWithFeedback) => {
        // Step 2.a: If feedback_id of new feedback matches with answerWithFeedback's feedback.feedback_id, update that answersWithFeedback
        if (
          answerWithFeedback.feedback.feedback_id ===
          updatedFeedback.feedback_id
        ) {
          return { ...answerWithFeedback, feedback: updatedFeedback };
        } else {
          // Step 2.b: Return existing answerWithFeedback
          return answerWithFeedback;
        }
      }
    );

    // Step 3: Set AnswersWithFeedback to new value
    setAnswersWithFeedback(updatedAnswersWithFeedback);
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
  answersWithFeedback,
  setAnswersWithFeedback,
  dispatch
) {
  try {
    // Step 1: Trigger [POST] /feedbacks API call
    const newFeedback = await postFeedbackAPI(feedback);

    // Step 2: Copy existing answer index to feedback map
    let updatedAnswersWithFeedback = answersWithFeedback.map(
      (answerWithFeedback) => {
        // Step 2.a: If feedback_id of new feedback matches with answerWithFeedback's feedback.feedback_id, update that answersWithFeedback
        if (
          answerWithFeedback.feedback.feedback_id === newFeedback.feedback_id
        ) {
          return { ...answerWithFeedback, feedback: newFeedback };
        } else {
          // Step 2.b: Return existing answerWithFeedback
          return answerWithFeedback;
        }
      }
    );

    // Step 3: Set AnswersWithFeedback to new value
    setAnswersWithFeedback(updatedAnswersWithFeedback);
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

function Answers({ question, answers, loading, source }) {
  const [answersWithFeedback, setAnswersWithFeedback] = useState([]);

  // Redux connectivity
  const dispatch = useDispatch();

  useEffect(() => {
    if (_.isNil(answers) || _.isEmpty(answers)) {
      setAnswersWithFeedback([]);
    } else {
      buildAnswersWithFeedback(
        question,
        answers,
        setAnswersWithFeedback,
        dispatch
      );
    }
  }, [question, answers, dispatch]);

  return (
    <React.Fragment>
      {!loading && !_.isEmpty(answersWithFeedback) ? (
        <React.Fragment>
          <div className="answers--details">
            <h6>{answersWithFeedback.length} answers from articles</h6>
          </div>
          <div className="answers--items">
            {answersWithFeedback.map((answerWithFeedback, index) => {
              return (
                <div
                  id={"answer--item-" + index}
                  key={"answer--item-" + index}
                  className="answers--item"
                >
                  <h6>Answer</h6>
                  <div className="answers--item__content">
                    <div className="answers--item__content--left">
                      <span>{answerWithFeedback.text}</span>
                      {Object.hasOwn(answerWithFeedback, "context") &&
                      answerWithFeedback.context ? (
                        <Accordion
                          align="start"
                          size="md"
                          className="answers--item__context"
                        >
                          <AccordionItem title="Evidence">
                            <p>
                              {answerWithFeedback.context.slice(
                                0,
                                answerWithFeedback.startCharOffset
                              )}
                              <b className="answers--item__context--highlight">
                                {answerWithFeedback.context.slice(
                                  answerWithFeedback.startCharOffset,
                                  answerWithFeedback.endCharOffset
                                )}
                              </b>
                              {answerWithFeedback.context.slice(
                                answerWithFeedback.endCharOffset
                              )}
                            </p>
                          </AccordionItem>
                        </Accordion>
                      ) : null}
                    </div>
                    <div className="answers--item__content--right">
                      {!_.isNil(answerWithFeedback.confidenceScore) ? (
                        <div className="answers--item__confidence">
                          Confidence:
                          <span>
                            {Math.round(
                              answerWithFeedback.confidenceScore * 100
                            )}
                            %
                          </span>
                        </div>
                      ) : null}
                      <div className="answers--item__source">
                        {answerWithFeedback.title ? (
                          <span>
                            Source Document:
                            {answerWithFeedback.url ? (
                              <Link href={answerWithFeedback.url}>
                                {answerWithFeedback.title}
                              </Link>
                            ) : (
                              answerWithFeedback.title
                            )}
                          </span>
                        ) : null}
                      </div>
                      <div className="answers--item__feedback">
                        Was this answer useful?
                        <Button
                          kind="ghost"
                          renderIcon={
                            !_.isNil(answerWithFeedback.feedback.thumbs_up) &&
                            answerWithFeedback.feedback.thumbs_up
                              ? ThumbsUpFilled
                              : ThumbsUp
                          }
                          iconDescription="Yes"
                          onClick={() => {
                            // Step 1: If existing feedback exist, update with new information
                            if (
                              !_.isNil(answerWithFeedback.feedback.thumbs_up) ||
                              !_.isNil(answerWithFeedback.feedback.thumbs_down)
                            ) {
                              updateFeedback(
                                answerWithFeedback.feedback.feedback_id,
                                {
                                  thumbs_up: true,
                                  thumbs_down: false,
                                },
                                answersWithFeedback,
                                setAnswersWithFeedback,
                                dispatch
                              );
                            } else {
                              // Step 2: Create new feedback
                              postFeedback(
                                {
                                  feedback_id:
                                    answerWithFeedback.feedback.feedback_id,
                                  question: question,
                                  context: answerWithFeedback.context,
                                  thumbs_up: true,
                                  thumbs_down: false,
                                  answer: answerWithFeedback.text,
                                  start_char_offset:
                                    answerWithFeedback.startCharOffset,
                                  end_char_offset:
                                    answerWithFeedback.endCharOffset,
                                  application: source,
                                },
                                answersWithFeedback,
                                setAnswersWithFeedback,
                                dispatch
                              );
                            }
                          }}
                        ></Button>
                        <Button
                          kind="ghost"
                          renderIcon={
                            !_.isNil(answerWithFeedback.feedback.thumbs_down) &&
                            answerWithFeedback.feedback.thumbs_down
                              ? ThumbsDownFilled
                              : ThumbsDown
                          }
                          iconDescription="Yes"
                          onClick={() => {
                            // Step 1: If existing feedback exist, update with new information
                            if (
                              !_.isNil(answerWithFeedback.feedback.thumbs_up) ||
                              !_.isNil(answerWithFeedback.feedback.thumbs_down)
                            ) {
                              updateFeedback(
                                answerWithFeedback.feedback.feedback_id,
                                {
                                  thumbs_up: false,
                                  thumbs_down: true,
                                },
                                answersWithFeedback,
                                setAnswersWithFeedback,
                                dispatch
                              );
                            } else {
                              // Step 2: Create new feedback
                              postFeedback(
                                {
                                  feedback_id:
                                    answerWithFeedback.feedback.feedback_id,
                                  question: question,
                                  context: answerWithFeedback.context,
                                  thumbs_up: false,
                                  thumbs_down: true,
                                  answer: answerWithFeedback.text,
                                  start_char_offset:
                                    answerWithFeedback.startCharOffset,
                                  end_char_offset:
                                    answerWithFeedback.endCharOffset,
                                  application: source,
                                },
                                answersWithFeedback,
                                setAnswersWithFeedback,
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
          <div className="answers--details">
            <h6>Extracting the most relevant answers</h6>
          </div>
          <div className="answers--items">
            {[1, 2, 3].map((index) => {
              return (
                <div
                  id={"answer--item-" + index}
                  key={"answer--item-" + index}
                  className="answers--item"
                >
                  <SkeletonText width="20%"></SkeletonText>
                  <SkeletonText paragraph={true} lineCount={3}></SkeletonText>
                </div>
              );
            })}
          </div>
        </React.Fragment>
      ) : (
        <div className="answers--details">
          Oops! Sorry we couldn't find anything matching your question.
        </div>
      )}
    </React.Fragment>
  );
}

Answers.propTypes = {
  question: PropTypes.string,
  answers: PropTypes.array,
  loading: PropTypes.bool,
  source: PropTypes.string,
};

export default Answers;
