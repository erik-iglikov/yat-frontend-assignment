import { getPod, getTokens } from './pod';

// Please refer to https://mswjs.io/docs/basics/request-matching for more
// details on how to create & match mock endpoints
export const handlers = [ getPod, getTokens ];
