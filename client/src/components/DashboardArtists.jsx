import React, { useEffect } from 'react'
import { useStateValue } from '../context/StateProvider'
import { getAllArtists } from '../api'
import { actionType } from '../context/reducer'
import SongCard from './SongCard'

function DashboardArtists() {
  const[{allArtists},dispach]=useStateValue()
  useEffect(()=>{
    if(!allArtists){
     getAllArtists().then((data)=>{
        dispach({
          type:actionType.SET_ALL_ARTISTS,
          allArtists:data.artist
        })
      })
    }


},[])
  return (
    <div className='w-full p-4 flex items-center justify-center flex-col'>

<div className='relative w-full my-8 py-16 p-4 border border-gray-300  rounded-md '>
 

   <ArtistContainer data={allArtists}/>
   
   </div>


    </div>
  )
}
export const ArtistContainer=({data})=>{
  return(
    <div className='w-full flex flex-wrap gap-3 items-center justify-evenly  '>
       {data && data.map((song,i)=>(
        <SongCard key={song._id} data={song} index={i} type="artist"
        />
        
       
       
       ))}
    </div>
  )
  
  }

export default DashboardArtists