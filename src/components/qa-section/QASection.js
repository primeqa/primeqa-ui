import AnswersSection from "./AnswersSection/AnswersSection";
import { Component } from "react";
import { ContextMode } from "./ContextSection/ContextSection";
import {ContextSection} from "./ContextSection/ContextSection";
import QuestionSection from "./QuestionSection/QuestionSection";

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
        console.log("QAsection construcot");
        console.log(props);
        super(props);
        this.state = {
            context: props.context || null,
            contexts: props.contexts || [],
            askedQuestion: props.question || null,
            answers: [],
            showAnswers: props.showAnswers || false,
            loading: props.loading || false,
            selectedAnswerString: props.selectedAnswer || null,
            contextMode: props.contextMode || ContextMode.EDITABLE,
        }
        this.askQuestion = this.askQuestion.bind(this);
        this.resetState = this.resetState.bind(this);
        this.selectContext = this.selectContext.bind(this);
    }

    /**
     * Resets the state back to a question not being asked
     */
    resetState(){
        this.setState({
            askedQuestion: null,
            showAnswers: false,
            loading: false,
            selectedAnswerString: null
        });
    }


    askQuestion (question) {
        console.log("ask question")
        if (question && this.state.context){
            this.setState({
                showAnswers: true,
                loading:true,
                askedQuestion: question
            }, () => {
                // TODO: Call API
                this.apiHandler();
            });            
        }
    }

    /**
     * Executed when the API is done loading
     * @param {*} answers 
     */
    apiHandler = async (answers) => {
        // TODO: handle if there are answers returned
        await setTimeout(()=> {
            const answers = ["A", "B", "C", "D", "E"]; 
            this.setState({
                loading:false,
                answers: answers
            }); 
         }
         ,3000);
    }

    selectContext = (event) =>{
        console.log(event.selectedItem);
        this.setState({
            context: event.selectedItem
        });
    }

    selectAnswer(answerString){
        // TODO: set selected answer string. this gets passed to the context section
    }
    
    render(){
        return( 
            <div className="demo-height">
                <div className='cds--row demo-height'>
                    {this.state.showAnswers ? (
                        <AnswersSection loading={this.state.loading} question={this.state.askedQuestion} askAnother={this.resetState} answers={this.state.answers}/>
                    ) : (
                        <QuestionSection samples={this.props.context.questions} ask={this.askQuestion} />
                    )}
                    
                    <ContextSection contexts={this.props.contexts} selected={this.props.context} mode={this.props.contextMode} selectContext={this.selectContext} className="content-pad demo-height"/>
                </div>
            </div>
        );
    }
}
export default QASection;