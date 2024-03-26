import styled from 'styled-components';
 import { FormState } from '../AddDoctorForm';
 import { useState, useContext } from 'react';

// const projectId = process.env.NEXT_PUBLIC_IPFS_ID
// const projectSecret = process.env.NEXT_PUBLIC_IPFS_KEY
// const auth = 'Basic ' + Buffer.from(projectId + ":" + projectSecret).toString('base64')


const FormRight = () => {
  const Handler = useContext(FormState);



  return (
    <FormRightWrap>
      
      <FormInput>
        <FormRow>
          <RowFirst>
            <label>DOCTOR SPECIALITY</label>
            <Input name="speciality" placeholder='Enter Doctor Speciality below'></Input>
          </RowFirst>
          <RowSecond>
            <label>DOCTOR HEIGHT</label>
            <Input  name="height" type={'number'}  ></Input>
          </RowSecond>
          <RowSecond>
            <label>DOCTOR WEIGHT</label>
            <Input  name="weight" type={'number'}  ></Input>
          </RowSecond>
          <RowSecond>
            <label>DOCTOR BLOOD GROUP</label>
            <Input  name="bloodGroup"></Input>
          </RowSecond>
        </FormRow>
      </FormInput>


      <FormInput>
        <FormRow>
          <RowFirst>
            <label>EMERGENCY CONTACT INFORMATION</label>
            <Input  name="emergencyContact" type={'number'}  ></Input>
          </RowFirst>
          <RowSecond>
            <label>DOCTOR MARITAL STATUS</label>
            <Select name="maritalStatus">
              <option>Married</option>
              <option>Unmarried</option>
              <option>Others</option>
            </Select>
          </RowSecond>
        </FormRow>
      </FormInput>
      
      
      <Button onClick={ Handler.registerDoctor}>
        Register Doctor
      </Button>
    </FormRightWrap>
  )
}

const FormRightWrap = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
  width:47%;
`

const FormInput = styled.div`
  display:flex ;
  flex-direction:column;
  font-family:'poppins';
  margin-top:10px ;
`

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  width:100% ;
`

const Input = styled.input`
  padding:15px;
  color:${(props) => props.theme.color} ;
  margin-top:4px;
  ::placeholder{
    font-size: smaller;
    color: lightslategrey;
  }
  border:1px solid ${(props) => props.theme.bgDiv};
  outline:none;
  font-size:large;
  width:100% ;
`

const RowFirst = styled.div`
  display:flex ;
  flex-direction:column ;
  width:100% ;
`

const RowSecond= styled.div`
  display:flex ;
  flex-direction:column ;
  width:100% ;
`

const Select = styled.select`
  padding:15px;
  color:${(props) => props.theme.color} ;
  margin-top:4px;
  ::placeholder{
    font-size: smaller;
    color: lightslategrey;
  }
  border:1px solid ${(props) => props.theme.bgDiv};
  outline:none;
  font-size:large;
  width:100% ;
`


const Button = styled.button`
    
    text-align: center;
    width: 100%;
    background-color: ${(props) => props.theme.btnColor};
    border: none;
    cursor: pointer;
    font-family: 'Comfortaa';
    text-transform: uppercase;
    border-radius: 5px;
    height: 3.5rem;
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

export default FormRight