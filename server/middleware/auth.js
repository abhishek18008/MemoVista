import jwt from 'jsonwebtoken';

//wants to like a post
//click the like button =>auth middleware(next)=>like controller

const auth=async(req,res,next)=>{
    try {
        console.log("the req body obj is",req.body);
        console.log("the req headers obj is",req.headers);
        
        const token=req.headers.authorization.split(' ')[1];
  
        const isCustomAuth=token.length<500;

        if(token && isCustomAuth){
            const decodedData=jwt.verify(token,'test');
            req.userId=decodedData?.id;
        }
        console.log(req.userId);
        next();
    } catch (error) {
        console.log(error);
    }
}


export default auth;