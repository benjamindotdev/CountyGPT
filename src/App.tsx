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
  const [ showResults, setShowResults ] = useState(false)

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

    if (user.county) {
      fetchData('https://api.census.gov/data/2019/pep/charagegroups?get=NAME,POP,AGEGROUP=' + user.age[1] + ',SEX=' + user.gender[1] + '&for=county:' + user.county[2] + '&in=state:' + user.state[1] + '&key=' + censusKey)
          .then((res) => {
            setUpdatedResults(res)
          })
          .catch((e) => {
            console.log(e.message)
          });
      }
        results.map((result:any) => {
          return setUpdatedResults(results.filter((result:any) => { return result[0] === user.county[0] + "," + user.county[1]}))
        })
  }, [user.state, user.county])

    const handleSubmit = (e:any) => {
      e.preventDefault();
      setShowResults(true);
    }

  return (
    <main id="app" className='flex flex-col justify-center items-center w-screen h-screen rounded-lg gap-32 '>
      <section id="header" className='flex flex-col gap-6 justify-start items-start'>
        <h1 className=" font-bold uppercase text-primary text-5xl">Demographic</h1>
        <blockquote className="italic text-secondary text-2xl">the statistical characteristics of human populations used especially to identify markets</blockquote>
      </section>
      <InputForm user={user} setUser={setUser} results={results} setResults={setResults} handleSubmit={handleSubmit} />
      <Results user={user} setUser={setUser} updatedResults={updatedResults} setUpdatedResults={setUpdatedResults} />
    </main>
  )
}