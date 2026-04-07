import { defineAuth } from '@aws-amplify/backend';
import { testauthe145101de145101dCreateAuthChallenge } from './testauthe145101de145101dCreateAuthChallenge/resource';
import { testauthe145101de145101dCustomMessage } from './testauthe145101de145101dCustomMessage/resource';
import { testauthe145101de145101dDefineAuthChallenge } from './testauthe145101de145101dDefineAuthChallenge/resource';
import { testauthe145101de145101dPostAuthentication } from './testauthe145101de145101dPostAuthentication/resource';
import { testauthe145101de145101dPreAuthentication } from './testauthe145101de145101dPreAuthentication/resource';
import { testauthe145101de145101dVerifyAuthChallengeResponse } from './testauthe145101de145101dVerifyAuthChallengeResponse/resource';

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailSubject: 'Your verification code',
      verificationEmailBody: () => 'Your verification code is {####}',
    },
  },
  userAttributes: {
    email: {
      required: true,
      mutable: true,
    },
  },
  triggers: {
    createAuthChallenge: testauthe145101de145101dCreateAuthChallenge,
    customMessage: testauthe145101de145101dCustomMessage,
    defineAuthChallenge: testauthe145101de145101dDefineAuthChallenge,
    postAuthentication: testauthe145101de145101dPostAuthentication,
    preAuthentication: testauthe145101de145101dPreAuthentication,
    verifyAuthChallengeResponse:
      testauthe145101de145101dVerifyAuthChallengeResponse,
  },
  multifactor: {
    mode: 'OFF',
  },
});
