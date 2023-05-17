import React from "react";
import { Dispatch } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addPerson, removePerson } from "../store/actionCreators";
import { AddPerson } from "../components/AddPerson";
import { Person } from "../components/Person";

export function Data() {
  const persons: readonly IPerson[] = useSelector(
    (state: PersonState) => state.persons,
    shallowEqual // checks that two different variables reference the same object
  );

  const dispatch: Dispatch<any> = useDispatch();

  const savePerson = React.useCallback(
    (person: IPerson) => dispatch(addPerson(person)),
    [dispatch]
  );

  return (
    <>
      <h1>React Charting Showcase</h1>
      <div className="col-6">
        <main>
          <h2>Add persons to the dataset</h2>
          <AddPerson savePerson={savePerson} />
        </main>
      </div>
      <div className="col-6">
        <main>
          <h2>Current dataset</h2>
          {persons.map((person: IPerson) => (
            <Person
              key={person.id}
              person={person}
              removePerson={removePerson}
            />
          ))}
        </main>
      </div>
    </>
  );
}
