import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postsActions } from "../../redux/postActions";
import './PostList.scss';
import { useNavigate, Link } from "react-router-dom";
import SearchBar from "../../component/SearchBar/SearchBar";


function PostList() {
  const dispatch = useDispatch();
  const { dataAllPosts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(postsActions.getAll(1));
    console.log(dataAllPosts);
  }, [dispatch]);

  return (
    <div class="container text-center">

      <h1 class="heading">See lasted post</h1>
      
      <div class="box-container">
        {dataAllPosts.map((post) => (
          <div class="box col-md-6 col-lg-4">
            <div class="image">
              <img src={post.posts_image} alt="" />
            </div>
            <div class="content">
              <h3>{post.posts_title}</h3>

              <Link to={`/detail-post/${post.posts_id}`} class="btn">
                Read More
              </Link>
              <div class="icons">
                <span> <i class="fas fa-calendar"></i> {new Date(post.posts_create_date).toISOString().slice(0, 10).replace(/-/g, '/')} </span>
                <span> <i class="fas fa-user"></i> by {post.posts_create_user} </span>
              </div>
            </div>
          </div>
        ))}

      </div>

      

    </div>



  );
}

export default PostList;
