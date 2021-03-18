type allStepsData = {
  name: string;
  steps: {
    date: string;
    stepCount: number;
  }[];
}[];

export const getAllUserSteps = async (): Promise<allStepsData> => {
  const response = await fetch("/.netlify/functions/steps-get-all", { method: "GET" });

  const steps = await response.json();
  return steps;
};

export const runStepsCron = async (): Promise<null> => {
  await fetch("/.netlify/functions/steps-cron", { method: "GET" });
  return null;
};
