import { IbmWatsonNaturalLanguageUnderstanding, Query, SearchLocate } from "@carbon/icons-react";

import {Model} from "./model";

const models = [
    new Model("reading", "Reading Comprehension", "Extract information and generate answers given a source document or passage.", <SearchLocate size={32}/>, "https://huggingface.co/ibm/tydiqa-primary-task-xlm-roberta-large", ["Multilingual", "Diverse Contexts"], "#demos"),
    new Model("retrieval", "Information Retrieval", "Retrieve documents and passages using both traditional and neural models", <IbmWatsonNaturalLanguageUnderstanding size={32}/>, "https://github.com/primeqa/primeqa/tree/main/primeqa/ir", []),
    new Model("question_gen", "Question Generation", "Generate questions from an answer and source document or passage", <Query size={32}/>, "https://huggingface.co/PrimeQA/mt5-base-tydi-question-generator", ["Tables", "Multilingual"])
]


export default models;
