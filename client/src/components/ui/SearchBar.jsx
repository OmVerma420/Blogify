import React, { useState } from 'react'
import { Input } from './input'
import { RouteSearch } from '@/helpers/RouteNames.js'
import { useNavigate } from 'react-router-dom'

function SearchBar() {
  const navigate = useNavigate()
  const [query , setQuery] = useState()
  const getInput =(e)=>{
    setQuery(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(RouteSearch(query))
  }
  return (
   <form className="w-full" onSubmit={handleSubmit}>
  <Input 
    type="text" 
    placeholder="Search..." 
    name='q'
    onInput={getInput}
    className="h-10 w-full px-4 rounded-full border bg-slate-100 border-slate-200 shadow-sm focus:bg-white focus:border-slate-400 focus:shadow-md"
  />
</form>
  )
}

export default SearchBar