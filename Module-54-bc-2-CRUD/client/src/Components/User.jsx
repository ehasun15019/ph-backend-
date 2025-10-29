import React, { use, useState } from 'react'

const User = ({userPromise}) => {
    const initialUser = use(userPromise);
    const [user, setUser] = useState(initialUser)


    // this handleUser functionality is working for backend
    const handleAddUser = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;

        console.log(name, email);
        const newUser = {
            name, email
        }
        
        // save this user in database
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log("after saving data", data)

            if(data.insertedId) {
                /* try to call setUser */
                newUser._id = data.insertedId;
                const newUsers = [...user, newUser];
                setUser(newUsers)

                alert('user create successfully');
                e.target.reset()
            }
        })
    }

    // delete functionality start
    const handleDeleteUser = (id) => {
        console.log("delete a user", id)
    }

  return (
    <div>
        <form onSubmit={handleAddUser}>
            <input type="text" name='name' placeholder='name' required  className='bg-transparent border border-gray-400 mt-3 py-2 px-5 rounded'/>
            <br />
            <input type="email" name="email" placeholder='email' required id=""  className='bg-transparent border border-gray-400 mt-3 py-2 px-5 rounded'/>
            <br />
            <input type="submit" value="Add User" className='bg-yellow-400 px-5 py-1 text-black mt-3 cursor-pointer' />
        </form>

        <p>---------------</p>
        <div>
            {
                user.map((item) => {
                    return(
                     <div className='flex gap-3 space-y-3' key={item._id}>
                        <p>{item.name} : {item.email}</p>

                        <button 
                         className='bg-red-600 px-3 py-1 rounded-full cursor-pointer'
                         onClick={() => handleDeleteUser(item._id)}
                        >
                            x
                         </button>
                     </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default User