import styled from 'styled-components';
import Left from './components/HLeft';
import Nav from './components/HNav';
import Right from './components/HRight';

const Header = () => {
  return (
    <HeaderWrap>
      <Left ></Left>
      <Nav ></Nav>
      <Right></Right>
    </HeaderWrap>
  )
}

const HeaderWrap = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  background-color: ${(props)=>props.theme.bgDiv};
  justify-content: space-between;
  align-items: center;
`

export default Header