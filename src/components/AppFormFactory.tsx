import { Home } from "../pages/Home";
import { Sample } from "../pages/Sample";


export type Charts = 'home' | 'sample';


type AppFormFactoryProps = {
  page: Charts;
};


export function AppFormFactory({ page }: AppFormFactoryProps) {
  return (
    <ComponentFactory page={page} />
  )
};




function ComponentFactory({ page }: AppFormFactoryProps) {
  switch (page) {
  case 'sample':
    return <Sample />;

  case 'home':
  default:
    return <Home />;
  }
}
