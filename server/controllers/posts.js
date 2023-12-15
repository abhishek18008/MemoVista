
import PostMessage from '../models/postMessages.js'

export const getPosts=async (req,res)=>{
    try {
        const postMessages=await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const createPost=async(req,res)=>{
    const post=req.body;
    const newPost=new PostMessage(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message:error.message})
    }
}

export const updatePost=async (req,res)=>{
    const _id=req.params.id;
    const post=req.body;
    try {
        const updatedPost=await PostMessage.findByIdAndUpdate(_id,post,{new:true});
        res.json(updatedPost);
    }catch (error) {
        console.log(error.message);
        res.status(404).json({message:`error connecting${error}`})
    }
}

export const deletePost=async(req,res)=>{
    const _id=req.params.id;
    try {
        const deleteres=await PostMessage.findByIdAndDelete(_id);
        res.json(deleteres);
    } catch (error) {
        console.log(error);
        res.status(404).json({message:`${error}`})
    }
}


export const likePost=async(req,res)=>{
    try {
        const id=req.params.id;
        const post=await PostMessage.findById(id);
        const updatedPost=await PostMessage.findByIdAndUpdate(id,{likeCount:post.likeCount+1},{new:true});
        res.json(updatedPost);      
    } catch (error) {
        console.log(error);
        res.status(404).json({message:`${error}`})
    }
}