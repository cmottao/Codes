import instance from "./axios";

export const get_AC_statistics = async (handle: string) => {
  return instance.get<{
    totalAC: number;
    recentAC: number;
    totalSubmissions: number;
  }>(`${handle}/ac-statistics`);
};


export const getUserSubmissions = async (handle: string, pageLen: number, page: number, filter: "all" | "accepted" | "tried") => {
  return instance.get<{ submissions: SubmissionRow[] }>(
    `/${handle}/submissions?pageLen=${pageLen}&page=${page}&filter=${filter}`
  );
};

export const getUserSubmissionCount = async (handle: string, filter: "all" | "accepted" | "tried") => {
  return instance.get<{ submissionCount: number }>(
    `/${handle}/submission-count?filter=${filter}`
  );
};
