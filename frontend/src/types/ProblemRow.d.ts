export { };
declare global {
  interface ProblemRow {
    id: number;
    name: string;
    status: "AC" | "TL" | "WA" | "CE" | "RT" | "NT";
    author: string;
    times_solved: number;
  };
}
