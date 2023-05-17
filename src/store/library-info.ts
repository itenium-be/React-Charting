export interface ILibraryInfo {
  name: string;
  setupTime: string;
  github: string;
  weeklyDownloads: string;
  dependency: string;
  stars: string;
}

export const LibraryInfos: {[key: string]: ILibraryInfo} = {
  recharts: {
    name: "Recharts",
    setupTime: "15",
    github: "https://github.com/recharts/recharts",
    weeklyDownloads: "1.2M",
    dependency: "d3",
    stars: '⭐⭐⭐⭐',
  },
  visx: {
    name: "Visx",
    setupTime: "29",
    github: "https://github.com/airbnb/visx",
    weeklyDownloads: "360k",
    dependency: "d3",
    stars: '⭐⭐⭐',
  },
  nivo: {
    name: "Nivo",
    setupTime: "28",
    github: "https://github.com/plouc/nivo",
    weeklyDownloads: "300k",
    dependency: "d3",
    stars: '⭐⭐⭐⭐',
  },
  victory: {
    name: "Victory",
    setupTime: "11",
    github: "https://github.com/FormidableLabs/victory",
    weeklyDownloads: "200k",
    dependency: "d3",
    stars: '⭐⭐',
  },
  reactVis: {
    name: "React-vis",
    setupTime: "35",
    github: "https://github.com/uber/react-vis",
    weeklyDownloads: "155k",
    dependency: "d3",
    stars: '⭐⭐',
  },
  reactChartJs2: {
    name: "React-chartjs-2",
    setupTime: "35",
    github: "https://github.com/reactchartjs/react-chartjs-2",
    weeklyDownloads: "950k",
    dependency: "Chart.js",
    stars: '🤔',
  },
}
