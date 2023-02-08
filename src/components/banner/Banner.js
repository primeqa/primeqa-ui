/**
*
* Copyright 2022 PrimeQA Team
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*/

import './banner.scss';

import { Component } from "react";
import bannerImage from './assets/GammaAnimation.gif';
import logoImage from './assets/PrimeQA_Mag_Glass.png';

/**
 * Landing page banner. Contains title, blurb, and banner image.
 */
class Banner extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: props.header,
            blurb:props.subheader
        } 
    }

    render(){
        return(
            <div className="cds--grid"> 
                <div className="cds--row ">
                    {/* Left column - Title and blurb */}
                    <div className="cds--col-lg-6 cds--col-md-4 primeQA-text">
                            <div className="cds--row">
                                <img src={logoImage} alt={"PrimeQA Logo"} />
                            </div>
                            <div className="cds--row  primeqa-text-title">{this.state.title}</div>
                            <div className="cds--row primeqa-text-description">{this.state.blurb}</div> 
                        </div>
                    {/* Right column - banner image */}
                    <div className="cds--col-lg-10 cds--col-md-4">
                        <div className="banner-img-container">
                            {/* <img src={bannerImage} alt={"Banner"} className="banner-img"/> */}
                        </div>
                    </div>
                </div>
            </div> 
        );   
    }  
}
export default Banner;