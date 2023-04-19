import * as actionTypes from "./actionTypes"

const initialState: PersonState = {
  persons: [
    {
      id: 1,
      name: "Bob",
      age: 11,
    },
    {
      id: 2,
      name: "Tom",
      age: 13,
    },
  ],
}

const reducer = (
    state: PersonState = initialState,
    action: PersonAction
  ): PersonState => {
    switch (action.type) {
        case actionTypes.ADD_PERSON:
          const newPerson: IPerson = {
            id: Math.random(), // not really unique
            name: action.person.name,
            age: action.person.age,
          }
          return {
            ...state,
            persons: state.persons.concat(newPerson),
          }
        case actionTypes.REMOVE_PERSON:
          const updatedPersons: IPerson[] = state.persons.filter(
            person => person.id !== action.person.id
          )
          return {
            ...state,
            persons: updatedPersons,
          }
      }
      return state
  }
  
  export default reducer