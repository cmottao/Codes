export { };
declare global {
  interface SubmissionDetail {
    id: number;
    problemId: number;
    contestant: string;
    problemName: string;
    status: "QU"| "AC" | "WA" | "TL" | "RT" | "CE";
    executionTime: string;
    date: string;
    code: string;
  };
};