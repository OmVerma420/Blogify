import React from 'react'
import { Input } from './input'

function SearchBar() {
  return (
   <form className="w-full ">
  <Input 
    type="text" 
    placeholder="Search..." 
    className="h-10 w-full px-4 rounded-full border bg-slate-100 border-slate-200 shadow-sm focus:bg-white focus:border-slate-400 focus:shadow-md"
  />
</form>
  )
}

export default SearchBar