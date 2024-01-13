// import React from 'react'
// import {useState } from 'react'
// import postServices from '../../services/postServices'
// function Home() {
//   const [title , setTitle] = useState('')
//   const [date , setDate] = useState('')
//   const [image , setImage] = useState('')
//   const [message , setMessage] = useState('')

//   const handlesubmit = async (e) => {
//     e.preventDefault()
//     const formData = new FormData()
//     formData.append('title' , title)
//     formData.append('date' , date)
//     formData.append('image' , image)
//     const response = await postServices.create(formData)
//     e.target.reset()

//     if(response.data.success === true){
//       setMessage('Post created successfully')
//   }else{
//     setMessage('Post created failed')
//   }

//   setTimeout(() => {
//     setMessage('')
//   }, 2000)
//   }
//   return (
//     <>
//       <h1>SIGNUP</h1>
//       <form onSubmit={handlesubmit}> 
//         <input type='text'
//           name='title'
//           placeholder='Enter title'
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//         <br/>
//         <input type='date'
//           name='date'
//           onChange={(e) => setDate(e.target.value)}
//           required
//         />
//         <br/>
//         <input type='file'
//           name='image'
//           onChange={(e) => setImage(e.target.files[0])}
//           required
//         />
//         <br/>
//         <button type='submit'>Submit</button>
//       </form>
//       <p>{message}</p>
//     </>
//   )
// }

// export default Home




// RegisterForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/register', { email, password });
            const { token, role } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('role', role);

            // Chuyển hướng đến trang phù hợp dựa trên vai trò
            // navigate(role === 'admin' ? '/admin' : '/home');
        } catch (error) {
            console.error('Registration failed', error.response.data);
            setError('Registration failed');
        }
    };

    return (
        <div>
            <h2>Register Form</h2>
            <div>
                <label>Email:</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={handleRegister}>Register</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default SignUp;
