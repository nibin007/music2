import React, { useEffect } from 'react'
import { useStateValue } from '../context/StateProvider'
import { getAllAlbums, getAllArtists } from '../api'
import { actionType } from '../context/reducer'
import SongCard from './SongCard'

function DashboardAlbums() {
  const[{allAlbums},dispach]=useStateValue()
  useEffect(()=>{
    if(!allAlbums){
     getAllAlbums().then((data)=>{
        dispach({
          type:actionType.SET_ALL_ALBUMS,
          allAlbums:data.album
        })
      })
    }


},[])
  return (
    <div className='w-full p-4 flex items-center justify-center flex-col'>

<div className='relative w-full my-8 py-16 p-4 border border-gray-300  rounded-md '>
 

   <AlbumContainer data={allAlbums}/>
   
   </div>


    </div>
  )
}
export const AlbumContainer=({data})=>{
  return(
    <div className='w-full flex flex-wrap gap-3 items-center justify-evenly  '>
       {data && data.map((song,i)=>(
        <SongCard key={song._id} data={song} index={i} type="album"/>
       
       
       ))}
    </div>
  )
  
  }


export default DashboardAlbums