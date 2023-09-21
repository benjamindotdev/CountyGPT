import states from '../data/states.json'
import ageGroups from '../data/ageGroups.json'

export const InputForm = (props: any) => {
    return (
        <form className='flex flex-col gap-8  sm-w-11/12 lg:w-9/12 justify-center items-start card shadow-md rounded-3xl p-16'>
            <div className='grid sm:grid-rows-2 lg:grid-cols-2 items-center sm-w-11/12 lg:w-10/12 lg:gap-16'>
                <label className="lg:text-lg text-accent lg:justify-self-end" htmlFor='name'>Name</label>
                <input className='input input-primary w-full max-w-xs text-secondary rounded-xl' value={props.user.name} name="name" onChange={(e) => props.setUser({ ...props.user, name: e.target.value })} />
            </div>
            <div className='grid sm:grid-rows-2 lg:grid-cols-2 sm:items-start sm:justify-start lg:items-center sm-w-11/12 lg:w-10/12 lg:gap-16'>
                <label className="lg:text-lg text-accent lg:justify-self-end" htmlFor='name'>Age</label>
                <select className='input input-primary w-12/12 text-secondary rounded-xl' value={props.user.age} name="age" onChange={(e) => props.setUser({ ...props.user, age: e.target.value.split(",") })}>
                    <option disabled value=""></option>
                    {
                        ageGroups.map((group: string[]) => {
                        return (
                            <option key={group[1]} value={group}>{group[0]}</option>
                        )
                        })
                    }
                </select>
            </div>
            <div className='grid sm:grid-rows-2 lg:grid-cols-2 items-center sm-w-11/12 lg:w-10/12 lg:gap-16'>
                <label className="lg:text-lg text-accent lg:justify-self-end" htmlFor='name'>State</label>
                <select className='input input-primary w-12/12 text-secondary rounded-xl' value={props.user.state} name="location" onChange={(e) => props.setUser({ ...props.user, state: e.target.value.split(",") })}>
                    <option disabled value=""></option>
                    {
                    states.map((state: string[]) => {
                        return (
                        <option key={state[1]} value={state}>{state[0]}</option>
                        )
                    })
                    }
                </select>
            </div>
            {
            props.user.state &&
                <div className='grid sm:grid-rows-2 lg:grid-cols-2 items-center sm-w-11/12 lg:w-10/12 lg:gap-16'>
                    <label className="lg:text-lg text-accent lg:justify-self-end" htmlFor='name'>County</label>
                    <select className='input input-primary w-12/12 text-secondary rounded-xl' value={props.user.county} name="location" onChange={(e) => props.setUser({ ...props.user, county: e.target.value.split(",") })}>
                        <option disabled value=""></option>
                        {
                        props.results.sort().map((county:any) => {
                            return (
                            <option key={county[1] + county[2] + Math.floor(Math.random())} value={props.county}>{county[0]}</option>
                            )
                        })
                        }
                    </select>
                </div>
            }
      </form>
    )

}