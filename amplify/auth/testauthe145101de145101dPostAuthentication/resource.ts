import { defineFunction } from '@aws-amplify/backend';

const branchName = process.env.AWS_BRANCH ?? 'sandbox';

export const testauthe145101de145101dPostAuthentication = defineFunction({
  entry: './index.js',
  name: `testauthe145101de145101dPostAuthentication-${branchName}`,
  timeoutSeconds: 25,
  memoryMB: 128,
  environment: { MODULES: 'custom', ENV: `${branchName}`, REGION: 'us-east-1' },
  runtime: 22,
});
