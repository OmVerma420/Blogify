import {Box, styled , Button ,FormControl, InputBase, TextareaAutosize} from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider.jsx';
import {API} from '../../service/api.js'

const Container = styled(Box)`
margin : 50px 100px
`

const Image = styled("img")({
    width: "100%",
    height: "60vh",
    objectFit:"cover",

})

const Form = styled(FormControl)`
display : flex;
flex-direction : row;
margin-top : 10px;
`
const Input = styled(InputBase)`
flex: 1;
margin: 0 30px;
font-size: 25px;
`
const Textarea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 20px;
  font-size: 18px;
  border: none;
  outline: none;
  resize: none;
  font-family: inherit;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 6px;
`
const initialPost = {
    title: '',
    description: '',
    image: '',
    category:'',
    username:'',
    createDate: new Date(),
}
const CreatePost = () => {

    const [post , setPost] = useState(initialPost);
    const [file , setFile] = useState(null)

    const {data} = useContext(DataContext)

    const location = useLocation();

    const url = post.image? post.image :"create-blog-banner.jpg"

    useEffect(()=> {
        const getImage = async () => {
            if(file){
                const formData = new FormData();
                formData.append("name",file.name);
                formData.append("file", file);

                //API call
                try {
                    const response = await API.uploadFile(formData);
                    if (response?.data) {
                        setPost(prev => ({ ...prev, image: response.data }));
                    } else {
                        console.log("File upload failed:", response);
                    }
                } catch (error) {
                    console.error("Error uploading file:", error);
                }
            }
            else{
                console.log("No file selected");
            }
        }
        getImage();
        
    },[file])

    useEffect(() => {
        setPost(prev => ({
            ...prev,
            category: location.search?.split('=')[1] || 'All',
            username: data?.username || ''
        }));
    }, [location.search, data]);

    const handleChange = (e) => {
        setPost({...post ,[e.target.name]:[e.target.value] })
    }
    return (
        <Container>
            <Image src={url} alt="banner" />

            <Form>
                <label 
                htmlFor="File Input">
                    <AddPhotoAlternateIcon fontSize='large' color='action' />
                </label>

                <input 
                type='file' 
                id='File Input' 
                style={{display: 'none'}} onChange={(e) => setFile(e.target.files[0])} />

                <Input 
                placeholder='Title' 
                onChange={handleChange} 
                name='title'/>

                <Button variant='contained'>
                    Publish
                </Button>
        
            </Form>
            <Textarea 
                minLength={5}
                placeholder='Tell your Experience....'
                name='description'
                onChange={handleChange} 
                />
        </Container>
    )

        
}

export default CreatePost;