import instance from "./axios";

export const getSubmission = async (id: number) => {
  return instance.get<SubmissionDetail>(`/submissions/${id}`);
};

export const postSubmission = async (problem_id: number, code: string) => {
  return instance.post("/submissions", { problem_id, code });
};