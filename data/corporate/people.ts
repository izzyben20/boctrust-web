import raw from "./people.json";

/** From the current site's public /api/board-member and /api/management-staff records. */
export type Person = {
  slug: string;
  name: string;
  title: string;
  qualifications: string | null;
  photo: string;
  bio: string[];
};

export const BOARD: Person[] = raw.board;
export const MANAGEMENT: Person[] = raw.management;
