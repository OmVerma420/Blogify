import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/assets/logo.png'
import { FaSignInAlt } from "react-icons/fa";
import { Button } from '../ui/button';
import SearchBar from '../ui/SearchBar';
import { RouteSignIn } from '@/helpers/RouteName';


const Header = () => {
    return (
        <header className='flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b'>
        <div className="flex items-center gap-3">
        {/* constrain logo size so it doesn't overflow */}
           <img src={Logo} alt="Logo" className="w-10 h-10 object-contain" />
           <span className="text-lg font-medium">Brand</span>
      </div>

      <div className="flex-1 max-w-2xl mx-4 ">
        <SearchBar />
      </div>

      <div>
        <Button asChild>
           <Link to={RouteSignIn} 
           className="text-sm">
              <FaSignInAlt /> 
              Sign in
           </Link>
        </Button>
      </div>
        </header>
        
    )
}

export default Header;
