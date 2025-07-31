export { };
declare global {
  interface ProblemsetterProblemRow {
    problem_id: number;
    problem_name: string;
    problemsetter_handle: string;
    problem_editorial: string;
    accepted_submissions: number;
    total_submissions: number;
  };
}