import { useEffect, useState } from 'react';
import './App.css'
import { InputForm } from './components/InputForm';
import { Results } from './components/Results';

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

  const censusKey = import.meta.env.VITE_CENSUS_API_KEY;

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
    fetchData('https://api.census.gov/data/2019/pep/charagegroups?get=NAME&for=county:*&in=state:' + user.state[1] + '&key=' + censusKey)
        .then((res) => {
          setResults(res)
        })
        .catch((e) => {
          console.log(e.message)
        });
    }
  }, [user.state, user.county])

  return (
    <main id="app" className='flex flex-col justify-start items-center w-screen h-screen lg:gap-16 py-16'>
      <section id="header" className='flex flex-col gap-6 justify-start items-start w-9/12'>
        <h1 className=" font-bold uppercase text-primary text-5xl">COUNTYGPT</h1>
        <blockquote className="italic text-secondary lg:text-2xl">Let AI help you find stuff to do in your neck of the woods</blockquote>
      </section>
      <InputForm user={user} setUser={setUser} results={results} setResults={setResults} />
      {
        user.county[0] && user.name && user.county[1] && user.age &&
          <Results user={user} setUser={setUser} updatedResults={updatedResults} setUpdatedResults={setUpdatedResults} />
      }
    </main>
  )
}