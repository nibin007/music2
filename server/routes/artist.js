const router=require('express').Router();

//artist model
const artist=require("../models/artist");


router.post("/save",async (req,res)=>{
     const newArtist=artist(
        {
            name:req.body.name,
            imageURL:req.body.imageURL,
            twitter:req.body.twitter,
            instagram:req.body.instagram
        });
       try{
         const savedArtist=  await newArtist.save()
         return res.status(200).send({success:true,artist:savedArtist})
       }
       catch(err){
            return res.status(400).send({success:false,msg:err})
       }
        
})

router.get("/getOne/:id",async(req,res)=>{
  const filter={
    _id:req.params.id
  };
 const data=await artist.findOne(filter)
 if(data){
    return res.status(200).send({success:true,artist:data})

 }
 else{
    return res.status(400).send({success:false,msg:'DATA NOT FOUND'})
 }
});

router.get("/getAll",async(req,res)=>{
      const options={
        sort: {
            createdAt : 1,

        },
      };
      const data=await artist.find().sort({
        createdAt : 1,

    });
      console.log(data)
      if(data){
       return res.status(200).send({success:true,artist:data})
    
     }
     else{
        return res.status(400).send({success:false,msg:'DATA NOT FOUND'})
     }
})


router.delete("/delete/:id",async(req,res)=>{
  const filter={_id:req.params.id}
  const result=await artist.deleteOne(filter);
  if(result){
    return res.status(200).send({success:true,msg:"data deleted",data:result})

 }
 else{
    return res.status(400).send({success:false,msg:'DATA NOT FOUND'})
 }
})



router.put("/update/:id",async(req,res)=>{
  const filter= {_id:req.params.id};
  const options={
   upsert:true,
   new:true
  };
try{
 const result= await artist.findOneAndUpdate(filter,{

      
          name:req.body.name,
          imageURL:req.body.imageURL,
          twitter:req.body.twitter,
          instagram:req.body.instagram
      
  },options
  
  )
return res.status(200).send({success:true,data:result})

}
catch(err){
 return res.status(400).send({success:false,error:err})
}  
})

module.exports=router