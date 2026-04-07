/**
 * @type {import('@types/aws-lambda').PostAuthenticationTriggerHandler}
 */
exports.handler = async (event) => {
  const { userName } = event;
  const { email } = event.request.userAttributes;
  const sourceIp = event.request.userAttributes['custom:lastLoginIp'] || 'unknown';

  console.log(`PostAuthentication: user ${userName} (${email}) signed in successfully`);
  console.log(`Sign-in source IP: ${event.request.userAttributes['custom:sourceIp'] || 'N/A'}`);
  console.log(`Event timestamp: ${new Date().toISOString()}`);

  // You could extend this to write to DynamoDB, send SNS notifications, etc.
  return event;
};
