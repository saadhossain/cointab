import React from 'react';

const DisplayUsersDetails = ({user}) => {
    const {name, email, phone, gender,location, picture} = user;
    return (
        <tbody>
            <tr className="border-b border-opacity-20 border-gray-700 bg-gray-800">
                <td className="p-3">
                    <img src={picture} alt={name} className='w-12 h-12 rounded'/>
                </td>
                <td className="p-3">
                    <p>{name}</p>
                </td>
                <td className="p-3">
                    <p>{email}</p>
                </td>
                <td className="p-3">
                    <p>{phone}</p>
                </td>
                <td className="p-3">
                    <p>{location}</p>
                </td>
                <td className="p-3">
                    {gender}
                </td>
            </tr>
        </tbody>
    );
};

export default DisplayUsersDetails;