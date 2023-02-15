import { AppDeveloper, MachineLearning_01, Microscope } from '@carbon/pictograms-react';

import { Information } from "./model";

const about_information = [
    new Information(0,"Train & Demo Models", "Researchers can use PrimeQA to both train custom QA models and demo them to a general audience.", <MachineLearning_01/>, ""),
    new Information(1, "Replicate Experiments", "Academics & researchers can replicate experiments or download pre-trained models to test out on custom data.", <Microscope />),
    new Information(2, "Develop & Embed", "Embed the capabilities of PrimeQA state-of-the art models into a custom application without requiring training.", <AppDeveloper />)
]

export default about_information;