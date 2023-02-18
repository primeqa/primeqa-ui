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

import "./styles.scss";

function Answers({ question, answers, loading, source }) {
  const [answersWithFeedback, setAnswersWithFeedback] = useState([]);

  // Redux connectivity
  const dispatch = useDispatch();

  useEffect(() => {
    if (_.isNil(answers) || _.isEmpty(answers)) {
      setAnswersWithFeedback([]);
    } else {
      setAnswersWithFeedback(
        answers.map((answer) => {
          return {
            ...answer,
            feedback: { thumbs_up: false, thumbs_down: false },
          };
        })
      );
    }
  }, [question, answers, dispatch]);

  return (
    <React.Fragment>
      {!loading && !_.isEmpty(answersWithFeedback) ? (
        <React.Fragment>
          <div className="answers--details">
            <h6>
              Found {answersWithFeedback.length} answers matching your question.
            </h6>
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
                          Score (out of 100):
                          <span>
                            {Math.round(
                              answerWithFeedback.confidenceScore * 100
                            )}
                          </span>
                        </div>
                      ) : null}
                      <div className="answers--item__source">
                        {answerWithFeedback.title ? (
                          <React.Fragment>
                            <span>Source Document:</span>
                            <span>
                              {answerWithFeedback.url ? (
                                <Link href={answerWithFeedback.url}>
                                  {answerWithFeedback.title}
                                </Link>
                              ) : (
                                answerWithFeedback.title
                              )}
                            </span>
                          </React.Fragment>
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
                            setAnswersWithFeedback(
                              answersWithFeedback.map((entry, entry_idx) => {
                                if (entry_idx === index) {
                                  // Step 1.a.i: Create deep copy of the answerWithFeeback object to be updated
                                  let updatedAnswerWithFeedback =
                                    _.cloneDeep(entry);

                                  // Step 1.a.ii: Update "feedback" value
                                  updatedAnswerWithFeedback.feedback = {
                                    thumbs_up: true,
                                    thumbs_down: false,
                                  };

                                  // Step 1.a.iii: Return updated answerWithFeeback object
                                  return updatedAnswerWithFeedback;
                                } else {
                                  // Step 1.b: Return other answerWithFeeback objects as it is
                                  return entry;
                                }
                              })
                            );
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
                            setAnswersWithFeedback(
                              answersWithFeedback.map((entry, entry_idx) => {
                                if (entry_idx === index) {
                                  // Step 1.a.i: Create deep copy of the answerWithFeeback object to be updated
                                  let updatedAnswerWithFeedback =
                                    _.cloneDeep(entry);

                                  // Step 1.a.ii: Update "feedback" value
                                  updatedAnswerWithFeedback.feedback = {
                                    thumbs_up: false,
                                    thumbs_down: true,
                                  };

                                  // Step 1.a.iii: Return updated answerWithFeeback object
                                  return updatedAnswerWithFeedback;
                                } else {
                                  // Step 1.b: Return other answerWithFeeback objects as it is
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
