interface Seasons {
  year: number | null;
  seasons:
    | {
        name: string;
        slug: string;
      }[]
    | null;
}

export default Seasons;
