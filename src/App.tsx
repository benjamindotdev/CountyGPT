import { useState } from 'react'
import './App.css'

type User = {
  name: string
  age: any
  gender: string
  location: string
}

function App() {

  const [ user, setUser ] = useState<User>({
    name: "",
    age: "",
    gender: "",
    location: ""
  })




  return (
    <div className='flex flex-col justify-center items-center w-screen h-screen rounded-lg gap-4 shadow-lg'>
      <h1 className="p-6  text-left font-bold uppercase">Demographic</h1>
      <blockquote className="italic">the statistical characteristics of human populations used especially to identify markets</blockquote>
      <div>
        <div className='grid grid-cols-2 gap-3 text-black'>
          <label htmlFor='name' className=''>Name</label>
          <input className='w-100 bg-slate-50 rounded-lg ' value={user.name} name="name" onChange={(e) => setUser({...user, name: e.target.value})}/>
        </div>
        <div className='grid grid-cols-2 gap-3'>
          <label htmlFor='name'>Age</label>
          <input className='w-10/12 bg-slate-50 rounded-lg' type="number" value={user.age} name="age" onChange={(e) => setUser({...user, age: e.target.value})}/>
        </div>
        <div className='grid grid-cols-2 gap-3 '>
          <label htmlFor='name'>Gender</label>
          <select className='w-100 bg-slate-50 rounded-lg' value={user.gender} name="name" onChange={(e) => setUser({...user, gender: e.target.value})}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
          </select>
        </div>
        <div className='grid grid-cols-2 gap-3 '>
          <label htmlFor='name'>Location</label>
          <select className='w-100 bg-slate-50 rounded-lg'  value={user.location} name="location" onChange={(e) => setUser({...user, location: e.target.value})}>
            <option value="UK">UK</option>
          </select>
        </div>
      </div>
      <div>
        {
          user.name && user.age && user.gender && user.location &&
            <p className='text-white'>Hey {user.name}! You are a {user.age} year old {user.gender} who lives in {user.location}</p>
        }
      </div>
    </div>
  )
}

export default App