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
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import { Search, Form, Button } from "@carbon/react";

import Collections from "../../components/collections";
import Retrievers from "../../components/retrievers";
import Readers from "../../components/readers";
import Answers from "../../components/answers";

import { askQuestion as askQuestionAPI } from "../../api/ask";
import { addNotification } from "../../components/notifications/notificationsSlice";

import "./styles.scss";

const strings = {
  PLACEHOLDER_QUESTION: "What would you like to know?",
};

async function ask(
  text,
  retriever,
  collection,
  reader,
  setAnswers,
  setProcessing,
  setProcessed,
  dispatch
) {
  try {
    // Step 1: Play a move
    const resp = await askQuestionAPI(text, retriever, collection, reader);

    let answers = [];
    if (resp && !_.isEmpty(resp)) {
      // Step 2.a: Iterate over each entry in response to build answer's object
      resp.forEach((entry) => {
        // Step 2.a.i: Mandator fields
        let answer = {
          text: entry.answer.text,
          confidenceScore: entry.answer.confidence_score,
        };

        // Step 2.a.ii: Optional fields
        if (entry.document) {
          answer.context = entry.document.text;
          answer.title = entry.document.title;
          answer.url = entry.document.url;
        }

        if (entry.answer.start_char_offset) {
          answer.startCharOffset = entry.answer.start_char_offset;
        }

        if (entry.answer.end_char_offset) {
          answer.endCharOffset = entry.answer.end_char_offset;
        }

        answers.push(answer);
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

    // Step 2: Set processing to false, processed to true abd answers to empty list
    setProcessing(false);
    setProcessed(true);
    setAnswers([]);
  }
}

function QuestionAnswering({ application, showSettings }) {
  const [disabled, setDisabled] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [questionText, setQuestionText] = useState(
    strings.PLACEHOLDER_QUESTION
  );
  const [showSuggestedQuestions, setShowSuggestedQuestions] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [answers, setAnswers] = useState([]);

  // Redux connectivity
  const retrievers = useSelector((state) => state.retrievers);
  const readers = useSelector((state) => state.readers);
  const dispatch = useDispatch();

  // Reference for search input
  const searchRef = useRef(null);

  return (
    <div className="application">
      <div className="application__body">
        <div className="application__description">
          {application.description}
        </div>
        <div className="application__content">
          <h4>What would you like to know?</h4>
          <Form className="qa__input"
            onSubmit={evt => {
              evt.preventDefault();

              // Step 1: Set processing to true
              setProcessing(true);

              // Step 2: Trigger ask function
              ask(
                questionText,
                retrievers.selectedRetriever,
                selectedCollection,
                readers.selectedReader,
                setAnswers,
                setProcessing,
                setProcessed,
                dispatch
              );

              // Sets the focus on search input, accessing it through its reference
              searchRef.current.focus();
            }}
          >
            <div className="qa__input--box">
              <Search
                id="qa__question"
                ref={searchRef}
                labelText={questionText}
                placeholder={strings.PLACEHOLDER_QUESTION}
                disabled={
                  disabled ||
                  !retrievers.selectedRetriever ||
                  !selectedCollection ||
                  !readers.selectedReader
                }
                value={
                  questionText !== strings.PLACEHOLDER_QUESTION
                    ? questionText
                    : ""
                }
                onChange={(event) => {
                  setShowSuggestedQuestions(false);
                  setProcessed(false);
                  setQuestionText(event.target.value);
                }}
                onClick={() => {
                  setShowSuggestedQuestions(true);
                }}
              ></Search>
              {showSuggestedQuestions &&
              Object.hasOwn(selectedCollection, "settings") &&
              Object.hasOwn(selectedCollection.settings, "applications") &&
              Object.hasOwn(
                selectedCollection.settings.applications,
                "primqa"
              ) &&
              Object.hasOwn(
                selectedCollection.settings.applications.primeqa,
                "questions"
              ) ? (
                <div className="qa__suggested-questions">
                  {selectedCollection.settings.applications.primeqa.questions.map(
                    (questionText, idx) => {
                      return (
                        <div
                          key={`qa__suggested-questions__item-${idx}`}
                          className="qa__suggested-questions__item"
                          onClick={() => {
                            setQuestionText(questionText);
                            setShowSuggestedQuestions(false);
                          }}
                        >
                          <p>{questionText}</p>
                        </div>
                      );
                    }
                  )}
                </div>
              ) : null}
            </div>
            <Button
              kind="primary"
              type="submit"
              disabled={
                disabled ||
                !retrievers.selectedRetriever ||
                !selectedCollection ||
                !readers.selectedReader ||
                questionText === strings.PLACEHOLDER_QUESTION
              }
            >
              Ask
            </Button>
          </Form>
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
                  source={"qa"}
                ></Answers>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      {showSettings ? (
        <div className="application__settings">
          <Retrievers disableParent={setDisabled}></Retrievers>
          <Collections
            retriever={retrievers.selectedRetriever}
            selectedCollection={selectedCollection}
            setSelectedCollection={setSelectedCollection}
            disableParent={setDisabled}
          ></Collections>
          <Readers disableParent={setDisabled}></Readers>
        </div>
      ) : null}
    </div>
  );
}

QuestionAnswering.defaultProps = {
  showSettings: true,
};

QuestionAnswering.propTypes = {
  application: PropTypes.object,
  showSettings: PropTypes.bool,
};

export default QuestionAnswering;
