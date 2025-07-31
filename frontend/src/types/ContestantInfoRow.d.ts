export { };
declare global {
  interface ContestantInfoRow {
    handle: string;
    lastSubmissionDaysAgo: number;
    submissions: number; 
    ACSubmissions: number; 
    isFriend: boolean;
  };
}