import styled from 'styled-components';
 import { FormState } from '../AddDoctorForm';
import { useContext } from 'react';

const FormLeft = () => {
  const Handler = useContext(FormState);

  return (
    <FormLeftWrap>
      
      <FormInput>
        <label>DOCTOR EMAIL ADDRESS</label>
        <Input  placeholder='Enter Doctor Mail Id Here' name='doctorMail'>
        </Input>
      </FormInput>

      <FormInput>
        <label>DOCTOR ID</label>
        <Input onChange={Handler.FormHandler} value={Handler.form.did}  placeholder='Enter Unique Doctor Id Here' name='did' >
        </Input>
      </FormInput>

      <FormInput>
        <label>DOCTOR NAME</label>
        <Input onChange={Handler.FormHandler} value={Handler.form.name} placeholder='Enter Doctor Name Here' name='name'>
        </Input>
      </FormInput>

      <FormInput>
        <label>DOCTOR DATE OF BIRTH</label>
        <Input  type="date" placeholder='DD-MM-YYYY' name='dob'>
        </Input>
      </FormInput>

      <FormInput>
        <label>DOCTOR CONTACT INFORMATION</label>
        <Input placeholder='Enter Contact info here' name='doctorContact' type={'number'}>
        </Input>
      </FormInput>

      <FormInput>
        <label>DOCTOR GENDER </label>
            <Select name="doctorGender">
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
          </Select>
          </FormInput>
          
      <FormInput>
        <label>DOCTOR METAMASK WALLET ID</label>
        <Input onChange={Handler.FormHandler} value={Handler.form.walletid} placeholder='Enter Wallet id here' name='walletid'>
        </Input>
      </FormInput>

    </FormLeftWrap>
  )
}

const FormLeftWrap = styled.div`
  width:47%;
`

const FormInput = styled.div`
  display:flex ;
  flex-direction:column;
  font-family:'poppins';
  margin-top:10px ;
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


export default FormLeft;