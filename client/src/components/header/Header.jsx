import {AppBar , Toolbar, Typography, Button, styled} from '@mui/material';
import {Link} from 'react-router-dom';


const NavBar = styled(AppBar)`
background-color: white;
color: black;
`
const NavBarContainer = styled(Toolbar)`
display: flex;
justify-content: center;
& > a {
   padding: 20px;
   color: black;
   text-decoration: none;
}

`

const Header = () => {


    return (
        <NavBar>
            <NavBarContainer>
                <Link to={'/'}>HOME</Link>
                <Link to={'/about'}>ABOUT</Link>
                <Link to={'/contact'}>CONTACT</Link>
                <Link to={'/login'}>LOGOUT</Link>

            </NavBarContainer>
        </NavBar>
    )
}

export default Header;