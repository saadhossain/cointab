import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DisplayUsersDetails from '../Components/DisplayUsersDetails';

const UsersDetails = () => {
    //Get Loading from utility context
    // Set data to the State
    const [users, setUsers] = useState([]);
    const [dataCount, setDataCount] = useState(0);

    console.log(users);
    // Set How many users show per page
    const [usersPerPage, setUsersPerPage] = useState(10);

    // Current Page Number
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate total page based on total users and total users to show per page
    const totalPage = Math.ceil(dataCount / usersPerPage);

    // Get the data from the backend
    useEffect(() => {
        fetch(`http://localhost:5000/users?usersPerpage=${usersPerPage}&currentPage=${currentPage}`)
            .then(res => res.json())
            .then(data => {
                setDataCount(data.count);
                setUsers(data.data);
            })
            .catch(err => console.error(err));
    }, [currentPage, usersPerPage]);

    //Set the search query and gender filter to the state
    const [searchInputQuery, setSearchInputQuery] = useState('');
    const [genderfilter, setGenderFilter] = useState('');

    //Handle Input Search
    const handleInputSearchQuery = (e) => {
        setSearchInputQuery(e.target.value);
    }
    //Handle Gender Filter
    const handleGenderFilterChange = (e) => {
        setGenderFilter(e.target.value);
    }
    //functionality to implement search feature
    let filteredUsers = users && users?.filter(user => {
        const { name, email, gender } = user;
        return (
            (name.toLowerCase().includes(searchInputQuery.toLowerCase()) ||
                email.toLowerCase().includes(searchInputQuery.toLowerCase())) &&
            (genderfilter === "" || gender.toLowerCase() === genderfilter.toLowerCase())
        );
    });

    // Handle page change
    const handlePageChange = (pageNum) => {
        setCurrentPage(pageNum);
    }

    // Render page numbers
    const pageNumbers = [];
    for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(i);
    }
    return (
        <div className='cointab-bg'>
            <div className='w-11/12 md:w-10/12 mx-auto mt-2 md:pt-10 min-h-screen md:min-h-[85vh]'>
                {
                    filteredUsers?.length ?
                        <>
                            <h2 className='text-3xl md:text-4xl font-semibold text-secondary font-Shantell md:mt-5 text-center'>Users Details</h2>
                            {/* Search box and filter wrapper */}
                            <div className="w-full md:w-10/12 mx-auto flex justify-between items-end my-5">
                                {/* Search Box */}
                                <div className="w-3/4 md:w-2/4">
                                    <input type="text" placeholder="Search by name or email" value={searchInputQuery} onChange={handleInputSearchQuery} className="px-3 py-2 bg-white border-2 border-gray-400 text-gray-800 rounded-md w-full" />
                                </div>
                                {/* Gender Filter */}
                                <div className="w-2/5 ml-auto flex flex-col md:flex-row gap-2 items-center justify-end">
                                    <div>
                                        <label htmlFor="Gender">Gender</label>
                                        <select value={genderfilter} onChange={handleGenderFilterChange} className="px-3 py-2 border-gray-400 rounded-md bg-gray-300">
                                            <option value="">All</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                    <div className=''>
                                        <label htmlFor="user-per-page" >Show Per Page</label>
                                        <select onClick={(e) => setUsersPerPage(e.target.value)} it="service" className='px-3 py-2 border-gray-400 rounded-md bg-gray-300'>
                                            <option value="10" selected>10 Service</option>
                                            <option value="20">20 Service</option>
                                            <option value="30">30 Service</option>
                                            <option value="50">50 Service</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {/* Tables to Show users Data */}
                            <div className="mt-5 text-gray-100">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-xs">
                                        <colgroup>
                                            <col />
                                            <col />
                                            <col />
                                            <col />
                                            <col className="w-52" />
                                            <col />
                                        </colgroup>
                                        <thead className="bg-primary">
                                            <tr className="text-left text-base">
                                                <th className="px-3 md:py-5">Image</th>
                                                <th className="px-3 md:py-5">Name</th>
                                                <th className="px-3 md:py-5">Email Address</th>
                                                <th className="px-3 md:py-5">Phone Number</th>
                                                <th className="px-3 md:py-5">Location, Address</th>
                                                <th className="px-3 md:py-5">Gender</th>
                                            </tr>
                                        </thead>

                                        {
                                            filteredUsers.map(user => <DisplayUsersDetails user={user} key={user.id} />)
                                        }
                                    </table>
                                </div>
                            </div>
                        </> :
                        <div className='flex flex-col  items-center'>
                            <h2 className='text-3xl md:text-4xl font-semibold text-secondary font-Shantell mt-5 text-center'>No Data Found!</h2>
                            <h4 className='text-xl md:text-4xl font-semibold text-primary font-Shantell mt-5 text-center'>Please Add Some Data First!</h4>
                            <Link to='/'><button className='coinBtn mt-5'>Home</button></Link>
                        </div>
                }
                {
                    filteredUsers.length >= 10 &&
                    <div className='flex justify-center'>
                        <div className='grid grid-cols-12 my-5 gap-y-2'>
                            {pageNumbers.map(number => (
                                <button key={number} onClick={() => handlePageChange(number)} className={currentPage === number ? 'page-selected' : 'page-btn'}>
                                    {number}
                                </button>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default UsersDetails;