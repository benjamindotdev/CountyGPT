import { useEffect, useState } from 'react';
import  states  from './data/states.json'
import  ageGroups  from './data/ageGroups.json'
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
  const [ ageGroup, setAgeGroup ] = useState<Number>(0)

  const key="6076306d0e086a5276c177cbfabedc34c2d34208";

  const fetchData = async (api:string) => {
    const response = await fetch(api)
    if (!response.ok) {
      throw new Error('Data coud not be fetched!')
    } else {
      return response.json()
    }
  }

  useEffect(() => {
  if (user.state) {
    fetchData('https://api.census.gov/data/2019/pep/charagegroups?get=NAME&for=county:*&in=state:' + user.state + '&key=' + key)
        .then((res) => {
          setResults(res)
        })
        .catch((e) => {
          console.log(e.message)
        });
    }
    if (user.county) {
      fetchData('https://api.census.gov/data/2019/pep/charagegroups?get=NAME,POP&AGEGROUP=' + user.age + '&SEX=' + user.gender + '&for=county:' + user.county + '&in=state:' + user.state + '&key=' + key)
          .then((res) => {
            console.log(res)
            setResults(res)
          })
          .catch((e) => {
            console.log(e.message)
          });
      }
  }, [user])

    const handleSubmit = (e:any) => {
      e.prevent.default();
      setShowResults(true);
    }

  return (
    <div className='flex flex-col justify-start items-center w-screen h-screen rounded-lg gap-8 '>
      <h1 className="p-6 font-bold uppercase text-primary text-5xl">Demographic</h1>
      <blockquote className="italic text-secondary text-2xl">the statistical characteristics of human populations used especially to identify markets</blockquote>
      <div className='flex flex-col gap-8'>
        <div className='grid grid-cols-2  text-black items-center'>
          <label className="text-lg text-accent" htmlFor='name'>Name</label>
          <input className='input input-primary w-full max-w-xs text-secondary' value={user.name} name="name" onChange={(e) => setUser({ ...user, name: e.target.value })} />
        </div>
        <div className='grid grid-cols-2 items-center'>
          <label className="text-lg text-accent" htmlFor='name'>Age</label>
          <select className='input input-primary w-full max-w-xs text-secondary' value={user.age} name="age" onChange={(e) => setUser({ ...user, age: e.target.value })}>
            <option disabled value=""></option>
              {
                ageGroups.map(group => {
                  return (
                    <option key={group[1]} value={group[1]}>{group[0]}</option>
                  )
                })
              }
          </select>
        </div>
        <div className='grid grid-cols-2 items-center'>
          <label className="text-lg text-accent" htmlFor='name'>Gender</label>
          <select className='input input-primary w-full max-w-xs text-secondary' value={user.gender} name="name" onChange={(e) => setUser({ ...user, gender: e.target.value })}>
            <option disabled value=""></option>
            <option value="01">Male</option>
            <option value="02">Female</option>
          </select>
        </div>
        <div className='grid grid-cols-2 items-center'>
          <label className="text-lg text-accent" htmlFor='name'>State</label>
          <select className='input input-primary w-full max-w-xs text-secondary' value={user.state} name="location" onChange={(e) => setUser({ ...user, state: e.target.value })}>
            <option disabled value=""></option>
            {
              states.map(state => {
                return (
                  <option key={state[1]} value={state[1]}>{state[0]}</option>
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
                <option disabled value=""></option>
                {
                  results.sort().map((county:any) => {
                    console.log(county)
                    return (
                      <option key={county[1] + county[2]} value={county[2]}>{county[0].split(", ")[0]}</option>
                    )
                  })
                }
              </select>
            </div>
        }
      </div>
      <div>
        {
          user.name && user.age && user.gender && user.state && user.county &&
            <div className='flex flex-col gap-8 justify-center items-center'>
              <p className='text-primary text-2xl'>Hey <strong>{user.name}</strong>! You are a <strong>{user.age}</strong> year old <strong>{user.gender}</strong> who lives in <strong>{user.county}</strong>.</p>
              <button className="btn btn-primary text-primary hover:text-secondary w-6/12" type="submit" onSubmit={handleSubmit}>Confirm</button>
            </div>
        }
        {

          <div className='text-black'>
            {
              <h1 className='text-black'>{JSON.stringify(user)}</h1>
              
            }
          </div>
          }
      </div>
    </div>
  )
}

export default App