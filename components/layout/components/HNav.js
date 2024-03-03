import React from 'react' ;
import styled from 'styled-components';
import {useRouter} from 'next/router';
import Link from 'next/link';

 const HNav = () => {
  const Router=useRouter();
  return (
      <HNavWrap>
      <Link style={{textDecoration:'none'}} href={'/'}><HNavLinks active={Router.pathname=="/"?true:false}>
        All Patients
      </HNavLinks> </Link>
      <Link style={{textDecoration:'none'}} href={'/addDoctor'}><HNavLinks active={Router.pathname=="/addDoctor"?true:false}>
        Add Doctor
          </HNavLinks> </Link>
       <Link style={{textDecoration:'none'}} href={'/addPatient'}><HNavLinks active={Router.pathname=="/addPatient"?true:false}>
        Add Patient
      </HNavLinks> </Link>
      
      
    </HNavWrap>
  )
}

const HNavWrap =styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    //background-color: ${(props)=>props.theme.bgDiv};
    padding: 6px;
    height: 50%;
    border-radius: 10px;
    align-items: center;
`
  
const HNavLinks=styled.div`
    .link{
      color:'black';
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: 'black';    
    text-decoration: none;
    &:hover{
    background-color: ${(props) => props.theme.colorSec} ;
    color:${(props) => props.theme.color} ;
    transform: translateY(-2px);
    transition: transform 0.5s;
  }
    height: 90%;
    width: max-content;
    font-family: 'Comfortaa';
    margin:7px;
    border-radius: 6px;
    padding: 2px 5px 5px;
    cursor: pointer;
    text-transform: uppercase;
     font-weight: bold ;
     font-size: medium;
    

`


export default HNav;