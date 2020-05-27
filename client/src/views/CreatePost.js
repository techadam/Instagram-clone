import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import iziToast from 'izitoast';

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [photo, setPhoto] = useState("");

    const handleImageUpload = async (e) => {
        
    }

    const handlePostSave = async(e) => {
        e.preventDefault();
        
        if(!image || !title || !body) {
            iziToast.show({
                color: 'red',
                position: 'topRight',
                message: "All fields are required",
            });
            return
        }

        const imageData = new FormData();
        imageData.append('file', image);
        imageData.append('upload_preset', 'insta-clone');
        imageData.append('cloud', 'coderesource');

        try {
            const result = await axios.post(`https://api.cloudinary.com/v1_1/coderesource/image/upload`, imageData);
            console.log(result)
            setPhoto(result.data.url)
        }catch(error) {
            console.log(error.response);
            iziToast.show({
                color: 'red',
                position: 'topRight',
                message: error.response.data.error.message,
            });
        }
    }

    useEffect(() => {
        //Upload post to the server
        if(photo) {
            (async() => {
                try {
                    const result = await axios.post(`http://localhost:5000/posts/create`, 
                        {title, body, photo},
                        {headers: {Authorization: `Bearer ${localStorage.getItem(`token`)}`}}
                    );
                    console.log(result)

                    //Clear state
                    setTitle('');
                    setBody('');
                    setPhoto('');
                    setImage('');

                    iziToast.show({
                        color: 'blue',
                        position: 'topRight',
                        message: 'Post created',
                    });
                }catch(error) {
                    console.log(error.response)
                }
            })();
        }
    }, [photo])
    
    return (
        <div className="container py-4">
            <div className="row">
                <div className="col-md-8">
                    <h4 className="mb-3">Create Post</h4>
                    <form onSubmit={handlePostSave}>
                        <div className="form-group">
                            <label>Post title</label>
                            <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title" />
                        </div>

                        <div className="form-group">
                            <label>Post content</label>
                            <textarea className="form-control" rows="7" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Post content"></textarea>
                        </div>

                        <div className="form-group create-photo-grid">
                            <label className="post-photo">
                                <span className="ti ti-plus"></span>
                                <input type="file" onChange={(e) => setImage(e.target.files[0])} className="post-file-input" />
                                <p>Add photo</p>
                            </label>
                        </div>

                        <div className="form-group">
                            <button className="btn btn-gradient btn-block">Submit post</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;