import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import SmallLoader from '../Components/Loader/SmallLoader';
import { UtilityContext } from '../Context/UtilityProvider';

const Home = () => {
    //Get loading state from the context
    const { loading, setLoading } = useContext(UtilityContext)

    //Function fon fetching and adding data to the database
    const handleFetchData = async () => {
        setLoading(true)
        const data = await fetch('https://randomuser.me/api/?results=70');
        const usersData = await data.json()
        const userDetails = usersData.results?.map(user => ({
            name: user.name.first + ' ' + user.name.last,
            email: user.email,
            phone: user.phone,
            gender: user.gender,
            location: user.location.city + ', ' + user.location.country,
            picture: user.picture.large
        }))
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        })
            .then(res => res.json())
            .then(data => {
                const length = data?.data?.length;
                if (length) {
                    toast.success(`${length} Users Data Fetched and Saved to Database Successfully...`)
                }
            })
        setLoading(false)
    }

    //Function to delete all data from the database
    const handleDeleteData = () => {
        const confirmation = window.confirm('Are you Sure to Delete all Data?')
        if (confirmation) {
            fetch('http://localhost:5000/deleteusers', {
                method: 'DELETE'
            })
                .then(res => {
                    if (res.status === 200) {
                        toast.error('All Users Deleted')
                    }
                })
        }
    }
    return (
        <div className='cointab-bg'>
            <div className='w-10/12 mx-auto pt-10 min-h-screen md:min-h-[85vh] cointab-bg'>
                <div className='text-center'>
                    <h1 className='text-4xl md:text-6xl font-bold text-primary '>Have a Look at our</h1>
                    <h2 className='text-3xl md:text-4xl font-semibold text-secondary font-Shantell mt-5'>Register user Database!</h2>
                </div>
                <div className='flex flex-col md:flex-row justify-center gap-5 mt-10'>
                    <button onClick={handleFetchData} className='coinBtn' disabled={loading}>{loading ? <SmallLoader /> : 'Fetch Users'}</button>
                    <Link to='/userdetails' className='coinBtn text-center'>
                        <button>User Details</button>
                    </Link>
                    <button onClick={handleDeleteData} className='coinBtn coinBtnDelete'>Delete Users</button>
                </div>
            </div>
        </div>
    );
};

export default Home;