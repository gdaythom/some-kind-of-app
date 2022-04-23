import { TosSeries, TngSeries, Ds9Series, VoySeries, EntSeries } from './shows';

const Shows = [
  TosSeries,
  TngSeries,
  Ds9Series,
  VoySeries,
  EntSeries
];

const Movies = require(`./movies/index.json`);

const Playlists = [
  require(`./playlists/holodecks.json`),
  require(`./playlists/transporters.json`),
  require(`./playlists/section31.json`),
  require(`./playlists/theMaquisSaga.json`),
  require(`./playlists/timeTravel.json`),
  require(`./playlists/theWorfSaga.json`),
  require(`./playlists/obrienMustSuffer.json`),
  require(`./playlists/q.json`),
  require(`./playlists/sela.json`),
  require(`./playlists/trilogyOfTerror.json`),
];

export { Shows, Movies, Playlists, TngSeries };
