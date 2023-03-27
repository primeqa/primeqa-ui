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

import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import "./styles.scss";

function renderText(evidence) {
  return (
    <p className="answers--item__evidence-text">
      {!_.isNil(evidence.offsets) && !_.isEmpty(evidence.offsets) ? (
        <React.Fragment>
          {evidence.offsets.map((offset, offset_index) => {
            return offset_index === 0 ? (
              <React.Fragment
                key={"answers--item__evidence--offset-" + offset_index}
              >
                {evidence.text.slice(0, offset.start)}
                <b className="answers--item__evidence--highlight">
                  {evidence.text.slice(offset.start, offset.end)}
                </b>
              </React.Fragment>
            ) : (
              <React.Fragment
                key={"answers--item__evidence--offset-" + offset_index}
              >
                {evidence.text.slice(
                  evidence.offsets[offset_index - 1].end,
                  offset.start
                )}
                <b className="answers--item__evidence--highlight">
                  {evidence.text.slice(offset.start, offset.end)}
                </b>
              </React.Fragment>
            );
          })}
          {evidence.text.slice(
            evidence.offsets[evidence.offsets.length - 1].end
          )}
        </React.Fragment>
      ) : (
        evidence.text
      )}
    </p>
  );
}

function renderDocumentEvidence(evidence) {
  return (
    <div className="answers--item__evidence--document">
      {evidence.title ? (
        <React.Fragment>
          <div className="answers--item__evidence--document-title">
            <strong>Title:</strong>
            <span>{evidence.title}</span>
          </div>
          <div className="answers--item__evidence--document-text">
            <strong>Text:</strong> {renderText(evidence)}
          </div>
        </React.Fragment>
      ) : (
        renderText(evidence)
      )}
    </div>
  );
}

function Evidence({ evidence }) {
  return (
    <React.Fragment>
      {evidence.evidence_type === "document"
        ? renderDocumentEvidence(evidence)
        : renderText(evidence)}
    </React.Fragment>
  );
}

Evidence.propTypes = {
  evidence: PropTypes.object,
};

export default Evidence;
