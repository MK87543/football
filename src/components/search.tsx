import React from 'react'

type Props = {}

export default function search({}: Props) {

    return (
        <input 
          type="text" 
          value={""}  
          placeholder="search" 
          className="flex justify-center items-center border h-10 px-2 m-4"
        />


      );  
}