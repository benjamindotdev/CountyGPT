import states from '../data/states.json'
import ageGroups from '../data/ageGroups.json'

export const InputForm = (props: any) => {
    return (
        <form className='flex flex-col gap-8 w-9/12 justify-center items-center card shadow-md rounded-lg p-16'>
            <div className='grid grid-cols-2 text-black items-center w-10/12'>
                <label className="text-lg text-accent" htmlFor='name'>Name</label>
                <input className='input input-primary w-full max-w-xs text-secondary' value={props.user.name} name="name" onChange={(e) => props.setUser({ ...props.user, name: e.target.value })} />
            </div>
            <div className='grid grid-cols-2 items-center w-10/12'>
                <label className="text-lg text-accent" htmlFor='name'>Age</label>
                <select className='input input-primary w-full max-w-xs text-secondary' value={props.user.age} name="age" onChange={(e) => props.setUser({ ...props.user, age: e.target.value.split(",") })}>
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
            <div className='grid grid-cols-2 items-center w-10/12'>
                <label className="text-lg text-accent" htmlFor='name'>State</label>
                <select className='input input-primary w-full max-w-xs text-secondary' value={props.user.state} name="location" onChange={(e) => props.setUser({ ...props.user, state: e.target.value.split(",") })}>
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
                <div className='grid grid-cols-2 items-center w-10/12'>
                    <label className="text-lg text-accent" htmlFor='name'>County</label>
                    <select className='input input-primary w-full max-w-xs text-secondary' value={props.user.county} name="location" onChange={(e) => props.setUser({ ...props.user, county: e.target.value.split(",") })}>
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
            {
            props.user.name && props.user.age && props.user.gender && props.user.state && props.user.county &&
                <div className='flex flex-col gap-8 justify-center items-center'>
                    <button className="btn btn-primary text-primary hover:text-secondary w-64" type="submit" onSubmit={props.handleSubmit}>Confirm</button>
                </div>
            }
      </form>
    )

}