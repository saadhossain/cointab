import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import coinTab from '../../assests/cointab_logo.png';
const Header = () => {
    return (
        <div className='bg-gray-100 border border-gray-200'>
            <div className='w-10/12 mx-auto py-2 flex justify-between items-center'>
                <Link to='/'><img src={coinTab} alt='Cointab' /></Link>
                <div className='flex gap-3 font-semibold'>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/about'>About Us</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Header;