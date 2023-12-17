import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import * as api from '../../../api/index.js'
import { deletePost,likePost } from '../../../features/postSlice.js';

const Post = ({ post,setcurrId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleDelete=async()=>{
    try {
      console.log('deleting',post._id);
      await api.deletePost(post._id);
      dispatch(deletePost(post._id));
    } catch (error) {
      console.log(error);
    }
  }


  const handleLike=async()=>{
    try {
      console.log('increasing like count by 1',post._id)
      dispatch(likePost(post._id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
      
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>

      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={()=>setcurrId(post._id)}>
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>

      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>

      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={handleLike}><ThumbUpAltIcon fontSize="small" /> Like {post.likes.length} </Button>
        <Button size="small" color="primary" onClick={handleDelete}><DeleteIcon fontSize="small" /> Delete</Button>
      </CardActions>
    </Card>
  );
};

export default Post;