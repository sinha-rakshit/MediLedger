import React from 'react'
import styled from 'styled-components'

 const FooterFoot = () => {
  return (
    <Header>
        <SubHeader>
        <Div>
          <Text>
            @2023 TheContractCrew All Rights Reserved
          </Text>
        </Div>
        <Div>
           <Head>Privacy Policy : Terms And Conditions applied</Head>
        </Div>
        </SubHeader>
    </Header>
  )
}

const Header=styled.section`
height: 20vh;
width: 100%;
padding-top: 1.5vh;
display: flex;
flex-direction: row;
justify-content: center;
background-color: ${(props) => props.theme.bgDiv};
`
const SubHeader=styled.section`
width: 60%;
display: flex;
`
const Div=styled.div`
     width: 50%;
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: left;
     
`

const Text=styled.div`
color: ${(props)=>props.theme.colorDiv};
    font-family: 'Poppins';
`

const Head=styled.div`
   color: ${(props)=>props.theme.colorDiv};
   font-style: bold;
   font-family: 'Comfortaa';
   font-weight: 20rem;
   font-size: small;
   text-transform: uppercase;
   
`
export default FooterFoot