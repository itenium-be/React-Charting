interface IPerson {
    id: number
    name: string
    age: number
  }
  
  type PersonState = {
    persons: IPerson[]
  }
  
  type PersonAction = {
    type: string
    person: IPerson
  }
  
  type DispatchType = (args: PersonAction) => PersonAction