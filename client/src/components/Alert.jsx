    import React from 'react'
    import {BsEmojiWink} from 'react-icons/bs'
   import {motion} from 'framer-motion'
import { useStateValue } from '../context/StateProvider';


  
    function Alert({type}) {
      const[{alertType},dispatch]=useStateValue();

   
      return (
        <motion.div
        initial={{translateX:200,opacity:0}}
        animate={{translateX:0,opacity:1}}
        exit={{translateX:200,opacity:0 }}
        key={type}
        className={`fixed top-12 right-12 p-4 rounded-md backdrop-blur-md flex items-center justify-center shadow-md 
        ${type==="danger"&& "bg-red-500"}
        ${type==="success"&& "bg-green-300"}
        `}>
      
          {type==="success" &&(
             <div className='flex items-center justify-center gap-4'>
              <BsEmojiWink className='text-3xl text-primary'/>
              <p className='text-xl font-semibold text-primary'>data saved</p>
             </div>
          )}
              {type==="danger" &&(
             <div className='flex items-center justify-center gap-4'>
              <BsEmojiWink className='text-3xl text-primary'/>
              <p className='text-xl font-semibold text-primary'>Something went wrong..please try again later</p>
             </div>
          )}
        
        </motion.div>   
      )
    }
    
    export default Alert