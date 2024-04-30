import React from 'react'
import styled from 'styled-components';
import AddPatientForm from '@/components/AddPatientForm/AddPatientForm'
const addPatient = () => {
  return (
     <FormWrapper>
      <FormTopWrap>
        <Paragraph> Presenting our</Paragraph>
        <Heading>Patient Registration Form</Heading>
        <Caption>
            THE RIGHT TECHNOLOGY CAN MAKE A DIFFERENCE   
        </Caption>
        <Paragraph>Please fill up the details very carefully.Every field is mandatory. </Paragraph>
       
        
    </FormTopWrap>  
      <AddPatientForm />
    </FormWrapper>
  )
}

const Text=styled.p`
  margin-top: 0;
`
const TopLeftWrap=styled.div`
  width:48%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Caption=styled.h1`
   font-family: 'Oswald';
   font-size:1rem;
   font-weight: 300;
   font-style: bold;
   height: max-content;
   width: max-content;
   letter-spacing: 0.2rem;
   color:${(props) => props.theme.btnColor} ;
`
const Heading=styled.h1`
   font-family: 'Oswald';
   font-size:3.5rem;
   font-weight: 400;
   font-style: bold;
   height: max-content;
   width: max-content;
   letter-spacing: 0.5rem;
   color:${(props) => props.theme.btnColor} ;
   justify-content: center;
   align-items: center;
`
const Paragraph=styled.p`
   margin:0;
   font-size: 1rem;
   padding: 0;
   font-weight: 500;
   text-align: center;
   font-family: 'Poppins';
   font-style: bold;
`
const FormWrapper=styled.div`

    padding-top: 9rem;
    
`
const FormTopWrap=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export default addPatient