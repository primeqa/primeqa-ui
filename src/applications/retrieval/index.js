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
import { useSelector, useDispatch } from "react-redux";

import { Search, Button } from "@carbon/react";

import Collections from "../../components/collections";
import Retrievers from "../../components/retrievers";
import { unselectRetriever } from "../../components/retrievers/retrieversSlice";
import { unselectReader } from "../../components/readers/readersSlice";
import Documents from "../../components/documents";

import { getDocuments as getDocumentsAPI } from "../../api/documents";
import { addNotification } from "../../components/notifications/notificationsSlice";

import "./styles.scss";

const strings = {
  PLACEHOLDER_QUESTION: "What would you like to know?",
};

async function ask(
  text,
  retriever,
  collection,
  setDocuments,
  setProcessing,
  setProcessed,
  dispatch
) {
  try {
    // Step 1: Play a move
    const documents = await getDocumentsAPI(text, retriever, collection);
    setDocuments(documents);
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

    // Step 2: Set processing to false, processed to true and documents to empty list
    setProcessing(false);
    setProcessed(true);
    setDocuments([]);
  }
}

function Retrieval({ application, showSettings }) {
  const [disabled, setDisabled] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [questionText, setQuestionText] = useState(
    strings.PLACEHOLDER_QUESTION
  );
  const [showSuggestedQuestions, setShowSuggestedQuestions] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [documents, setDocuments] = useState([]);

  // Redux connectivity
  const retrievers = useSelector((state) => state.retrievers);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("category", "Retrieval");

    return () => {
      // Dispatch unselectRetriever event
      dispatch(unselectRetriever());

      // Dispatch unselectReader event
      dispatch(unselectReader());
    };
  }, [dispatch]);

  return (
    <div className="application">
      <div className="application__body">
        <div className="application__description">
          {application.description}
        </div>
        <div className="application__content">
          <h4>What would you like to know?</h4>
          <div className="qa__input">
            <div className="qa__input--box">
              <Search
                id="qa__question"
                labelText={questionText}
                placeholder={strings.PLACEHOLDER_QUESTION}
                disabled={
                  disabled ||
                  !retrievers.selectedRetriever ||
                  !selectedCollection
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
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    ask(
                      questionText,
                      retrievers.selectedRetriever,
                      selectedCollection,
                      setDocuments,
                      setProcessing,
                      setProcessed,
                      dispatch
                    );
                  }
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
              className="qa__question--submit-btn"
              kind="primary"
              onClick={() => {
                // Step 1: Set processing to true
                setProcessing(true);

                // Step 2: Trigger ask function
                ask(
                  questionText,
                  retrievers.selectedRetriever,
                  selectedCollection,
                  setDocuments,
                  setProcessing,
                  setProcessed,
                  dispatch
                );
              }}
              onKeyDown={() => {
                // Step 1: Set processing to true
                setProcessing(true);

                // Step 2: Trigger ask function
                ask(
                  questionText,
                  retrievers.selectedRetriever,
                  selectedCollection,
                  setDocuments,
                  setProcessing,
                  setProcessed,
                  dispatch
                );
              }}
              disabled={
                disabled ||
                !retrievers.selectedRetriever ||
                !selectedCollection ||
                questionText === strings.PLACEHOLDER_QUESTION
              }
            >
              Ask
            </Button>
          </div>
          {questionText !== strings.PLACEHOLDER_QUESTION ? (
            <div className="documents">
              {(processing || processed) && questionText ? (
                <div id="question">
                  <h6>Question</h6>
                  <span>{questionText}</span>
                </div>
              ) : null}

              {processing || processed ? (
                <Documents
                  question={questionText}
                  documents={documents}
                  loading={processing}
                  source={"retrieval"}
                ></Documents>
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
        </div>
      ) : null}
    </div>
  );
}

Retrieval.defaultProps = {
  showSettings: true,
};

Retrieval.propTypes = {
  application: PropTypes.object,
  showSettings: PropTypes.bool,
};

export default Retrieval;
