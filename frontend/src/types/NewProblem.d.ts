export interface NewProblem {
    name: string | null;
    statement: string;
    editorial: string;
    time_limit_seconds: number;
    memory_limit_mb: number;
    problemsetter_handle: string;
    input: string;
    output: string;
}