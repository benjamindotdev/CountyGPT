import { useState } from 'react'
import './App.css'

type User = {
  name: string
  age: number
  gender: string
  location: string
}

function App() {

  const [ user, setUser ] = useState<User>({
    name: "",
    age: 0,
    gender: "",
    location: ""
  })


  return (
    <>
    <input className='w-100 bg-slate-50 border-r-8 p-32' />
      <h1 className="p-6 shadow-lg">Vite + React</h1>
      <div className="card">

        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
