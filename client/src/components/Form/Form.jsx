import React, { useState,useEffect } from 'react'
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { addPost,updatePost } from '../../features/postSlice';
import { useDispatch ,useSelector} from 'react-redux';
import * as api from '../../api/index.js'


const Form = ({currId ,setcurrId}) => {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    name: '',
    title: '',
    message: '',
    tags: '',
    selectedFile:''
  })
  const post=useSelector((state)=>currId ? state.post.posts.find((p)=>p._id==currId):null)

  useEffect(()=>{
    if(post) setPostData(post);
  },[post])

  const clear=()=>{
    setPostData({
      name: '',
      title: '',
      message: '',
      tags: '',
      selectedFile:''
    });
    setcurrId(null);
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(currId){
      api.updatePost(currId,postData);
      dispatch(updatePost({currId,postData}));
    }
    else{
      dispatch(addPost(postData));
    }
    clear();
  }

  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Typography variant="h6">{currId?'Editing':'Adding'} a Memory</Typography>
        <TextField name="name" variant="outlined" label="Name" fullWidth value={postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value })}/>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}>
            <FileBase 
            type="file" 
            multiple={false} 
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}


export default Form;