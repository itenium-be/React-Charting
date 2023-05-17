import * as React from "react"
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"

type Props = {
  person: IPerson
  removePerson: (person: IPerson) => void
}

export const Person: React.FC<Props> = ({ person, removePerson }) => {
  const dispatch: Dispatch<any> = useDispatch()

  const deletePerson = React.useCallback(
    (person: IPerson) => dispatch(removePerson(person)),
    [dispatch, removePerson]
  )

  return (
    <div className="Person">
      <div>
        <h1>
          {person.name}
          <br />
          <small style={{fontSize: 18}}>Age: {person.age}</small>
        </h1>
      </div>
      <button onClick={() => deletePerson(person)}>Delete</button>
    </div>
  )
}
