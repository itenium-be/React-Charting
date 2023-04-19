import { shallowEqual, useDispatch, useSelector } from "react-redux";

export function Sample() {
  const persons: readonly IPerson[] = useSelector(
    (state: PersonState) => state.persons,
    shallowEqual // checks that two different variables reference the same object
  );
  console.log(persons);

  return (
    <>
    </>
  );
}
