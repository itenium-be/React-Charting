import { shallowEqual, useSelector } from "react-redux";
import { VisXYContainer, VisLine, VisAxis, VisScatter, VisTooltip } from "@unovis/react";
import { LibraryInfo } from "../components/LibraryInfo";
import { byKey } from "../data/libraries";

export function Unovis() {
  const persons: IPerson[] = useSelector(
    (state: PersonState) => state.persons,
    shallowEqual
  );

  const x = (_d: IPerson, i: number) => i;
  const y = (d: IPerson) => d.age;

  return (
    <>
      <LibraryInfo lib={byKey.unovis} />
      <VisXYContainer data={persons} width={500} height={300}>
        <VisLine x={x} y={y} color="#8884d8" />
        <VisScatter x={x} y={y} color="#8884d8" />
        <VisAxis type="x" tickFormat={(tick: number | Date) => persons[tick as number]?.name ?? ""} />
        <VisAxis type="y" />
        <VisTooltip />
      </VisXYContainer>
    </>
  );
}
