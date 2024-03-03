
import React from 'react'
import styled from 'styled-components'

const FooterHeader = () => {
  return (
    <Header>
        <DivFirst>
          <Text>
            Ready to get started?
          </Text>
          <Text>
            Start Now!
          </Text>
        </DivFirst>
        <DivSecond>
           <Button>Get Started</Button>
        </DivSecond>
    </Header>
  )
  
}

const Header=styled.div`
height: 10vh;
width: 60%;
display: flex;
   background-color: ${(props) => props.theme.colorSec};
   flex-direction: row;
`
const DivFirst=styled.div`
width: 50%;
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: left;
     padding-left: 5vh;
`
const DivSecond=styled.div`
    display: flex;
     flex-direction: row;
     justify-content: center;
     align-items: right;
     padding-left: 5vh;
`

const Text=styled.div`

`
const Button = styled.button`
height: max-content;
  padding: 8px;
  text-align: center;
  width: max-content;
  background-color: ${(props) => props.theme.btnColor};
  border: none;
  cursor: pointer;
  font-family: 'Roboto';
  text-transform: uppercase;
  &:hover{
    background-color: ${(props) => props.theme.colorSec} ;
    color:${(props) => props.theme.color} ;
    transform: translateY(-2px);
    transition: transform 0.5s;
  }
  color:${(props) => props.theme.colorDiv} ;
  font-size: 14px;
  font-weight: bold;
`


export default FooterHeader