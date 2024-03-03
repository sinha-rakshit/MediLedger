import React from 'react'
import styled from 'styled-components'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


 const FooterMain = () => {
  return (
    <Main>
        <SubMain>
            <Division>
              <Head>The Contract Crew</Head>
              <Text>
                The First Decentralised Application for infrastructure development
              </Text>
            </Division>
            <Division>
                <Text><Head>Give Feedback</Head></Text>
                <Input type='EMail'></Input>
                <Submit><Input type='Submit'></Input></Submit>
            </Division>
            <Division>
                <Head>Follow Us</Head>
                <Icon>
                <InstagramIcon />
                <FacebookIcon />
                <LinkedInIcon />
                </Icon>
                
            </Division>
            <Division>
                <Head>Contact Us</Head>
                <Text>contractcrew@gov.in</Text>
                <Text>+7687 8786</Text>
            </Division>
        </SubMain>
    </Main>
  )
}

const Submit=styled.button`
  text-align: center;
  width: max-content;
  background-color: ${(props) => props.theme.btnColor};
  cursor: pointer;
  font-family: 'Roboto';
  text-transform: uppercase;
  &:hover{
    background-color: ${(props) => props.theme.colorSec} ;
    color:${(props) => props.theme.color} ;
    transform: translateY(-2px);
    transition: transform 0.5s;
  }
  font-size: 14px;
  font-weight: bold;
`
const SubMain=styled.section`
    width: 60%;
    display: flex;
    justify-content: space-between;

`
const Main=styled.div`
    background-color: ${(props)=>props.theme.bgDiv};
    width:100%;
    height:20vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 6rem;
    border-bottom: 0.1rem solid ${(props)=>props.theme.colorDiv};
`
const Division=styled.div`
    width: 20%;
`
const Icon=styled.div`
   color: ${(props)=>props.theme.colorDiv};
`
const Text=styled.div`
   color: ${(props)=>props.theme.colorDiv};
`
const Head=styled.div`
   color: ${(props)=>props.theme.colorDiv};
   font-style: bold;
   font-weight: 20rem;
   font-size: small;
   text-transform: uppercase;
   padding-bottom: 0.5rem;
   padding-top: 3rem;
   
`
const Input=styled.input`

`

export default FooterMain