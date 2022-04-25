import { TosSeries, TngSeries, Ds9Series, VoySeries, EntSeries } from './shows';
import { Playlists, TwoParters, ThreeParters } from './playlists';

const Shows = [
  TosSeries,
  TngSeries,
  Ds9Series,
  VoySeries,
  EntSeries
];

const Movies = require(`./movies/index.json`);

export { Shows, Movies, Playlists, TwoParters, ThreeParters, TngSeries };
