import { IbmWatsonNaturalLanguageUnderstanding, Query, SearchLocate } from "@carbon/icons-react";

import {Model} from "./model";

const models = [
    new Model("reading", "Reading Comprehension", "Extract and/or generate answers given the source document or passage.", <SearchLocate size={32}/>, "https://huggingface.co/ibm/tydiqa-primary-task-xlm-roberta-large", []),
    new Model("retrieval", "Information Retrieval", "Retrieve documents and passages using both traditional and neural models", <IbmWatsonNaturalLanguageUnderstanding size={32}/>, "https://github.com/primeqa/primeqa/tree/main/primeqa/ir", []),
    new Model("question_gen", "Question Generation", "Supports generation of questions for effective domain adaptation over tables and multilingual text.", <Query size={32}/>, "https://huggingface.co/PrimeQA/mt5-base-tydi-question-generator", [])
]

export default models;
