import type { Response, Request } from '@sveltejs/kit';
import * as api from '$lib/shared/apis';

//
// POST /users/sign_in
//
export const post = async (request: Request): Promise<Response> => {
  const body = api.getFormBody(request.body);
  const cookiesArray = [];
  const { response, json } = await api.post(
    request.locals.API_ENDPOINT,
    'users/sign_in',
    {
      user: { login: body['login'], password: body['password'] },
      browser: body['browser'],
      ip: body['ip'],
      os: body['os'],
    },
    { aud: request.headers.jwt_aud || 'UNKNOWN' }
  );
  let headers = response.headers;
  if (response.status === 200) {
    cookiesArray.push(
      `jwt=${json.jwt};path=/;HttpOnly;Secure;expires=Fri, 31 Dec 9999 23:59:59 GMT`
    );
    cookiesArray.push(
      `userId=${json.user.id};path=/;HttpOnly;Secure;expires=Fri, 31 Dec 9999 23:59:59 GMT`
    );
    cookiesArray.push(
      `displayName=${json.user.displayName};path=/;HttpOnly;Secure;expires=Fri, 31 Dec 9999 23:59:59 GMT`
    );
    cookiesArray.push(
      `username=${json.user.username};path=/;HttpOnly;Secure;expires=Fri, 31 Dec 9999 23:59:59 GMT`
    );
    delete json.jwt;
  }

  headers = {
    ...response.headers,
    'set-cookie': cookiesArray,
  };

  if (request.headers['content-type'] !== 'application/json') {
    if ([200].includes(response.status)) {
      headers.location = '/?success=t';
    } else if ([401, 500].includes(response.status)) {
      headers.location = `/?error=${json.error}`;
    }
    return {
      status: 303,
      body: '',
      headers,
    };
  }

  return {
    status: response.status,
    body: json,
    headers,
  };
};
