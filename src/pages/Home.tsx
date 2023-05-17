import React from "react";
import { Dispatch } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addPerson, removePerson } from "../store/actionCreators";
import { AddPerson } from "../components/AddPerson";
import { Person } from "../components/Person";

export function Home() {
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
      <div className="col-6">
        <main>
          <h1>React charts showcase</h1>
          <p>Use this form to add additional data to show in the charts in the menu above</p>
          <AddPerson savePerson={savePerson} />
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
