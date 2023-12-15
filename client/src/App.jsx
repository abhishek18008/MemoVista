import { useEffect ,useState} from 'react';
import {Container,AppBar,Typography,Grow,Grid} from '@material-ui/core';

import memories from './images/memories.jpg'
import Posts from './components/Posts/Posts.jsx';
import Form from './components/Form/Form.jsx';
import useStyles from './styles.js'
import {useSelector,useDispatch} from 'react-redux'
import { loadposts } from './features/postSlice.js';
import * as api from './api/index.js'

function App() {
  const [currId,setcurrId]=useState(null);
  const classes=useStyles();
  const dispatch=useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.fetchPosts();
        dispatch(loadposts(data));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
  
    fetchData(); 
  }, []);
  
  return (
    <Container maxWidth="lg">
        <AppBar className={classes.appBar} position='static' color='inherit'>
          <Typography className ={classes.heading} variant='h2' align='center'>Memories</Typography>
          <img src={memories} alt="memories" height='60'/>
        </AppBar>
        <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setcurrId={setcurrId}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currId={currId} setcurrId={setcurrId}/>
            </Grid>
          </Grid>
        </Container>
        </Grow>
    </Container>
  )
}

export default App
