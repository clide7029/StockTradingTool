//import React, { useRef }from "react"
import Meta from '../components/Meta'
import styles from '../styles/Profile.module.css'
import React, { Component } from "react";


class Item extends Component {
    state = {
      listitems: [
      {
        season: "Spring",
        dis: "flowers"
      },
      {
        season: "Summer",
        dis: "sun"
      },
      {
        season: "Fall",
        dis: "leaves"
      }
    
    ]
    };
        
    render() {
      return (
          
        <React.Fragment>
            <Meta title='profile' />
            <h1>Username</h1>
            <p>This is the users profile</p>
          <ul className="list-group">
            {this.state.listitems.map(listitem => (
              
                <div className={styles.card}>
                    <div className={styles.container}>
                    <h4><b>{listitem.season}</b></h4>
                    <p>{listitem.dis}</p>
                     </div>    
                </div>
              
            ))}
          </ul>
        </React.Fragment>
      );
    }
  }
  
  export default Item;

