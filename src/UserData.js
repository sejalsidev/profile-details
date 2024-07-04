import React, { useState } from 'react'

const UserData = () => {
    const [data, setData] = useState([])
    const handleEdit = () => {

    }

    const handleDelete = () => {

    }

    return (
        <>
            <div>
                <table className='table text-center'>
                    <thead>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Gender</th>
                        <th>Language</th>
                        <th>Date</th>
                        <th>Image</th>
                    </thead>
                    <tbody>
                        {data?.map((profile, index) => (
                            <tr key={index}>
                                <td>{profile.name}</td>
                                <td>{profile.email}</td>
                                <td>{profile.phoneno}</td>
                                <td>{profile.gender}</td>
                                <td>{profile.language}</td>
                                <td>{profile.date.toDateString()}</td>
                                <td><img src={URL.createObjectURL(profile.image)} style={{ width: "100px", height: "100px" }} /></td>
                                <td><button type="submit" onClick={() => handleEdit(profile, index)}>Edit</button></td>
                                <td><button type="submit" onClick={() => handleDelete(index)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default UserData