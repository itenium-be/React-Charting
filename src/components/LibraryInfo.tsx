import { ILibraryInfo } from "../store/library-info";


const formatGithub = (url: string) => {
  const segs = url.split('/');

  return segs[segs.length - 2] + '/' + segs[segs.length - 2]
};

export function LibraryInfo({lib}: {lib: ILibraryInfo}) {
  return (
    <>
      <h1>{lib.name} {lib.stars}</h1>
      <ul>
        <li>Setup 🕒: {lib.setupTime} min</li>
        <li>Github: <a href={lib.github}>{formatGithub(lib.github)}</a></li>
        <li>Weekly 💾: {lib.weeklyDownloads}</li>
        <li>Dependency: {lib.dependency}</li>
      </ul>
    </>
  )
}
