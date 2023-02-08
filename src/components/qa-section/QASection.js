import AnswersSection from "./AnswersSection/AnswersSection";
import { Component } from "react";
import ContextSection from "./ContextSection/ContextSection";
import QuestionSection from "./QuestionSection/QuestionSection";

class QASection extends Component{
    constructor(props){
        super(props);
        this.state = {
            askedQuestion: props.question || null,
            showAnswers: props.showAnswers || false,
            loading: props.loading || false,
            selectedAnswerString: props.selectedAnswerString || null
        }
        this.context = this.props.context
        this.askQuestion = this.askQuestion.bind(this);
        this.resetState = this.resetState.bind(this);
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
        if (question){
            console.log(question)
            // TODO: call API
            this.apiHandler()
            this.setState({
                showAnswers: true,
                loading:true,
                askedQuestion: question
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
            this.setState({
                loading:false
            });
            // TODO: show the next dialog step. call a handler.
         }
         ,3000);
    }

    selectAnswer(answerString){
        // TODO: set selected answer string. this gets passed to the context section
    }
    
    render(){
        return(
            <div>
                <div className='cds--row'>
                    {this.state.showAnswers ? (
                        <AnswersSection loading={this.state.loading} question={this.state.askedQuestion} askAnother={this.resetState}/>
                    ) : (
                        <QuestionSection samples={this.props.context.questions} ask={this.askQuestion} />
                    )}
                    
                <ContextSection context={this.props.context}/>
                </div>
            </div>
        );
    }
}
export default QASection;