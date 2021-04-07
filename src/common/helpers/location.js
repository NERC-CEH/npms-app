/** ****************************************************************************
 * Some location transformation logic.
 **************************************************************************** */
import LatLon from 'geodesy/latlon-ellipsoidal';
import OsGridRef from 'geodesy/osgridref';

const helpers = {
  /**
   * Detects these variants:
   *
   * 'ST9582050850' - british
   * 'J2623239903' - irish
   * 'WV7048' - channel
   * '54.57975N 6.87218W' - latlon
   *
   * @param location
   * @returns {*}
   */
  getLocationType(location) {
    if (/^[A-Z]{1,2}\d{2}(?:[A-Z]|[NS][EW]|(?:\d{2}){0,4})?$/.test(location)) {
      // have simple well-formed grid ref
      if (/^.\d/.test(location)) {
        return 'irish';
      }
      if (location.charAt(0) === 'W') {
        return 'channel';
      }

      return 'british';
    }
    if (location.match(/\d+\.\d+N \d+\.\d+W/g)) {
      return 'latlon';
    }

    throw new Error('Unrecognised location type');
  },

  coord2grid(location) {
    const locationGranularity = helpers._getGRgranularity(location);

    const p = new LatLon(
      location.latitude,
      location.longitude,
      LatLon.datum.WGS84
    );
    const grid = OsGridRef.latLonToOsGrid(p);

    return grid.toString(locationGranularity).replace(/\s/g, '');
  },

  parseGrid(gridrefString) {
    function normalizeGridRef(incorrectGridref) {
      // normalise to 1m grid, rounding up to centre of grid square:
      let e = incorrectGridref.easting;
      let n = incorrectGridref.northing;

      switch (incorrectGridref.easting.toString().length) {
        case 1:
          e += '50000';
          n += '50000';
          break;
        case 2:
          e += '5000';
          n += '5000';
          break;
        case 3:
          e += '500';
          n += '500';
          break;
        case 4:
          e += '50';
          n += '50';
          break;
        case 5:
          e += '5';
          n += '5';
          break;
        case 6:
          break; // 10-digit refs are already 1m
        default:
          return new OsGridRef(NaN, NaN);
      }
      return new OsGridRef(e, n);
    }

    let gridref = OsGridRef.parse(gridrefString);
    gridref = normalizeGridRef(gridref);

    return gridref;
  },

  grid2coord(gridrefString) {
    const gridref = helpers.parseGrid(gridrefString);
    // eslint-disable-next-line
    if (!isNaN(gridref.easting) && !isNaN(gridref.northing)) {
      return OsGridRef.osGridToLatLon(gridref, LatLon.datum.WGS84);
    }

    return null;
  },

  /**
   * 1 gridref digits. (10000m)  -> < 4 map zoom lvl
   * 2 gridref digits. (1000m)   -> 7
   * 3 gridref digits. (100m)    -> 10
   * 4 gridref digits. (10m)     -> 12
   * 5 gridref digits. (1m)      ->
   */
  mapZoom2meters(accuracy) {
    let updated = accuracy;
    if (updated <= 4) {
      updated = 0;
    } else if (updated <= 7) {
      updated = 1;
    } else if (updated <= 10) {
      updated = 2;
    } else if (updated <= 12) {
      updated = 3;
    } else {
      updated = 4;
    }

    // eslint-disable-next-line
    updated = 5000 / Math.pow(10, updated); // meters
    return updated < 1 ? 1 : updated;
  },

  /**
   * 1 gridref digits. (10000m)
   * 2 gridref digits. (1000m)
   * 3 gridref digits. (100m)
   * 4 gridref digits. (10m)
   * 5 gridref digits. (1m)
   */
  _getGRgranularity(location) {
    let locationGranularity;
    let { accuracy } = location;

    // don't need to recalculate if exists
    if (location.source === 'gridref') {
      return accuracy;
    }

    // normalize to meters
    if (location.source === 'map') {
      accuracy = helpers.mapZoom2meters(accuracy);
    }

    // calculate granularity
    const digits = Math.log(accuracy) / Math.LN10;
    locationGranularity = 10 - digits * 2; // MAX GR ACC -
    locationGranularity = Number(locationGranularity.toFixed(0)); // round the float

    // normalize granularity
    // cannot be odd
    if (locationGranularity % 2 !== 0) {
      // should not be less than 2
      locationGranularity =
        locationGranularity === 1
          ? locationGranularity + 1
          : locationGranularity - 1;
    }

    if (locationGranularity > 10) {
      // no more than 10 digits
      locationGranularity = 10;
    } else if (locationGranularity < 2) {
      // no less than 2
      locationGranularity = 2;
    }
    return locationGranularity;
  },

  isInUK(location) {
    if (!location.latitude || !location.longitude) return null;

    let { gridref } = location;
    if (!gridref) {
      gridref = helpers.coord2grid(location);
    }

    if (gridref) return true;

    return false;
  },
};

export default helpers;
