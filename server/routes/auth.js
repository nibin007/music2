const router=require("express").Router();
const user=require("../models/user")

const admin=require("../config/firebase.config");



router.get("/login",async(req,res)=>{
    
   if(!req.headers.authorization){
    return res.status(500).send({message: "invalid token"})
   }
   const token=req.headers.authorization.split(" ")[1]
   //console.log(token)
    try{
         const decodeValue=await admin.auth().verifyIdToken(token) 
         if(!decodeValue){
            return res.status(505).json({message:"unauthorized access"})
         }else{
           //checking user exist or not
         //  console.log("yoo",decodeValue.user_id)

           const userExist=await user.findOne({"userID":decodeValue.user_id})           
           if(!userExist){
            //console.log("danger")
             newUserData(decodeValue,req,res);
           }else{
           //  console.log("hello")
                  updateUserData(decodeValue,req,res)  
           }
         }   
    }
    catch(err){
        return res.status(505).json({message:err})
    }


})
const newUserData=async(decodeValue,req,res)=>{
    const newUser=new user({
        name:decodeValue.name,
        email:decodeValue.email,
        imageUrl:decodeValue.picture,
        userID:decodeValue.user_id,
        email_verified:decodeValue.email_verified,
        role:"member",
        auth_time:decodeValue.auth_time
    })
 try{
    const saveUser=await newUser.save()
    res.status(200).send({user:saveUser})
 }catch(err){
        res.status(400).send({success:false,msg:err})
 }

}
const updateUserData=async(decodeValue,req,res)=>{
   const filter= {userID:decodeValue.user_id};
   const options={
    upsert:true,
    new:true
   }
try{
  const result=await user.findOneAndUpdate(
    filter,
    {auth_time :decodeValue.auth_time},
    options
  )
  res.status(200).send({user:result})

}
catch(err){
  res.status(400).send({success:false,msg:err})
}


}
router.get("/getUsers",async(req,res)=>{
  const userdata=await user.find().sort({
    createdAt : 1,

})
if(userdata){
  return res.status(200).send({success:true,data:userdata})
    
}
else{
  return res.status(400).send({success:false,msg:'DATA NOT FOUND'})
  
}
})

router.put("/updateRole/:userId",async(req,res)=>{
  const filter={_id:req.params.userId}
  const role=req.body.data.role;
  const options={
    upsert:true,
    new:true
  };

  
  try{
   const result=await user.findOneAndUpdate(filter,{role:role})
   return res.status(200).send({success:true,user:result})
   
  }catch(err){
    return res.status(400).send({success:false,msg:err})
    
  }
})

router.delete("/deleteUser/:userId",async(req,res)=>{
  const filter={_id:req.params.userId}


  const result=await user.deleteOne(filter)
  if(result.deletedCount===1){
    res.status(200).send({success:true,msg:"user removed"})
  }
  else{
    res.status(500).send({success:false,msg:"user not found"})
    
  }

})


module.exports= router;