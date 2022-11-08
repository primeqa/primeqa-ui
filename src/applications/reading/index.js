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
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import { TextArea, TextInput, Button } from "@carbon/react";

import Readers from "../../components/readers";
import Answers from "../../components/answers";

import { getAnswers as getAnswersAPI } from "../../api/answers";
import { addNotification } from "../../components/notifications/notificationsSlice";

import "./styles.scss";

const strings = {
  PLACEHOLDER_QUESTION: "What would you like to know?",
};

async function read(
  text,
  context,
  reader,
  setAnswers,
  setProcessing,
  setProcessed,
  dispatch
) {
  try {
    // Step 1: Play a move
    const resp = await getAnswersAPI(text, context, reader);
    // Step 2: Verify response came with "text" response type
    let answers = [];
    if (resp && !_.isEmpty(resp)) {
      resp.forEach((answer) => {
        answers.push({
          text: answer.text,
          context: context,
          startCharOffset: answer.start_char_offset,
          endCharOffset: answer.end_char_offset,
          confidenceScore: answer.confidence_score,
        });
      });
    }

    setAnswers(answers);

    // Step 3: Set processing to false and processed to true
    setProcessing(false);
    setProcessed(true);
  } catch (err) {
    // Step 1: Dispatch appropriate add error notification event
    if (Object.hasOwn(err, "name") && err.name === "AxiosError") {
      dispatch(
        addNotification({
          notification: {
            notification: {
              id: "get_answers--error",
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
            id: "get_answers--error",
            type: "Toast",
            kind: "error",
            title: err.detail.code + " : " + err.detail.message,
            subtitle: "Refer: contact us in README.",
          },
        })
      );
    }

    // Step 2: Set processing to false, processed to true and answers to empty list
    setProcessing(false);
    setProcessed(true);
    setAnswers([]);
  }
}

function Reading({ application, showSettings }) {
  const [disabled, setDisabled] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [questionText, setQuestionText] = useState(
    strings.PLACEHOLDER_QUESTION
  );
  const [context, setContext] = useState(null);
  const [processed, setProcessed] = useState(false);
  const [answers, setAnswers] = useState([]);

  // Redux connectivity
  const readers = useSelector((state) => state.readers);
  const dispatch = useDispatch();

  return (
    <div className="application">
      <div className="application__body">
        <div className="application__description">
          {application.description}
        </div>
        <div className="application__content">
          <h4>What would you like to know?</h4>
          <div className="reading__input">
            <TextArea
              labelText="Context"
              cols={50}
              rows={4}
              id="reading__context"
              onChange={(event) => {
                setContext(event.target.value);
              }}
            ></TextArea>
            <div className="reading__input--box">
              <TextInput
                id="reading__question"
                labelText={"Question"}
                placeholder={strings.PLACEHOLDER_QUESTION}
                disabled={disabled || !context || !readers.selectedReader}
                value={
                  questionText !== strings.PLACEHOLDER_QUESTION
                    ? questionText
                    : ""
                }
                onChange={(event) => {
                  setProcessed(false);
                  setQuestionText(event.target.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    read(
                      questionText,
                      context,
                      readers.selectedReader,
                      setAnswers,
                      setProcessing,
                      setProcessed,
                      dispatch
                    );
                  }
                }}
              ></TextInput>
              <Button
                className="reading__question--submit-btn"
                kind="primary"
                onClick={() => {
                  // Step 1: Set processing to true
                  setProcessing(true);

                  // Step 2: Trigger ask function
                  read(
                    questionText,
                    context,
                    readers.selectedReader,
                    setAnswers,
                    setProcessing,
                    setProcessed,
                    dispatch
                  );
                }}
                onKeyDown={() => {
                  // Step 1: Set processing to true
                  setProcessing(true);

                  // Step 2: Trigger ask function
                  read(
                    questionText,
                    context,
                    readers.selectedReader,
                    setAnswers,
                    setProcessing,
                    setProcessed,
                    dispatch
                  );
                }}
                disabled={
                  disabled ||
                  !context ||
                  !readers.selectedReader ||
                  questionText === strings.PLACEHOLDER_QUESTION
                }
              >
                Ask
              </Button>
            </div>
          </div>
          {questionText !== strings.PLACEHOLDER_QUESTION ? (
            <div className="answers">
              {(processing || processed) && questionText ? (
                <div id="question">
                  <h6>Question</h6>
                  <span>{questionText}</span>
                </div>
              ) : null}

              {processing || processed ? (
                <Answers
                  question={questionText}
                  answers={answers}
                  loading={processing}
                  source={"reading"}
                ></Answers>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      {showSettings ? (
        <div className="application__settings">
          <Readers disableParent={setDisabled}></Readers>
        </div>
      ) : null}
    </div>
  );
}

Reading.defaultProps = {
  showSettings: true,
};

Reading.propTypes = {
  application: PropTypes.object,
  showSettings: PropTypes.bool,
};

export default Reading;
