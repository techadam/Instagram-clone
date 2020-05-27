import React,{useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {UserContext} from '../reducers/UserContext';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useContext(UserContext);

    useEffect(() => {
        (async() => {
            try {
                const result = await axios.get(`http://localhost:5000/posts/all`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
                console.log(result.data.posts);
                setPosts((result.data.posts).reverse());
            }catch(error) {
                console.log(error.response);
            }
        })();
    }, []);

    const likedPost = (postLikes) => {
        const isLiked = postLikes.find(likedBy => (likedBy === user._id));
        if(isLiked) {
            return true;
        }
        return false;
    }

    const handleLike = async(postId, postLikes) => {
        let url = `http://localhost:5000/posts/like`;
        
        const isLiked = likedPost(postLikes);
        if(isLiked) url = `http://localhost:5000/posts/unlike`;
        
        try {
            const result = await axios.put(`${url}`, {postId}, {headers: {Authorization: `Bearer ${localStorage.getItem(`token`)}`}});
            //console.log(result);
            let newPosts = posts;
            const indexToUpdate = newPosts.findIndex(post => (post._id === postId));
            newPosts[indexToUpdate].likes = result.data.likes;
            
            //update state
            setPosts([...newPosts]);

        }catch(error) {
            console.log(error.response);
        }
    }

    
    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-8">
                    {
                        posts.map(post => {
                            return (
                                <div className="card mb-5" key={post._id}>
                                    <div className="card-header bg-white">
                                        <h5>{post.postedBy.name}</h5>
                                    </div>
                                    <img src={post.photo} alt="" width="100%" />
                                    <div className="card-body">
                                        <div className="feed-info">
                                            <div onClick={() => handleLike(post._id, post.likes)}><span className={`ti ti-heart ${likedPost(post.likes)? 'text-danger' : ''}`}></span></div>
                                            <div><span className={`ti ti-comment`}></span> 10</div>
                                        </div>

                                    <div className="mb-2"><span>{post.likes.length} likes </span></div>
                                        <h5 className="card-title">{post.title}</h5>
                                        <p className="card-text">{post.body}</p>
                                    </div>
                                    <div className="card-footer px-0 py-0">
                                        <input className="card-comment" placeholder="Add a comment" type="text" />
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Home;