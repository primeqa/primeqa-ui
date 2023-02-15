import './about-section.scss'

import { Column, Grid, Tile } from "@carbon/react";

import React from 'react';

class AboutSection extends React.Component {
  constructor(props) {
    super(props);
  }

  card(information){
    return <Column lg={4} md={2} sm={4}>
        <div >
            <div>
                <div>{information.icon || ""}</div>
                <div className=''>{information.title || ""}</div>
                <div className=''>{information.description || ""}</div>
            </div>
        </div>
    </Column>
  }

  render() {
    if(this.props.info){
        return <div>
          <Grid>
              <Column lg={4} md={2} sm={4} className="application-card-grid-text">
                  <h3 className='application-card-grid-header'>About</h3>
              </Column>
              {this.props.info.map((information) => this.card(information))}
          
          </Grid>
      </div>
    }
    return <div></div>
    
  }
}

export default AboutSection;
