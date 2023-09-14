import { useEffect, useState, useMemo } from 'react';
import  states  from './data/states.json'
import './App.css'

type User = {
  name: string
  age: any
  gender: string
  state: string
  county: string
}

function App() {

  const [ user, setUser ] = useState<User>({
    name: "",
    age: "",
    gender: "",
    state: "",
    county: ""
  })

  const [ results, setResults ] = useState([])
  const [ showResults, setShowResults ] = useState(false)

  const key="6076306d0e086a5276c177cbfabedc34c2d34208";

  const fetchData = async () => {
    const response = await fetch('https://api.census.gov/data/2019/pep/charagegroups?get=NAME&for=county:*&in=state:*&key='+key)
    if (!response.ok) {
      throw new Error('Data coud not be fetched!')
    } else {
      return response.json()
    }
  }

  useEffect(() => {
      fetchData()
        .then((res) => {
          setResults(res)
        })
        .catch((e) => {
          console.log(e.message)
        })
    }, [user.state])

    const handleSubmit = (e:any) => {
      e.prevent.default();
      setShowResults(true);
    }

  return (
    <div className='flex flex-col justify-center items-center w-screen h-screen rounded-lg gap-8 '>
      <h1 className="p-6 font-bold uppercase text-primary text-5xl">Demographic</h1>
      <blockquote className="italic text-secondary text-2xl">the statistical characteristics of human populations used especially to identify markets</blockquote>
      <div className='flex flex-col gap-8'>
        <div className='grid grid-cols-2  text-black items-center'>
          <label className="text-lg text-accent" htmlFor='name'>Name</label>
          <input className='input input-primary w-full max-w-xs text-secondary' value={user.name} name="name" onChange={(e) => setUser({ ...user, name: e.target.value })} />
        </div>
        <div className='grid grid-cols-2 items-center'>
          <label className="text-lg text-accent" htmlFor='name'>Age</label>
          <input className='input input-primary w-full max-w-xs text-secondary' type="number" value={user.age} name="age" onChange={(e) => setUser({ ...user, age: e.target.value })} />
        </div>
        <div className='grid grid-cols-2 items-center'>
          <label className="text-lg text-accent" htmlFor='name'>Gender</label>
          <select className='input input-primary w-full max-w-xs text-secondary' value={user.gender} name="name" onChange={(e) => setUser({ ...user, gender: e.target.value })}>
            <option disabled selected value=""></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
          </select>
        </div>
        <div className='grid grid-cols-2 items-center'>
          <label className="text-lg text-accent" htmlFor='name'>State</label>
          <select className='input input-primary w-full max-w-xs text-secondary' value={user.state} name="location" onChange={(e) => setUser({ ...user, state: e.target.value })}>
            <option disabled selected value=""></option>
            {
              states.map(state => {
                return (
                  <option key={state[1]} value={state[0]}>{state[0]}</option>
                )
              })
            }
          </select>
        </div>
        {
          user.state &&
            <div className='grid grid-cols-2 items-center'>
              <label className="text-lg text-accent" htmlFor='name'>County</label>
              <select className='input input-primary w-full max-w-xs text-secondary' value={user.state} name="location" onChange={(e) => setUser({ ...user, county: e.target.value })}>
                <option disabled selected value=""></option>
                {
                  results.filter((result:any) => result[0].split(", ")[1] == user.state).sort().map(result => {
                    return (
                      <option key={result[1] + result[2]} value={result[0]}>{result[0]}</option>
                    )
                  })
                }
            </select>
          </div>
        }
      </div>
      <div>
        {user.name && user.age && user.gender && user.state && user.county &&
          <div className='flex flex-col gap-8 justify-center items-center'>
            <p className='text-primary text-2xl'>Hey <strong>{user.name}</strong>! You are a <strong>{user.age}</strong> year old <strong>{user.gender}</strong> who lives in <strong>{user.county}</strong>.</p>
            <button className="btn btn-primary text-primary hover:text-secondary w-6/12" type="submit" onSubmit={handleSubmit}>Confirm</button>
          </div>}
        {
          showResults &&
          <div>
            {
              results
            }
          </div>
          }
      </div>
    </div>
  )
}

export default App