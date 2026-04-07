import { defineFunction } from '@aws-amplify/backend';

const branchName = process.env.AWS_BRANCH ?? 'sandbox';

export const testauthe145101de145101dDefineAuthChallenge = defineFunction({
  entry: './index.js',
  name: `testauthe145101de145101dDefineAuthChallenge-${branchName}`,
  timeoutSeconds: 25,
  memoryMB: 128,
  environment: {
    MODULES: 'boilerplate-define-challenge',
    ENV: `${branchName}`,
    REGION: 'us-east-1',
  },
  runtime: 22,
});
