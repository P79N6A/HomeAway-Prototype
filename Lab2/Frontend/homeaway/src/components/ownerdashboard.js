import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
//import '../../src/CSS/dashboard.css';
import Logo from '../../src/avatar_2x.png';
import Logo1 from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';
import axios from 'axios';
import cookie from 'react-cookies';
import { connect } from "react-redux";
import get_owner_properties  from '../actions/ownerdashboard.js';
import ShowMyProperties from './ShowMyProperties';
import jwt from "jsonwebtoken";

class OwnerDashboard extends Component {
    constructor() {
        super();
        this.state={
            properties:null,
            status:null,
            dataavailable:null
        }

    }

componentDidMount(){
    console.log("called");
    let token=jwt.decode(localStorage.getItem("jwtToken"));
    if(token && token.UserType=="owner"){
    // axios.get("http://localhost:3001/ownerproperties",{ params: {
    //     username:cookie.load('owner')
        
    //   }}).then(res=>{
    //     let temp = JSON.stringify(res.data);

    //     temp = JSON.parse(temp);
        
    //     this.setState({
    //         properties:temp,
    //         dataavailable:res.data.length!=0?null:"You have no properties posted.",
    //         status:res.status
    //     })
    // }).catch()
    let username=token.emailaddress;
    this.props.get_owner_properties(username);
    }
}

    render() {
        //console.log("trips", this.state.properties);
        //console.log(this.state.dataavailable);


        let details = null;
        
        if (this.props.status === 200 && this.props.properties !== null) {
            details = this.props.properties.map(property => {
                return (
                    <ShowMyProperties key={Math.random} data={property}/>
                )
            })

      }
        return (


            <div className="trips">
            

            <div>
            
            <h3>My properties</h3><br/>
{details}
<h4>{this.props.dataavailable}</h4>
            </div>







            </div>





        )
    }
}
function mapStateToProps(state) {
    console.log("in map state traveler_propfile",state);
    return { status: state.owner_properties.status,
        properties:state.owner_properties.properties,
       dataavailable:state.owner_properties.dataavilable
      
    
    
    
    };
  }
  
  const mapDispachToProps = dispatch => {
    return {
        get_owner_properties:(emailaddress) => dispatch(get_owner_properties(emailaddress)),

    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispachToProps
  )(OwnerDashboard);
  
