import { defineFunction } from '@aws-amplify/backend';

const branchName = process.env.AWS_BRANCH ?? 'sandbox';

export const testauthe145101de145101dCustomMessage = defineFunction({
  entry: './index.js',
  name: `testauthe145101de145101dCustomMessage-${branchName}`,
  timeoutSeconds: 25,
  memoryMB: 128,
  environment: {
    EMAILSUBJECT: 'custom account confirmation email',
    MODULES: 'verification-link',
    VERIFYURL: 'http://localhost:5174/verify',
    REDIRECTURL: 'www.google.com',
    RESOURCENAME: 'testauthe145101de145101dCustomMessage',
    ENV: `${branchName}`,
    EMAILMESSAGE: 'follow this link for confirmation code',
    REGION: 'us-east-1',
  },
  runtime: 22,
});
