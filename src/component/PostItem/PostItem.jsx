import React from 'react'

const PostItem = ({post}) => {
  return (
   <div className="postItem-wrap">
    <img src={post.posts_image} alt="cover" />
   </div>
  )
}

export default PostItem