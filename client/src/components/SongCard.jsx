import React, { useState } from 'react'
import {motion} from "framer-motion"
import {IoTrash} from 'react-icons/io5'
import { deleteAlbum, deleteArtistById, deleteSong, getAllAlbums, getAllArtists, getAllSongs } from '../api'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import { storage } from '../config/firebase.config'
import { deleteObject, ref } from 'firebase/storage'
function SongCard({data,index,type}) {
//  console.log("yoooo",data)
const [IsDelete, setIsDelete] = useState(false)
 const[{alertType,allSongs,allArtists,allAlbums,songIndex,isSongPlaying},dispatch]=useStateValue()
const deleteData=(data)=>{
//  setIsDelete(true)
if(type==="song"){
  const deleteRef=ref(storage,data.imageURL)
  deleteObject(deleteRef).then(()=>{
    
 console.log("deleted")
  })
  

  
  deleteSong(data._id).then((res)=>{
    if(res.data){
        dispatch({
          type:actionType.SET_ALERT_TYPE,
          alertType:"success"
        })
        setInterval(()=>{
          dispatch({
            type:actionType.SET_ALERT_TYPE,
            alertType:null
          })     
        },3000)
        getAllSongs().then((data)=>{
          //console.log(data)
          dispatch({
            type: actionType.SET_ALL_SONGS,
            allSongs:data.song,
           })
        })


    }
    else{
      dispatch({
        type:actionType.SET_ALERT_TYPE,
        alertType:"danger"
      })
      setInterval(()=>{
        dispatch({
          type:actionType.SET_ALERT_TYPE,
          alertType:null
        })     
      },3000)

    }
  })
}
if(type==="album"){
  console.log(data,"yo")
  
    const deleteRef=ref(storage,data.imageURL)
    deleteObject(deleteRef).then(()=>{
      
   console.log("deleted")
    })
    
  
    
    deleteAlbum(data._id).then((res)=>{
      if(res.data){
          dispatch({
            type:actionType.SET_ALERT_TYPE,
            alertType:"success"
          })
          setInterval(()=>{
            dispatch({
              type:actionType.SET_ALERT_TYPE,
              alertType:null
            })     
          },3000)
          getAllAlbums().then((data)=>{
            //console.log(data)
            dispatch({
              type: actionType.SET_ALL_ALBUMS,
              allAlbums:data.album,
             })
          })
  
  
      }
      else{
        dispatch({
          type:actionType.SET_ALERT_TYPE,
          alertType:"danger"
        })
        setInterval(()=>{
          dispatch({
            type:actionType.SET_ALERT_TYPE,
            alertType:null
          })     
        },3000)
  
      }
    })
  }
if(type==="artist"){

  const deleteRef=ref(storage,data.imageURL)
  deleteObject(deleteRef).then(()=>{
    
 console.log("deleted")
  })
  

  
  deleteArtistById(data._id).then((res)=>{
    if(res.data){
        dispatch({
          type:actionType.SET_ALERT_TYPE,
          alertType:"success"
        })
        setInterval(()=>{
          dispatch({
            type:actionType.SET_ALERT_TYPE,
            alertType:null
          })     
        },3000)
        getAllArtists().then((data)=>{
          //console.log(data)
          dispatch({
            type: actionType.SET_ALL_ARTISTS,
            allArtists:data.artist,
           })
        })


    }
    else{
      dispatch({
        type:actionType.SET_ALERT_TYPE,
        alertType:"danger"
      })
      setInterval(()=>{
        dispatch({
          type:actionType.SET_ALERT_TYPE,
          alertType:null

        })     
      },3000)

    }
  })

}
  

}

const addToContext=()=>{
  // console.log("playing")
      if(!isSongPlaying){
        console.log("uyo")
        dispatch({
          type:actionType.SET_ISSONG_PLAYING,
          isSongPlaying:true
        })
      }
      if(songIndex!==index){
        console.log(index)
        dispatch({
          type:actionType.SET_SONG_INDEX,
          songIndex:index,
        })
      }

}

return (
    <motion.div  className='relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center '
    
    onClick={type==='song'&& addToContext}
    >
      <div className='w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden'>
        <motion.img whileHover={{scale:1.05}} src={data?.imageURL} className='w-full h-full object-cover rounded-lg'/>
      </div>    
       <p className='text-base text-center text-headingColor font-semibold my-2'>
        {data?.name}
        {data.artist &&(
         
       <span className='block text-sm text-gray-400 my-1 '>
       {data?.artist} 
       </span>

        )}
       </p>

       <div className='w-full absolute bottom-2 right-2 flex items-center justify-between px-4 '>
        <motion.i whileTap={{scale:0.75}} className='text-base text-red-400 drop-shadow-md marker:hover:text-red-600'
        onClick={()=>setIsDelete(true)}
        >
          <IoTrash/>
        </motion.i>
       </div>
{IsDelete &&( 
   <motion.div className='absolute inset-0 backdrop-blur-md bg-cardOverlay flex flex-col items-center justify-center px-4 py-2 gap-0' 
   initial={{opacity:0}}
   animate={{opacity:1}}

   >
       <p className='text-lg text-headingColor font-semibold text-center'>Are you sure do you want to delete it?</p>
   <div className='flex items-center gap-4'>
<motion.button className='px-2 py-1 text-sm uppercase rounded-md bg-red-300 hover:bg-red-500' onClick={()=>deleteData(data)} whileTap={{scale:0.7}}>yes</motion.button>
<motion.button className='px-2 py-1 text-sm uppercase bg-green-300 hover:bg-green-500 cursor-pointer' whileTap={{scale:0.7}} onClick={()=>setIsDelete(false)}>no</motion.button>
   
   </div>
   
   </motion.div>
)}

      
    </motion.div>
  )
}

export default SongCard