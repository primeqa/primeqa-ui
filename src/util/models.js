import { IbmWatsonNaturalLanguageUnderstanding, Query, SearchLocate } from "@carbon/icons-react";

import {Model} from "./model";

const models = [
    new Model("reading", "Machine Reading Comprehension", "Extract and/or generate answers given the source document or passage.", <SearchLocate size={32}/>, "#", []),
    new Model("retrieval", "Information Retrieval", "Retrieve documents and passages using both traditional and neural models", <IbmWatsonNaturalLanguageUnderstanding size={32}/>, "#", []),
    new Model("question_gen", "Question Generation", "Supports generation of questions for effective domain adaptation over tables and multilingual text.", <Query size={32}/>, "#", [])
]

export default models;
