import { useEffect, useState } from 'react';
import states from './data/states.json'
import ageGroups from './data/ageGroups.json'
import genders from './data/genders.json'
import './App.css'

type User = {
  name: any
  age: any
  gender: any
  state: any
  county: any
}

type UpdatedResults = {
  key: number
  state: string
  county: string
}[]

export const App = () => {

  const [ user, setUser ] = useState<User>({
    name: "",
    age: "",
    gender: "",
    state: "",
    county: ""
  })

  const [ results, setResults ] = useState([])
  const [ updatedResults, setUpdatedResults ] = useState<UpdatedResults>([])
  const [ showResults, setShowResults ] = useState(false)
  const [ ageGroup, setAgeGroup ] = useState<Number>(0)

  let nextId = 0;

  const fetchData = async (api:string) => {
    const response = await fetch(api)
    if (!response.ok) {
      throw new Error('Data coud not be fetched!')
    } else {
      return response.json()
    }
  }

  useEffect(() => {
    const censusKey = import.meta.env.VITE_CENSUS_API_KEY;
    const chatGPTKey= import.meta.env.VITE_CHATGPT_API_KEY;
  if (user.state) {
    fetchData('https://api.census.gov/data/2019/pep/charagegroups?get=NAME&for=county:*&in=state:' + user.state[1] + '&key=' + censusKey)
        .then((res) => {
          setResults(res)
        })
        .catch((e) => {
          console.log(e.message)
        });
    }

    // REMOVE
    // get all data for state from 1st api call, mutate results array to user county and demographics afterwards on the fly (faster than multiple API calls)
    if (user.county) {
      fetchData('https://api.census.gov/data/2019/pep/charagegroups?get=NAME,POP&AGEGROUP=' + user.age[1] + '&SEX=' + user.gender[1] + '&for=county:' + user.county[2] + '&in=state:' + user.state[1] + '&key=' + censusKey)
          .then((res) => {
            setResults(res)
          })
          .catch((e) => {
            console.log(e.message)
          });
      }
        results.map((result:any) => {

          console.log(result[0], user.county[0] + "," + user.county[1])
          //if (result[0] === user.county[0] + "," + user.county[1]) {
          //  console.log("yes")
          //  setUpdatedResults([...updatedResults, { key: nextId++, state: result[1], county: result[0] } ])
          //}
          console.log(result[0] !== user.county[0] + "," + user.county[1])
          return setUpdatedResults(results.filter((result:any) => { return result[0] === user.county[0] + "," + user.county[1] }))
        })
  }, [user.state, user.county])

    const handleSubmit = (e:any) => {
      e.prevent.default();
      setShowResults(true);
    }

  return (
    <div className='flex flex-col justify-start items-center w-screen h-screen rounded-lg gap-16 '>
      <h1 className="p-6 font-bold uppercase text-primary text-5xl">Demographic</h1>
      <blockquote className="italic text-secondary text-2xl">the statistical characteristics of human populations used especially to identify markets</blockquote>
      <div className='flex flex-col gap-8'>
        <div className='grid grid-cols-2 text-black items-center'>
          <label className="text-lg text-accent" htmlFor='name'>Name</label>
          <input className='input input-primary w-full max-w-xs text-secondary' value={user.name} name="name" onChange={(e) => setUser({ ...user, name: e.target.value })} />
        </div>
        <div className='grid grid-cols-2 items-center'>
          <label className="text-lg text-accent" htmlFor='name'>Age</label>
          <select className='input input-primary w-full max-w-xs text-secondary' value={user.age} name="age" onChange={(e) => setUser({ ...user, age: e.target.value.split(",") })}>
            <option disabled value=""></option>
              {
                ageGroups.map((group:any) => {
                  return (
                    <option key={group[1]} value={group}>{group[0]}</option>
                  )
                })
              }
          </select>
        </div>
        <div className='grid grid-cols-2 items-center'>
          <label className="text-lg text-accent" htmlFor='name'>Gender</label>
          <select className='input input-primary w-full max-w-xs text-secondary' value={user.gender} name="name" onChange={(e) => setUser({ ...user, gender: e.target.value.split(",") })}>
            <option disabled value=""></option>
            {
              genders.map(gender => {
                return (
                  <option key={gender[1]} value={gender}>{gender[0]}</option>
                )
              })
            }
          </select>
        </div>
        <div className='grid grid-cols-2 items-center'>
          <label className="text-lg text-accent" htmlFor='name'>State</label>
          <select className='input input-primary w-full max-w-xs text-secondary' value={user.state} name="location" onChange={(e) => setUser({ ...user, state: e.target.value.split(",") })}>
            <option disabled value=""></option>
            {
              states.map(state => {
                return (
                  <option key={state[1]} value={state}>{state[0]}</option>
                )
              })
            }
          </select>
        </div>
        {
          user.state &&
            <div className='grid grid-cols-2 items-center'>
              <label className="text-lg text-accent" htmlFor='name'>County</label>
              <select className='input input-primary w-full max-w-xs text-secondary' value={user.state} name="location" onChange={(e) => setUser({ ...user, county: e.target.value.split(",") })}>
                <option disabled value=""></option>
                {
                  results.sort().map((county:any) => {
                    return (
                      <option key={county[1] + county[2]} value={county}>{county[0]}</option>
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
              <button className="btn btn-primary text-primary hover:text-secondary w-6/12" type="submit" onSubmit={handleSubmit}>Confirm</button>
            </div>
        }
        {

          <div className='text-black card shadow-xl p-16'>
            <div className='card-body'>
            <h1 className='card-title'>{user.name}</h1>
              <h2 className=''>{user.age[0]}</h2>
              <h2 className=''>{user.gender[0]}</h2>
              <h2 className=''>{user.county[0]}, {user.county[1]}</h2>
              {JSON.stringify(updatedResults)}
            </div>
          </div>
          }
      </div>
    </div>
  )
}