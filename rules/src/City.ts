export enum City {
  Altona = 1,
  Hamburg = 2
}

export const getRival = (city: City) => (city === City.Altona ? City.Hamburg : City.Altona)
