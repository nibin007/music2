import React, { useEffect } from 'react'
import { useStateValue } from '../context/StateProvider';
import {GiLoveSong,GiMusicalNotes} from 'react-icons/gi'
import {RiUserStarFill} from 'react-icons/ri'

import {FaUsers} from 'react-icons/fa'

import { getAllAlbums, getAllArtists, getAllSongs, getAllUsers } from '../api';
import { actionType } from '../context/reducer'
import {bgColors} from "../utils/styles"

export const DashboardCard=({icon,name,count})=>{
 // const bgColors=bgColors[parseInt(Math.random()*bgColors.length)]
  return(
   <div className='p-4 w-40 gap-3 h-auto rounded-lg shadow-md bg-blue-400 flex flex-row'> 
      {icon}
      <p className='text-xl text-textColor font-semibold '>{name}</p>
      <p className='text-xl text-textColor font-semibold '>{count}</p>


   </div>

  )
};

function DashboardHome() {
  const[{allUsers,allSongs,allArtists,allAlbums,},dispatch]=useStateValue()
 useEffect(()=>{
   if(!allUsers){
    getAllUsers().then((data)=>{
      dispatch({
        type: actionType.SET_ALL_USERS,
        allUsers:data.data,
       })
    })
   }
   if(!allArtists){
   // console.log('calling')
    getAllArtists().then((data)=>{
      //console.log(data)
      dispatch({
        type: actionType.SET_ALL_ARTISTS,
        allArtists:data.artist,
       })
    })
   }
   if(!allAlbums){
    getAllAlbums().then((data)=>{
     // console.log("album--",data)
      dispatch({
        type: actionType.SET_ALL_ALBUMS,
        allAlbums:data.album,
       })
    })
   }
   if(!allSongs){
    getAllSongs().then((data)=>{
      //console.log(data)
      dispatch({
        type: actionType.SET_ALL_SONGS,
        allSongs:data.song,
       })
    })
   }
   
 },[])
 
  return (
    <div className='w-full p-6 flex items-center justify-evenly flex-wrap'>
    <DashboardCard icon={<FaUsers className='text-3xl text-textColor'/>} name={"Users"} count={allUsers?allUsers.length:null}/>
    <DashboardCard icon={<GiLoveSong className='text-3xl text-textColor'/>} name={"Songs"} count={allSongs?allSongs.length:0}/>
    <DashboardCard icon={<RiUserStarFill className='text-3xl text-textColor'/>} name={"Artists"} count={allArtists?allArtists.length:0}/>
    <DashboardCard icon={<GiMusicalNotes className='text-3xl text-textColor'/>} name={"Albums"} count={allAlbums?allAlbums.length:0}/>

  
    
   


    </div>
  )
}
 
export default DashboardHome