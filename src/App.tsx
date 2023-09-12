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

  const ageAsNumber = Number(user.age);


  return (
    <>
      <div className='flex flex-col justify-center items-center w-screen h-screen bg-slate-400 m-32 rounded-lg'>
        <h1 className="p-6 shadow-lg">Demographic</h1>
        <div className='grid grid-cols-2 gap-3 '>
          <label htmlFor='name' className=''>Name</label>
          <input className='w-100 bg-slate-50 rounded-lg' value={user.name} name="name" onChange={(e) => setUser({...user, name: e.target.value})}/>
          <h2>{user.name}</h2>
        </div>
        <div className='grid grid-cols-2 gap-3'>
          <label htmlFor='name'>Age</label>
          <input className='w-10/12 bg-slate-50 rounded-lg' type="number" value={user.age} name="age" onChange={(e) => setUser({...user, age: e.target.value})}/>
        </div>
        <div className='grid grid-cols-2 gap-3 '>
          <label htmlFor='name'>Gender</label>
          <input className='w-100 bg-slate-50 rounded-lg' value={user.gender} name="name" onChange={(e) => setUser({...user, gender: e.target.value})}/>
        </div>
        <div className='grid grid-cols-2 gap-3 '>
          <label htmlFor='name'>Location</label>
          <input className='w-100 bg-slate-50 rounded-lg'  value={user.location} name="location" onChange={(e) => setUser({...user, location: e.target.value})}/>
        </div>
      </div>
    </>
  )
}

export default App