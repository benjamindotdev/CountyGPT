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
    <div className='flex flex-col justify-center items-center w-screen h-screen rounded-lg gap-8 shadow-lg'>
      <h1 className="p-6 font-bold uppercase text-primary text-5xl">Demographic</h1>
      <blockquote className="italic text-secondary">the statistical characteristics of human populations used especially to identify markets</blockquote>
      <div className='flex flex-col gap-8'>
        <div className='grid grid-cols-2  text-black items-center'>
          <label className="text-lg text-accent" htmlFor='name'>Name</label>
          <input className='input input-primary w-full max-w-xs' value={user.name} name="name" onChange={(e) => setUser({...user, name: e.target.value})}/>
        </div>
        <div className='grid grid-cols-2 items-center'>
          <label className="text-lg text-accent" htmlFor='name'>Age</label>
          <input className='input input-primary w-full max-w-xs' type="number" value={user.age} name="age" onChange={(e) => setUser({...user, age: e.target.value})}/>
        </div>
        <div className='grid grid-cols-2 items-center'>
          <label className="text-lg text-accent" htmlFor='name'>Gender</label>
          <select className='input input-primary w-full max-w-xs' value={user.gender} name="name" onChange={(e) => setUser({...user, gender: e.target.value})}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
          </select>
        </div>
        <div className='grid grid-cols-2 items-center'>
          <label className="text-lg text-accent" htmlFor='name'>Location</label>
          <select className='input input-primary w-full max-w-xs'  value={user.location} name="location" onChange={(e) => setUser({...user, location: e.target.value})}>
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