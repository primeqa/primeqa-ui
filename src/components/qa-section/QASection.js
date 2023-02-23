import { askQuestion, demo_ask } from "../../api/ask";

import Answer from "../../util/answer";
import AnswersSection from "./AnswersSection/AnswersSection";
import { Component } from "react";
import { ContextMode } from "./ContextSection/ContextSection";
import {ContextSection} from "./ContextSection/ContextSection";
import QuestionSection from "./QuestionSection/QuestionSection";

/**
 * A component that renders a side-by side Question/Answers and Context components. Manages updates between the two.
 */
class QASection extends Component{
    /**
     * @param {Context} props.contexts A list of contexts that can be chosen.
     * @param {Context} props.context The context that has been selected
     * @param {string} props.question The question that has been asked. Default null.
     * @param {boolean} props.showAnswers Whether to show the answers section. Default false
     * @param {boolean} props.loading Whether the answers are being loaded. Default false
     * @param {string} props.selectedAnswer The answer that has currently been selected. Default null.
     * @param {ContextMode} props.contextMode The mode that the contexts are in. 
     */
    constructor(props){
        super(props);
        this.state = {
            context: props.context || null,
            contexts: props.contexts || [],
            askedQuestion: props.question || null,
            answers: [],
            showAnswers: props.showAnswers || false,
            loading: props.loading || false,
            selectedAnswer: props.selectedAnswer || null,
            contextMode: props.contextMode || ContextMode.EDITABLE,
        }
        this.askQuestion = this.askQuestion.bind(this);
        this.resetState = this.resetState.bind(this);
        this.selectContext = this.selectContext.bind(this);
        this.selectAnswer = this.selectAnswer.bind(this);
    }

    /**
     * Resets the state back to a question not being asked
     */
    resetState(){
        this.setState({
            askedQuestion: null,
            showAnswers: false,
            answers: [],
            loading: false,
            selectedAnswer: null
        });
    }

    /**
     * 
     * @param {string} question Submits the provided question to the API then calls the handler.
     */
    askQuestion (question) {
        if (question && this.state.context){
            this.setState({
                showAnswers: true,
                loading:true,
                askedQuestion: question
            }, () => {
                // TODO: Call API
                this.apiHandler(question);
            });            
        }
    }

    /**
     * Calls the Reading API, then handles the returned answers.
     * @param {*} answers 
     */
    apiHandler = async (question) => {
        try{
            const response = await demo_ask(question, [this.state.context.text])
            console.log(response);
            // const response = await askQuestion(question, null, this.state.context, null);
            let answers= [];

            if (response && response.length > 0){
                response.forEach((res) => {
                    answers.push(Answer.fromResponse(res));
                })
            }

            // Select the first answer
            var selectedAnswer = null;
            if(answers && answers.length > 0){
                selectedAnswer = answers[0];
            }

            this.setState({
                loading:false,
                answers: answers,
                selectedAnswer: selectedAnswer
            }); 
        } catch (err){
            console.log(err);
            this.setState({
                loading:false,
                answers: [],
                selectedAnswer: null
            }); 
        }
    }

    /**
     * 
     * @param {} event Handles an event that selects a context from a dropdown and sets state.
     */
    selectContext = (event) =>{
        this.setState({
            context: event.selectedItem
        });
    }

    /**
     * 
     * @param {Answer} answer Sets the state with the provided answer
     */
    selectAnswer(answer){
        this.setState({
            selectedAnswer: answer
        });
    }
     
    render(){
        return( 
            <div className="demo-height">
                <div className='cds--row demo-height'>
                    {this.state.showAnswers ? (
                        <AnswersSection loading={this.state.loading} question={this.state.askedQuestion} askAnother={this.resetState} answers={this.state.answers} selectAnswer={this.selectAnswer} selectedAnswer={this.state.selectedAnswer}/>
                    ) : (
                        <QuestionSection samples={this.state.context.questions} ask={this.askQuestion} />
                    )}
                    
                    <ContextSection contexts={this.state.contexts} selected={this.state.context} mode={this.state.contextMode} selectContext={this.selectContext} selectedAnswer={this.state.selectedAnswer} className="content-pad demo-height"/>
                </div>
            </div>
        );
    }
}
export default QASection;