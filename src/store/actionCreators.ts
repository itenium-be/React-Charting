import * as actionTypes from "./actionTypes"

export function addPerson(person: IPerson) {
  const action: PersonAction = {
    type: actionTypes.ADD_PERSON,
    person,
  }

  return (dispatch: DispatchType) => dispatch(action)
}

export function removePerson(person: IPerson) {
  const action: PersonAction = {
    type: actionTypes.REMOVE_PERSON,
    person,
  }
  return (dispatch: DispatchType) => dispatch(action)
}