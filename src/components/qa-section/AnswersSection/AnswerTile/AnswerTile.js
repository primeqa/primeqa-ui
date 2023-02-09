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

import './answer-tile.scss';

import { Component } from "react";
import { Tile } from "@carbon/react";

class AnswerTile extends Component{
    constructor(props){
        super(props);
    }

    // so we have top layer - todo: set answer id 
        // which looks like layer-01
        // + text (link)
            // clicking on link changes selected text
    // then bottom layer
        // which is layer-02
        // that has score (confidence score)
    render(){
        return (
            <div>
            <div id="0" className="answer-tile-top-layer">
                <div className='answer-tile-answer'>
                    {"Answer here"}
                </div>
            </div>
            <div className="answer-tile-bottom-layer">
                <div className="answer-tile-content">
                    {"Confidence here"}
                </div>
            </div>
                
            </div>
        );
    }
}

export default AnswerTile;