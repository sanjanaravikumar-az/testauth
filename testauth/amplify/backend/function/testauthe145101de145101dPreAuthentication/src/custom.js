/**
 * @type {import('@types/aws-lambda').PreAuthenticationTriggerHandler}
 */
exports.handler = async (event) => {
  // Block sign-in for disabled users via custom attribute
  const userAttributes = event.request.userAttributes;

  if (userAttributes['custom:blocked'] === 'true') {
    throw new Error('User account is disabled. Please contact support.');
  }

  console.log(`PreAuthentication: user ${event.userName} attempting sign-in`);
  return event;
};
