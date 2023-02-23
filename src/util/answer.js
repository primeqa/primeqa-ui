class Answer{
    /**
     * 
     * @param {String} text 
     * @param {number} confidence_score 
     * @param {number} start_char_offset 
     * @param {number} end_char_offset 
     */
    constructor(text, confidence_score, start_char_offset, end_char_offset){
        this.text = text;
        this.confidence_score = confidence_score
        this.start_char_offset = start_char_offset
        this.end_char_offset = end_char_offset
    }

    static fromResponse(response) {
        if (response)
        {
            try{
                return new Answer(response.text, response.confidence_score, response.start_char_offset, response.end_char_offset)
            }catch (err){
                console.log(err);
            }
        }
    }
}

export default Answer;
