import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DisplayUsersDetails from '../Components/DisplayUsersDetails';

const UsersDetails = () => {
    //Get Loading from utility context
    // Set data to the State
    const [users, setUsers] = useState([]);
    const [dataCount, setDataCount] = useState(0);

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
                    users?.length ?
                        <>
                            <h2 className='text-3xl md:text-4xl font-semibold text-secondary font-Shantell md:mt-5 text-center'>Users Details</h2>
                            <div className='w-11/12 lg:w-10/12 mx-auto flex justify-end'>
                                <label htmlFor="service" className='text-jane font-semibold mr-2'>Filter</label>
                                <select onClick={(e) => setUsersPerPage(e.target.value)} it="service" className='border-2 border-jane rounded font-semibold'>
                                    <option value="10" selected>10 Service</option>
                                    <option value="20">20 Service</option>
                                    <option value="30">30 Service</option>
                                    <option value="50">50 Service</option>
                                </select>
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
                                            users.map(user => <DisplayUsersDetails user={user} key={user.id} />)
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
                <div className='flex justify-center'>
                    <div className='grid grid-cols-12 my-5 gap-y-2'>
                        {pageNumbers.map(number => (
                            <button key={number} onClick={() => handlePageChange(number)} className={currentPage === number ? 'page-selected' : 'page-btn'}>
                                {number}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersDetails;