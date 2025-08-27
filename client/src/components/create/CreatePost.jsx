import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider.jsx';
import { API } from '../../service/api.js';

const initialPost = {
    title: '',
    description: '',
    image: '',
    category: '',
    username: '',
    createDate: new Date(),
}

const CreatePost = () => {
    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState(null);
    const { data } = useContext(DataContext);
    const location = useLocation();
    const url = post.image ? post.image : "create-blog-banner.jpg";

    useEffect(() => {
        const getImage = async () => {
            if (file && data?.username) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("username", data.username);

                try {
                    const response = await API.uploadFile(formData);
                    if (response?.data) {
                        setPost(prev => ({ ...prev, image: response.data.imageUrl }));
                    } else {
                        console.log("File upload failed:", response);
                    }
                } catch (error) {
                    console.error("Error uploading file:", error);
                }
            } else if (file && !data?.username) {
                console.log("Username not available for upload");
            }
        }
        getImage();
    }, [file, data]);

    useEffect(() => {
        setPost(prev => ({
            ...prev,
            category: location.search?.split('=')[1] || 'All',
            username: data?.username || ''
        }));
    }, [location.search, data]);

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    return (
        <div className="mx-12 my-12">
            <img src={url} alt="banner" className="w-full h-[60vh] object-cover" />

            <form className="flex flex-row mt-2">
                <label htmlFor="File Input" className="cursor-pointer">
                    📷 Upload Image
                </label>

                <input 
                    type='file' 
                    id='File Input' 
                    style={{ display: 'none' }} 
                    onChange={(e) => setFile(e.target.files[0])} 
                />

                <input 
                    type="text" 
                    placeholder='Title' 
                    onChange={handleChange} 
                    name='title' 
                    className="flex-1 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 px-2 py-1"
                />

                <button 
                    type="button" 
                    className="h-12 rounded-sm text-white bg-orange-600 hover:bg-orange-700 px-4 py-2"
                >
                    Publish
                </button>
            </form>

            <textarea 
                minLength={5}
                placeholder='Tell your Experience....'
                name='description'
                onChange={handleChange} 
                className="w-full mt-5 p-2 border border-gray-300 rounded"
            />
        </div>
    )
}

export default CreatePost;
