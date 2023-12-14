import Post from './Post/Post.jsx';
import useStyles from './styles.js'
import {useSelector} from 'react-redux';


const Posts = () => {
  const posts=useSelector((state)=>state.posts)
  const classes=useStyles();

  console.log(posts);
  return (
    <>
    <h1 className={classes.something}>POSTS </h1>
      <Post/>
      <Post/>
      <Post/>
    </>
  )
}

export default Posts