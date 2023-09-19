export const Results = (props: any) => {
    return (
        <div id='results' className="flex flex-col gap-8 w-9/12 justify-center items-center card shadow-md rounded-lg p-16'">
        {
          props.user.county &&
          <div className=''>
            <div className='card-body'>
            <h1 className='card-title'>{props.user.name}</h1>
              <h2 className=''>{props.user.age[0]}</h2>
              <h2 className=''>{props.user.gender[0]}</h2>
              <h2 className=''>{props.user.county[0]}, {props.user.county[1]}</h2>
              {JSON.stringify(props.updatedResults)}
            </div>
          </div>
          }
      </div>
    )
}