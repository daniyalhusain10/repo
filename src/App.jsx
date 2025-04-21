import React, { useState, useCallback , useEffect, useRef } from 'react'
import {HashRouter} from "react-router-dom"
  // let copy = document.querySelector("button #hell")
  // copy.addEventListener("click",()=>{
  //   copy.innerHTML = "copied"
  // })
const App = () => {

  const [lenth , setlenth] = useState(8)
  const [numberAllowed , setNumberAllowed] = useState(false)
  const [ charAllowed, setCharAllowed] = useState(false)
  const [password,setPassword] = useState ("")

//ref hook
const passwordRef = useRef(null)

  const passwordGanerator = useCallback(()=>{
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(numberAllowed) str += "012346789"
    if(charAllowed) str += "@#$%*()I&[]{}"
    for(let i=1 ; i<=lenth; i++){
      let char = Math.floor(Math.random()* str.length + 1)
       pass += str.charAt(char)

      }

      setPassword(pass)



  }, [lenth,charAllowed,numberAllowed, setPassword]) 
  useEffect(()=> {
    passwordGanerator()
  }, [lenth,numberAllowed,charAllowed,passwordGanerator])
  const copyPassClipBoard = useCallback(()=> {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,15)
     window.navigator.clipboard.writeText(password)
  },[password])
  return (
    <div>
    
      <div className='w-full max-w-md h-40 text-center items-center mx-auto shadow-md
    rounded-lg px-4 my-8   text bg-gray-600'>
      <h1 className='text-2xl my-4 text-white'>Password Ganerator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text"
        value={password} 
        className='outline-none w-full py-1 px-3  '
        placeholder='password'
        readOnly
        ref={passwordRef}
         />
        
        <button id='hell'
        onClick={copyPassClipBoard}
         className='outline-none bg-orange-400 text-white px-3 py-0.5 shrink-0'
       
        >Copy</button>
      </div>
      <div className='flex text-sm gap-x-2 text-white'>
        <div className='flex items-center gap-x-1'>
          <input
           type="range" 
           min={6}
           max={100}
           value={lenth}
           className='cursor-pointer' 
           onChange={(e)=>{setlenth(e.target.value)}}/>
           <label>lenth: {lenth}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={()=> {
            setNumberAllowed((prev)=> !prev);
          }} 
          /> 
          <label htmlFor="numberInput">Numbers</label>
        </div>
       
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={charAllowed}
          id="characterInput"
          onChange={()=> {
            setCharAllowed((prev)=> !prev);
          }} 
          /> 
          <label htmlFor="characterInput">Characters</label>
      </div>
      </div>
    </div>
      


  
    </div>
  )
}

export default App
