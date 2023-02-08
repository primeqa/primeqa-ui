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

import './model-tutorial.scss';

import { ArrowLeft, ArrowRight } from '@carbon/react/icons';
import { Button, ProgressBar, Theme } from "@carbon/react";

import { Component } from "react";

/**
 * Displays information (and a tutorial if applicable) about a particular PrimeQA model. 
 */
class ModelTutorial extends Component{
    /**
     * 
     * @param {*} props.tutorial A Tutorial model to display.
     */
    constructor(props){
        super(props);
        this.state = {
            tutorial: props.tutorial,
            currentStep: props.tutorial.currentStepIndex
        }
    }


    /**
     * Increments or decrements the current step that the tutorial is on. 
     * @param {boolean} increment If true, increments the currentStep by 1. Otherwise, decrements by 1.
     */
    updateStep(increment){
        if (increment && this.state.tutorial){
            this.state.tutorial.incrementStep();
        }else if(this.state.tutorial){
            this.state.tutorial.decrementStep();
        }
        this.setState({
            currentStep: this.state.tutorial.currentStepIndex
        });
    }
    
    render(){
        let backButton = this.state.tutorial.isFirstStep ? <div></div> :  <Button hasIconOnly renderIcon={ArrowLeft} label="Back" kind="ghost" onClick={() => { this.updateStep(false) }}>Back</Button>
        let nextButton = this.state.tutorial.isLastStep ? <div></div> :  <Button  renderIcon={ArrowRight} kind="ghost" onClick={() => { this.updateStep(true) }}>Next</Button>
        return(
        <>
        <Theme theme="g90">
            <div className="cds--row">
                {/* Dialog */}
                <div className="cds--col-lg-5 cds--col-md-8 ">
                    <div className='dialog-section'>
                        <div>
                            <div className="demo-heading">
                                <p>{this.state.tutorial.title}</p>
                                <p>{this.state.tutorial.currentStep.title}</p>

                                <ProgressBar label="" value={this.state.tutorial.percentComplete}/>
                            </div>
                            {this.state.tutorial.currentStep.dialog}
                        </div>
                        <div className='demo-buttons'>
                            {backButton}
                            {nextButton}
                        </div>
                    </div>
                </div>
                {/* Content */}
                <div className="cds--col-lg-11 cds--col-md-8 tutorial-col2">
                    <Theme theme="g100" className="tutorial-col2 tutorial-pad">
                        {this.state.tutorial.currentStep.content}
                    </Theme>
                </div>                
            </div>
            </Theme>

        </> 
        );
    }
}
export default ModelTutorial;