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
        <h1>Welcome to React charts</h1>
        <p>
          fyi: a great resource for adding redux to a react{" "}
          <a href="https://www.freecodecamp.org/news/how-to-use-redux-in-your-react-typescript-app/">
            app
          </a>
        </p>
        <main>
          <h1>My Persons</h1>
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
