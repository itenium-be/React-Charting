import * as React from "react";

type Props = {
  savePerson: (person: IPerson | any) => void;
};

export const AddPerson: React.FC<Props> = ({ savePerson }) => {
  const [person, setPerson] = React.useState<IPerson | {}>();

  const handlePersonData = (e: React.FormEvent<HTMLInputElement>) => {
    let value: string | number =
      e.currentTarget.id === "age"
        ? parseInt(e.currentTarget.value)
        : e.currentTarget.value;
    setPerson({
      ...person,
      [e.currentTarget.id]: value,
    });
  };

  const addNewPerson = (e: React.FormEvent) => {
    e.preventDefault();
    savePerson(person);
  };

  return (
    <form onSubmit={addNewPerson} className="Add-person">
      <input
        type="text"
        id="name"
        placeholder="Name"
        onChange={handlePersonData}
      />
      <input
        type="number"
        id="age"
        placeholder="Age"
        onChange={handlePersonData}
      />
      <button disabled={person === undefined ? true : false}>Add person</button>
    </form>
  );
};
