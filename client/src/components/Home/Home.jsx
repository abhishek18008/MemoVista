import { useEffect ,useState} from 'react';
import {Container,Grow,Grid} from '@material-ui/core';
import Posts from '../../components/Posts/Posts.jsx';
import Form from '../../components/Form/Form.jsx';
import {useSelector,useDispatch} from 'react-redux'
import { loadposts } from '../../features/postSlice.js';
import * as api from '../../api/index.js'

const Home = () => {
  const [currId, setcurrId] = useState(null);
//   const classes = useStyles();
  const dispatch = useDispatch();

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
    <Grow in>
      <Container>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setcurrId={setcurrId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currId={currId} setcurrId={setcurrId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
