import createClient from '@plone/client';

/**
 * Create a Plone client with authentication token for private content
 * @param token 
 * @returns Plone client
 */
export const ploneClient = (token = undefined) =>
  new createClient({
    apiPath: process.env.NEXT_PUBLIC_PLONE_API_URL!,
    token: token,
  });
