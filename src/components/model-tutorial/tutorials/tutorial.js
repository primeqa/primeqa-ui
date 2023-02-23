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

/**
 *  Models a single step in a Tutorial.
*/
export class TutorialStep{
    /**
     * 
     * @param {ProgressiveDialog} dialog The dialog to display to the user. There can be multiple of these per step.
     * @param {JSX} content Content displayed in the left/top column
     */
    constructor(title, dialog, content){
        this.title = title
        this.dialog = dialog
        this.content = content
    }
}

/**
 * Models a tutorial for a model.
 */
export class Tutorial{
    /**
     * 
     * @param {string} title The title of the tutorial
     * @param {string} shortTitle A shortened version of the tutorial, if needed
     * @param {[TutorialStep]} steps The steps of the tutorial, in order.
     */
    constructor(title, shortTitle, steps){
        this.title = title
        this.shortTitle = shortTitle
        this.currentStepIndex = 0
        this.steps = steps

        this.incrementStep = this.incrementStep.bind(this);
        this.decrementStep = this.decrementStep.bind(this);
        this.setStepIndex = this.setStepIndex.bind(this);
    }

    /**
     * Returns the step that the tutorial is currently on
     */
    get currentStep(){
        if (this.steps && this.currentStepIndex in this.steps){
            return this.steps[this.currentStepIndex]
        }
        return null
    }
    
    /**
     * Returns the total number of steps in the tutorial
     */
    get totalSteps() {
        if (this.steps){
            return this.steps.length
        }
        return 0
    }
    
    /**
     * Returns the percent complete that the tutorial currently is
     */
    get percentComplete(){
        return 100*((this.currentStepIndex+1)/this.totalSteps)
    }

    /**
     * Returns true if the tutorial is currently on the first step
     */
    get isFirstStep(){
        return this.currentStepIndex === 0
    }
    
    /**
     * Returns true if the tutorial is currently on the last step
     */
    get isLastStep(){
        return this.currentStepIndex === (this.totalSteps - 1)
    }

    /**
     * Increments the currentStepIndex by one
     */
    incrementStep(){
        if (!this.isLastStep){
            this.currentStepIndex += 1
        }
    }

    /**
     * Decrements the currentStepIndex by one
     */
    decrementStep(){
        if (!this.isFirstStep){
            this.currentStepIndex -= 1
        }
    }

    /**
     * Sets the currentStepIndex 
     * @param {number} index The index to set the current step to. If out of range, sets to the closest bound.
     */
    setStepIndex(index){
        if (index < 0){
            this.currentStepIndex = 0;
        }else if(index >= this.totalSteps){
            this.currentStepIndex = (this.totalSteps - 1);
        }else{
            this.currentStepIndex = index;
        }
    }
}