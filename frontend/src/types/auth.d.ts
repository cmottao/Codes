export { };

declare global {
  type Role = "admin" | "contestant" | "problem_setter";

  interface User {
    handle: string;
    roles: Role[];
  };
}