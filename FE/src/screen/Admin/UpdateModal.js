import {useState } from 'react'
import {Modal, Button} from 'react-bootstrap'
import postServices from '../../services/postServices'

function UpdateModal (props) {

    const [isShow , invokeShow] = useState(false)
    // cloes modal
    const initModal = () => {
       return invokeShow(!isShow)
    }

    //form updation data
    const [title , setTitle] = useState(props.title)
    const [date , setDate] = useState(props.date)
    const id = useState(props.id)
    const [selectFile , setSelectedFile] = useState('')
    
    // submit form
    const handlesubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title' , title)
        formData.append('date' , date)
        formData.append('id' , id)
        
       
        if (selectFile !== '' && selectFile.length !== 0){
        formData.append('image' , selectFile);
        }
        const response = await postServices.update(formData);
        if (response.data.success === true){
            alert(response.data.msg);
            
        }
        else{
            alert(response.data.msg);
        }
    
        initModal();
        
    }

    return (
        <>
        <Button variant="success" onClick={initModal}>
            sửa
        </Button>

        <Modal show={isShow}>
            <Modal.Header closeButton onClick={initModal}>
                <Modal.Title>Chỉnh sửa</Modal.Title>
            </Modal.Header>
            <form onSubmit={handlesubmit}>
                <Modal.Body>
                   <input type='text'
                   name='title'
                   placeholder='Enter Post Title'
                   value={title}
                   onChange={ e => setTitle(e.target.value)}
                   required
                   />
                   <br/>

                   <input type='date'
                   name='date'
                   placeholder='Enter Post Date'
                   value={date}
                   onChange={ e => setDate(e.target.value)}
                   required
                   />
                   <br/>

                   <input type='file'
                   name='file'
                   placeholder='Enter Post Image'
                   onChange={ e => setSelectedFile(e.target.files[0])}
                   required
                   />
                   <br/>

                </Modal.Body>
            
            <Modal.Footer>
                <Button variant='danger' onClick={initModal}>
                    Đóng
                </Button>
                <Button type='submit' variant='dark'>
                    Chỉnh sửa
                </Button>
            </Modal.Footer>
            </form>
        </Modal>
        </>
    );

}

export default UpdateModal;