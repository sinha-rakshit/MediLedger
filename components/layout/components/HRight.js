import styled from 'styled-components';
import React from 'react' ;
import LightIcon from '@mui/icons-material/LightMode';
import DarkIcon from '@mui/icons-material/DarkMode';
import {App} from '../Layout';
import {useContext} from 'react';
import AccountDetails from './AccountDetails';



 const HRight = () => {
  const ThemeChanger=useContext(App);

  return (
    <HRightWrap>
        <AccountDetails />
        <ThemeChange>
          {ThemeChanger.theme === 'light' ? <DarkIcon onClick={ThemeChanger.changeTheme}/> : <LightIcon onClick={ThemeChanger.changeTheme} />}
           
        </ThemeChange>
    </HRightWrap>
  )
}



const HRightWrap=styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   margin-right: 15px;
   height: 70%;
`

const ThemeChange=styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: ${(props)=>props.theme.bgColor};
   height: 50%;
   padding: 5px;
   width: 45px;
   border-radius: 12px;
   cursor: pointer;

`

export default HRight