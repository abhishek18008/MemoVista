import axios from 'axios';

const url='http://localhost:5000/posts';
const userurl='http://localhost:5000/user'
const token=JSON.parse(localStorage.getItem('profile'))?.token;
export const fetchPosts=()=> axios.get(url);
const config={
    headers:{Authorization:`Bearer ${token}`}
}
export const createPost=(newPost)=>axios.post(url,newPost,config);
export const updatePost=(id,updatedPost)=>axios.patch(`${url}/${id}`,updatedPost,{},config);
export const deletePost=(id)=>axios.delete(`${url}/${id}`,config);
export const likePost=(id)=>axios.patch(`${url}/${id}/likePost`,{},config);

export const jwtsignin=(signindata)=>axios.post(`${userurl}/signin`,signindata);
export const jwtsignup=(signupdata)=>axios.post(`${userurl}/signup`,signupdata);