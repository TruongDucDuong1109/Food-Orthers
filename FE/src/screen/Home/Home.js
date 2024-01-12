import React from 'react'
import {useState , useEffect} from 'react'
import postServices from '../../services/postServices'
function Home() {
  const [title , setTitle] = useState('')
  const [date , setDate] = useState('')
  const [image , setImage] = useState('')
  const [message , setMessage] = useState('')

  const handlesubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title' , title)
    formData.append('date' , date)
    formData.append('image' , image)
    const response = await postServices.create(formData)
    e.target.reset()

    if(response.data.success == true){
      setMessage('Post created successfully')
  }else{
    setMessage('Post created failed')
  }

  setTimeout(() => {
    setMessage('')
  }, 2000)
  }
  return (
    <>
      <h1>Home</h1>
      <form onSubmit={handlesubmit}> 
        <input type='text'
          name='title'
          placeholder='Enter title'
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br/>
        <input type='date'
          name='date'
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <br/>
        <input type='file'
          name='image'
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <br/>
        <button type='submit'>Submit</button>
      </form>
      <p>{message}</p>
    </>
  )
}

export default Home
