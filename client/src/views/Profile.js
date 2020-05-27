import React, {useContext, useState, useEffect} from 'react';
import {UserContext} from '../reducers/UserContext';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useContext(UserContext);
    const [myposts, setMyPosts] = useState([]);

    useEffect(() => {
        (async() => {
            try {
                const result = await axios.get(`http://localhost:5000/posts`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
                setMyPosts(result.data.posts);
            }catch(error) {
                console.log(error);
            }
        })();
    })

    return (
        <div className="container">
            <div className="profile-info py-5">
                <div className="row justify-content-center">
                    <div className="col-md-2">
                        <div className="profile-img">
                            <div className="profile-img-inner">
                                <div className="img" style={{backgroundImage: "url(https://images.pexels.com/photos/4064817/pexels-photo-4064817.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)"}}></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 px-5">
                        <h3 className="mt-2">{user? user.name : 'Fetching'}</h3>
                        <div className="grid my-2">
                            <div>
                                <h5>44 posts</h5>
                            </div>
                            <div>
                                <h5>61k followers</h5>
                            </div>
                            <div>
                                <h5>1887 following</h5>
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-gradient px-5">Follow</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="feed-section mt-2 border-top pt-5">
                <div className="feed-grid">
                    {
                        myposts.map(post => {
                            return (
                                <div className="feed" key={post._id}>
                                    <div className="feed-img" style={{backgroundImage: `url(${post.photo})`}}></div>
                                    <div className="feed-info">
                                        <div><span className="ti ti-heart"></span> <span>5.2k</span></div>
                                        <div><span className="ti ti-comment"></span> <span>10</span></div>
                                    </div>
                                </div>
                            );
                        })
                    }
                    {/*<div className="feed">
                        <div className="feed-img" style={{backgroundImage: "url(https://images.pexels.com/photos/2265082/pexels-photo-2265082.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)"}}></div>
                        <div className="feed-info">
                            <div><span className="ti ti-heart"></span> <span>5.2k</span></div>
                            <div><span className="ti ti-comment"></span> <span>10</span></div>
                        </div>
                    </div>

                    <div className="feed">
                        <div className="feed-img" style={{backgroundImage: "url(https://images.pexels.com/photos/4273439/pexels-photo-4273439.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)"}}></div>
                        <div className="feed-info">
                            <div><span className="ti ti-heart"></span> 5.2k</div>
                            <div><span className="ti ti-comment"></span> 10</div>
                        </div>
                    </div>

                    <div className="feed">
                        <div className="feed-img" style={{backgroundImage: "url(https://images.pexels.com/photos/3608533/pexels-photo-3608533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)"}}></div>
                        <div className="feed-info">
                            <div><span className="ti ti-heart"></span> 5.2k</div>
                            <div><span className="ti ti-comment"></span> 10</div>
                        </div>
                    </div>

                    <div className="feed">
                        <div className="feed-img" style={{backgroundImage: "url(https://images.pexels.com/photos/2954199/pexels-photo-2954199.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)"}}></div>
                        <div className="feed-info">
                            <div><span className="ti ti-heart"></span> 5.2k</div>
                            <div><span className="ti ti-comment"></span> 10</div>
                        </div>
                    </div>

                    <div className="feed">
                        <div className="feed-img" style={{backgroundImage: "url(https://images.pexels.com/photos/2909067/pexels-photo-2909067.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)"}}></div>
                        <div className="feed-info">
                            <div><span className="ti ti-heart"></span> 5.2k</div>
                            <div><span className="ti ti-comment"></span> 10</div>
                        </div>
                    </div>*/}
                </div>
            </div>
        </div>
    );
}

export default Profile;