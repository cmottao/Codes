export { };

declare global {
  type ExecutionStatus = "OK" | "COMPILATION_ERROR" | "TIME_LIMIT_EXCEEDED" | "RUNTIME_ERROR" | undefined;

  interface Execution {
    status: ExecutionStatus;
    execution_time: string | undefined;
    output: string | undefined;
    log: string | undefined;
  };
}