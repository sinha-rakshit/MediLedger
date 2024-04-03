import styled from 'styled-components';
import { FormState } from '../AddPatientForm'
import { useContext } from 'react';

const FormLeft = () => {
  const Handler = useContext(FormState);

  return (
    <FormLeftWrap>
      
      <FormInput>
        <label>PATIENT EMAIL ADDRESS</label>
        <Input   placeholder='Enter Patient Mail Id Here' name='patientMail'>
        </Input>
      </FormInput>

      <FormInput>
        <label>PATIENT ID</label>
        <Input onChange={Handler.FormHandler} value={Handler.form.pid}  placeholder='Enter Unique Patient Id Here' name='pid' >
        </Input>
      </FormInput>

      <FormInput>
        <label>PATIENT NAME</label>
        <Input onChange={Handler.FormHandler} value={Handler.form.name} placeholder='Enter Patient Name Here' name='name'>
        </Input>
      </FormInput>

      <FormInput>
        <label>PATIENT DATE OF BIRTH</label>
        <Input  type="date" placeholder='DD-MM-YYYY' name='dob'>
        </Input>
      </FormInput>

      <FormInput>
        <label>PATIENT CONTACT INFORMATION</label>
        <Input placeholder='Enter Contact info here' name='patientContact' type={'number'}>
        </Input>
      </FormInput>

      <FormInput>
        <label>PATIENT GENDER </label>
            <Select onChange={Handler.FormHandler} value={Handler.form.gender} name="gender">
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
          </Select>
      </FormInput>

      <FormInput>
        <label>Patient METAMASK WALLET ID</label>
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