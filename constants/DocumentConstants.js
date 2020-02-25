/**
 * TEAM: customs
 * @flow
 */
// This is configured in NGINX here:
// https://github.com/flexport/flexport/blob/c95bf309c37c81122e9f5ba5302300ec7f4ba135/docker/prod/nginx/flexport.conf#L17
// Any upload request with a payload size greater than 25MB will be rejected by NGINX and not reach our app server
// eslint-disable-next-line import/prefer-default-export
export const MAX_FILE_SIZE = 25000000;
