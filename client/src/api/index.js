import axios from "axios";

const baseURL="http://localhost:4000/";
export const validateUser=async(token)=>{
   // console.log(token)
    try{
         const  res=await axios.get(`${baseURL}api/users/login`,{headers:{
            Authorization:"Bearer "+token,
         }})

         return res.data;
        } 
  catch(err){

  }

};

export const getAllUsers=async()=>{
    try{
 const res= await axios.get(`${baseURL}api/users/getUsers`)
// console.log("yyoooo")
    return res.data;    
}catch(err){
      return null;
    }
}

export const getAllAlbums=async()=>{
   try{
const res= await axios.get(`${baseURL}api/albums/getAll`)

   return res.data;    
}catch(err){
   //console.log("hello")
     return null;
   }
}
export const getAllArtists=async()=>{
   try{
const res= await axios.get(`${baseURL}api/artist/getAll`)
//console.log(res)
   return res.data;    
}catch(err){
   
     return null;
   }
}
export const getAllSongs=async()=>{
   try{
const res= await axios.get(`${baseURL}api/songs/getAll`)
   return res.data;    
}catch(err){
     return null;
   }
}

export const changingUserRole =async(userId,role)=>{
   try{
  const res=axios.put(`${baseURL}api/users/updateRole/${userId}`,{data:{role:role}})
  return res

}



   catch(err){
  return null
   }
}

export const removeUser=async(userId)=>{
   try{
      const res=axios.delete(`${baseURL}api/users/deleteUser/${userId}`)
     return res;
   }catch(err){
    return null;
   }
}


export const saveNewSong=async(data)=>{
  // console.log("datass", data)
   try{
      const res = axios.post(`${baseURL}api/songs/save`, { ...data });
      return (await res).data.savedSong
      ;

   }
   catch(err){
      return null;
   }
}
 export const SaveNewArtist=async(data)=>{
   try{
      const res = axios.post(`${baseURL}api/artist/save`, { ...data });
      return (await res).data.savedArtist
      ;

   }
   catch(err){
      return null;
   }

 }

  export const saveNewAlbum=async(data)=>{
    try{
      
      const res = axios.post(`${baseURL}api/albums/save`, { ...data });
      return (await res).data.savedAlbum
      ;

    }catch(err){
        return null;
    }
  }

  export const deleteSong=async(id)=>{
   try{
      
      const  res = axios.delete(`${baseURL}api/songs/delete/${id}`);
      return  res;

    }catch(err){
        return null;
    }     
  }

  export const deleteAlbum=async(id)=>{
   try{
      //console.log(id)
      const  res = axios.delete(`${baseURL}api/albums/delete/${id}`);
      return  res;

    }catch(err){
        return null;
    }     
  }
  export const deleteArtistById=async(id)=>{
   try{
      
      const  res = axios.delete(`${baseURL}api/artist/delete/${id}`);
      return  res;

    }catch(err){
        return null;
    }     
  }
