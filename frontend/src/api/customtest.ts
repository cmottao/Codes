import instance from "./axios";

export const customtest = async (code: string, input: string) => {
  return instance.post<Execution>("/customtest", { code, input });
};
