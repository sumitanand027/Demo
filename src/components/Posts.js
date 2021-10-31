import React from 'react';
import Dot from './Dot';
const Posts = ({ events, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    // <ul className='list-group mb-4'>
    //   {posts.map(post => (
    //     <li key={post.id} className='list-group-item'>
    //       {post.title}
    //     </li>
    //   ))}
    // </ul>

    <ul style={{ "listStyleType": "none" }} >
        {events.map((color) => (
            <li key={color.id} >
                {console.log(color)}
                <Dot startingDate={color.StartingDate} event={color.event} />
            </li>
        ))}
    </ul>
  );
};

export default Posts;