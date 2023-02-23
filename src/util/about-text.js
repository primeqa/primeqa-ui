import { AppDeveloper, MachineLearning_01, Microscope } from '@carbon/pictograms-react';

import { Information } from "./model";

const about_information = [
    new Information(0,"Train & Demo Models", "Researchers can use PrimeQA to both train custom QA models and demo them to a general audience.", <MachineLearning_01/>, ""),
    new Information(1, "Replicate Experiments", "Researchers can replicate experiments or use pre-trained models to test on custom data.", <Microscope />),
    new Information(2, "Develop & Embed", "Developers can embed the capabilities of PrimeQA models into a custom applications.", <AppDeveloper />)
]

export default about_information;