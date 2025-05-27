export interface PeopleResponse {
  results: Person[];
  next: string | null;
  previous: string | null;
}

export type Person ={
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  created: string;
  edited: string;
  homeworld: string;
}
