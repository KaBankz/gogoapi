interface Anime {
  title: string;
  altTitles: string[] | null;
  cover: string;
  format: string;
  synopsis: string;
  genres: {
    name: string;
    slug: string;
  }[];
  status: string;
  year: number | null;
}

export default Anime;
