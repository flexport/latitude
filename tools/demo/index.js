/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */

export type StarWarsCharacter = {
  name: string,
  team: string,
  id: number,
};

// eslint-disable-next-line import/prefer-default-export
export const characters: $ReadOnlyArray<StarWarsCharacter> = [
  {
    name: "Darth Vader",
    team: "Empire",
    id: 0,
  },
  {
    name: "Anakin Skywalker",
    team: "Rebel Alliance",
    id: 1,
  },
  {
    name: "Jar Jar Binx",
    team: "Rebel Alliance",
    id: 2,
  },
  {
    name: "Count Dooku",
    team: "Empire",
    id: 4,
  },
  {
    name: "Emperor Palpatine",
    team: "Empire",
    id: 5,
  },
  {
    name: "Han Solo",
    team: "Rebel Alliance",
    id: 6,
  },
  {
    name: "Princess Leia",
    team: "Rebel Alliance",
    id: 7,
  },
  {
    name: "Obi-Wan Kenobi",
    team: "Rebel Alliance",
    id: 8,
  },
  {
    name: "Chewbacca",
    team: "Rebel Alliance",
    id: 9,
  },
  {
    name: "R2-D2",
    team: "Rebel Alliance",
    id: 10,
  },
  {
    name: "C-3PO",
    team: "Rebel Alliance",
    id: 11,
  },
  {
    name: "Stormtrooper",
    team: "Empire",
    id: 12,
  },
  {
    name: "Wilhuff Tarkin",
    team: "Empire",
    id: 13,
  },
  {
    name: "Death Star Gunner",
    team: "Empire",
    id: 14,
  },
];
