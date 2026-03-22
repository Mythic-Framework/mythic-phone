/**
 * Leo Assist — Mock Data  (DEV ONLY)
 * ====================================
 * All exports are empty in production.
 * In development (import.meta.env.DEV) they return realistic fixture data
 * for every Leo Assist tab so the UI can be worked on without a live server.
 *
 * Nui.ts reads MOCK_NUI and returns the matching array for each NUI event.
 * dataReducer.ts already seeds leoAlerts in its initialState for the
 * Activity tab — no extra wiring needed there.
 */

const IS_DEV = import.meta.env.DEV;

/* ═══════════════════════════════════════════════════════════════════════════
   PEOPLE  (Person tab — SearchPeople)
   Fields rendered by Person.tsx → fields():
     First, Last, Gender (bool: true=F / false=M), DOB, Origin.label,
     Phone, Licenses.{ Drivers.{ Active, Points }, Gun, Hunting, Fishing }
═══════════════════════════════════════════════════════════════════════════ */
const _mockPeople = [
  {
    First: 'James',   Last: 'Holloway', Gender: false,
    DOB: '1989-04-17', Origin: { label: 'American' }, Phone: '555-0193',
    Licenses: {
      Drivers: { Active: true,  Points: 2  },
      Gun:     { Active: true              },
      Hunting: { Active: false             },
      Fishing: { Active: true              },
    },
  },
  {
    First: 'Sofia',   Last: 'Reyes',    Gender: true,
    DOB: '1995-11-02', Origin: { label: 'Mexican' }, Phone: '555-0247',
    Licenses: {
      Drivers: { Active: true,  Points: 0  },
      Gun:     { Active: false             },
      Hunting: { Active: false             },
      Fishing: { Active: false             },
    },
  },
  {
    First: 'Marcus',  Last: 'Webb',     Gender: false,
    DOB: '1978-07-30', Origin: { label: 'British' }, Phone: undefined,
    Licenses: {
      Drivers: { Active: false, Points: 12 },
      Gun:     { Active: false             },
      Hunting: { Active: true              },
      Fishing: { Active: true              },
    },
  },
  {
    First: 'Aiko',    Last: 'Tanaka',   Gender: true,
    DOB: '2001-03-15', Origin: { label: 'Japanese' }, Phone: '555-0388',
    Licenses: {
      Drivers: { Active: true,  Points: 0  },
      Gun:     { Active: false             },
      Hunting: { Active: false             },
      Fishing: { Active: false             },
    },
  },
  {
    First: 'Darius',  Last: 'Knight',   Gender: false,
    DOB: '1982-09-08', Origin: { label: 'American' }, Phone: '555-0512',
    Licenses: {
      Drivers: { Active: true,  Points: 5  },
      Gun:     { Active: true              },
      Hunting: { Active: true              },
      Fishing: { Active: false             },
    },
  },
  {
    First: 'Nina',    Last: 'Castillo', Gender: true,
    DOB: '1990-06-22', Origin: { label: 'Colombian' }, Phone: '555-0671',
    Licenses: {
      Drivers: { Active: true,  Points: 1  },
      Gun:     { Active: true              },
      Hunting: { Active: false             },
      Fishing: { Active: true              },
    },
  },
  {
    First: 'Ray',     Last: 'Okafor',   Gender: false,
    DOB: '1975-02-11', Origin: { label: 'Nigerian' }, Phone: undefined,
    Licenses: {
      Drivers: { Active: true,  Points: 0  },
      Gun:     { Active: false             },
      Hunting: { Active: true              },
      Fishing: { Active: false             },
    },
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   VEHICLES  (Vehicle tab — SearchVehicle)
   Fields rendered by Vehicle.tsx:
     Plate (string), Owner (string | undefined)
═══════════════════════════════════════════════════════════════════════════ */
const _mockVehicles = [
  { Plate: 'AB12CDE', Owner: 'James Holloway'  },
  { Plate: 'SR99XYZ', Owner: 'Sofia Reyes'     },
  { Plate: 'MWB44LX', Owner: 'Marcus Webb'     },
  { Plate: 'AT20NKJ', Owner: undefined          },  // unregistered — tests "Unknown Owner"
  { Plate: 'DK77RPQ', Owner: 'Darius Knight'   },
  { Plate: 'LS00BTV', Owner: 'Nina Castillo'   },
  { Plate: 'RO55TAX', Owner: 'Ray Okafor'      },
  { Plate: 'XX99ERR', Owner: undefined          },  // second unregistered plate
];

/* ═══════════════════════════════════════════════════════════════════════════
   PROPERTIES  (Property tab — SearchProperty)
   Fields rendered by Property.tsx:
     label (string), sold (boolean), owner (string | undefined)
═══════════════════════════════════════════════════════════════════════════ */
const _mockProperties = [
  { label: '1 Alta St, Rockford Hills',        sold: true,  owner: 'James Holloway' },
  { label: '22 Amarillo Vista, Sandy Shores',  sold: false, owner: undefined        },
  { label: '7 Spanish Ave, Paleto Bay',        sold: true,  owner: 'Sofia Reyes'    },
  { label: '14 Power St, Pillbox Hill',        sold: false, owner: undefined        },
  { label: '3 Elgin Ave, Downtown LS',         sold: true,  owner: 'Darius Knight'  },
  { label: '99 Maze Bank Ave, Rockford Hills', sold: false, owner: undefined        },
  { label: '5 Palomino Ave, East Vinewood',    sold: true,  owner: 'Nina Castillo'  },
  { label: '12 Innocence Blvd, Strawberry',    sold: false, owner: undefined        },
  { label: '8 Dutch London St, Banning',       sold: true,  owner: 'Ray Okafor'     },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LEO ALERTS  (Activity tab)
   Already seeded in dataReducer.ts initialState.data.leoAlerts.
   Exported here in case you want to dispatch richer ones in dev.
   Fields consumed by Alert.tsx:
     code, title, time, location.{ street1, street2, area, x, y, z }
═══════════════════════════════════════════════════════════════════════════ */
const _mockLeoAlerts = [
  {
    code: '10-31A', title: 'Breaking & Entering',
    time: Date.now() - 1_000 * 60 * 2,
    location: { street1: 'Buccaneer Way', street2: null,       area: 'Terminal',       x: 617.0,   y: -2219.0, z: 6.0  },
  },
  {
    code: '10-80',  title: 'Vehicle Pursuit in Progress',
    time: Date.now() - 1_000 * 60 * 9,
    location: { street1: 'N Rockford Dr', street2: null,       area: 'Vinewood',       x: -1042.6, y: 233.8,   z: 55.3 },
  },
  {
    code: '10-54',  title: 'Possible Dead Body',
    time: Date.now() - 1_000 * 60 * 25,
    location: { street1: 'Elgin Ave',     street2: 'Power St', area: 'Downtown LS',    x: -164.3,  y: -299.1,  z: 39.0 },
  },
  {
    code: '10-31',  title: 'Crime in Progress',
    time: Date.now() - 1_000 * 60 * 41,
    location: { street1: 'Alta St',       street2: null,       area: 'Rockford Hills', x: -776.4,  y: 312.1,   z: 85.7 },
  },
  {
    code: '10-11',  title: 'Animal Problem',
    time: Date.now() - 1_000 * 60 * 58,
    location: { street1: 'Palomino Ave',  street2: null,       area: 'East Vinewood',  x: 318.8,   y: -178.5,  z: 47.2 },
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   PUBLIC EXPORTS — empty in production, real data in dev
═══════════════════════════════════════════════════════════════════════════ */
export const mockPeople     = IS_DEV ? _mockPeople     : [];
export const mockVehicles   = IS_DEV ? _mockVehicles   : [];
export const mockProperties = IS_DEV ? _mockProperties : [];
export const mockLeoAlerts  = IS_DEV ? _mockLeoAlerts  : [];

/** Lookup table used by Nui.ts to resolve mock responses by event name. */
export const MOCK_NUI: Record<string, unknown[]> = IS_DEV
  ? {
      SearchPeople:   _mockPeople,
      SearchVehicle:  _mockVehicles,
      SearchProperty: _mockProperties,
    }
  : {};
