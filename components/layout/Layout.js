import Header from "./Header"
import themes from "./themes"
import styled, {ThemeProvider, createGlobalStyle} from 'styled-components';
import { useState, createContext } from 'react';
import Footer from "../footer/Footer";
 
const App = createContext();

const Layout = ({ children }) => {
    
    const [theme, setTheme] = useState('light');

    const changeTheme = () => {
        setTheme(theme == "light" ? "dark" : "light");
    }

    return (
     <App.Provider value={{changeTheme, theme}}>
        <ThemeProvider theme={themes[theme]}>
        {/* <ToastContainer /> */}
            <LayoutWrap>
                <GlobalStyle/>
                <Header/>
                    {children}
                    <Footer/>
            </LayoutWrap>
        </ThemeProvider>
    </App.Provider>
    )
}

const GlobalStyle = createGlobalStyle`
    body{
        margin: 0;
        padding: 0;
        overflow-x: hidden;
    }
`

const LayoutWrap = styled.div`
    min-height: 100vh;
    background-color: ${(props) => props.theme.bgColor};
    background-image: ${(props) => props.theme.bgImage};
    color: ${(props) => props.theme.color};
`
export default Layout;
export {App};