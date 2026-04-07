import { auth } from './auth/resource';
import { testauthe145101de145101dCreateAuthChallenge } from './auth/testauthe145101de145101dCreateAuthChallenge/resource';
import { testauthe145101de145101dCustomMessage } from './auth/testauthe145101de145101dCustomMessage/resource';
import { testauthe145101de145101dDefineAuthChallenge } from './auth/testauthe145101de145101dDefineAuthChallenge/resource';
import { testauthe145101de145101dPostAuthentication } from './auth/testauthe145101de145101dPostAuthentication/resource';
import { testauthe145101de145101dPreAuthentication } from './auth/testauthe145101de145101dPreAuthentication/resource';
import { testauthe145101de145101dVerifyAuthChallengeResponse } from './auth/testauthe145101de145101dVerifyAuthChallengeResponse/resource';
import { defineBackend } from '@aws-amplify/backend';
import { Duration } from 'aws-cdk-lib';

const backend = defineBackend({
  auth,
  testauthe145101de145101dCreateAuthChallenge,
  testauthe145101de145101dCustomMessage,
  testauthe145101de145101dDefineAuthChallenge,
  testauthe145101de145101dPostAuthentication,
  testauthe145101de145101dPreAuthentication,
  testauthe145101de145101dVerifyAuthChallengeResponse,
});
const branchName = process.env.AWS_BRANCH ?? 'sandbox';
backend.testauthe145101de145101dCreateAuthChallenge.resources.cfnResources.cfnFunction.functionName = `testauthe145101de145101dCreateAuthChallenge-${branchName}`;
backend.testauthe145101de145101dCustomMessage.resources.cfnResources.cfnFunction.functionName = `testauthe145101de145101dCustomMessage-${branchName}`;
backend.testauthe145101de145101dDefineAuthChallenge.resources.cfnResources.cfnFunction.functionName = `testauthe145101de145101dDefineAuthChallenge-${branchName}`;
backend.testauthe145101de145101dPostAuthentication.resources.cfnResources.cfnFunction.functionName = `testauthe145101de145101dPostAuthentication-${branchName}`;
backend.testauthe145101de145101dPreAuthentication.resources.cfnResources.cfnFunction.functionName = `testauthe145101de145101dPreAuthentication-${branchName}`;
backend.testauthe145101de145101dVerifyAuthChallengeResponse.resources.cfnResources.cfnFunction.functionName = `testauthe145101de145101dVerifyAuthChallengeResponse-${branchName}`;
const cfnUserPool = backend.auth.resources.cfnResources.cfnUserPool;
cfnUserPool.usernameAttributes = ['email'];
cfnUserPool.policies = {
  passwordPolicy: {
    minimumLength: 8,
    requireUppercase: false,
    requireLowercase: false,
    requireNumbers: false,
    requireSymbols: false,
    temporaryPasswordValidityDays: 7,
  },
};
const userPool = backend.auth.resources.userPool;
userPool.addClient('NativeAppClient', {
  refreshTokenValidity: Duration.days(30),
  enableTokenRevocation: true,
  enablePropagateAdditionalUserContextData: false,
  authSessionValidity: Duration.minutes(3),
  disableOAuth: true,
  generateSecret: false,
});
