<!---
Copyright 2022 PrimeQA Team

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

<!-- START sphinx doc instructions - DO NOT MODIFY next code, please -->
<div align="center">
    <img src="public/logo192.png" width="150"/>
</div>
<!-- END sphinx doc instructions - DO NOT MODIFY above code, please --> 

# Tooling UI        

<br>

[![LICENSE|Apache2.0](https://img.shields.io/github/license/saltstack/salt?color=blue)](https://www.apache.org/licenses/LICENSE-2.0.txt)

<h3>✔️ Getting Started</h3> 

- [Repository](https://github.com/primeqa/primeqa-ui)        
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)   

<h3>✅ Prerequisites</h3>

- [Yarn](https://classic.yarnpkg.com/en/docs/install)

<h3>🧩 Setup Local Environment</h3>

- Dowload all necessary packages to build and deploy the application: `yarn install`        
- Open `.env` files and set `REACT_APP_API_URL` to point to services:        
    - local: [http://localhost:{PORT}](http://localhost:{PORT})      

<h3>💻 UI Customization</h3>

The default description on each of the three main application pages can be customized by setting the following environment variables:

- `DESCRIPTION_RETRIEVAL`
- `DESCRIPTION_READING`
- `DESCRIPTION_QA`


<h3>💻 Run Locally</h3>

- Run the app in the _*development mode*_: `yarn start`        
- Open [http://localhost:8888](http://localhost:8888) to view it in the browser.               

<h3>💻 Setup & Run Docker</h3>      

This allows us to run the build in a node image and server the app using an nginx image.        
The final Docker image will just contain the build folder and nothing else      
(the project files were only used by to build the project in the builder layer, which then gets thrown away)      
it's just an intermmediary step.        

- `docker build . -t primeqa_ui`       
- `docker run --rm --name primeqa_ui -d -p 82:82 primeqa_ui:$(cat VERSION)`              
    - 82 -> public port to access     
    - 82 -> container expose port  
- stop container: `docker stop  primeqa_ui`        
- remove container: `docker rm primeqa_ui`     
- remove image: `docker rmi primeqa_ui`        

<!-- START sphinx doc instructions - DO NOT MODIFY next code, please -->
<!-- PrimeQA doc sync -->
<h3>📄 Documentation Sync</h3>      

**Keep PrimeQA documentation reference sync**   
Anytime this README files is updated, it is necessary to open a PR on PrimeQA repository to update, with the same modifications, **[the associated file](https://github.com/primeqa/primeqa/blob/main/docs/tooling_ui.md)** used on [documentation page](https://primeqa.github.io/primeqa/tooling_ui.html).        
*Do not modify initial image path*      
<!-- END sphinx doc instructions - DO NOT MODIFY above code, please --> 
