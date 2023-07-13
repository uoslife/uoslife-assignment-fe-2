import ky from 'ky';

export const API = ky.create({
  timeout: 10 * 1000,
  prefixUrl: 'https://api.escuelajs.co/api/v1',
});

// 이메일, 패스워드를 받아 로그인 요청
export const loginRequest = async (email: string, password: string) => {
  return await API.post('auth/login', {
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': `application/json`,
    },
    hooks: {
      afterResponse: [
        async (_request, _options, response) => {
          // 실패
          if (!response.ok)
            return new Response(JSON.stringify({ message: 'Login Failed!' }), {
              status: 401,
            });
          // 성공
          else {
            const { access_token, refresh_token } =
              (await response.json()) as any;

            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);

            return new Response(
              JSON.stringify({ message: 'Login Complete!' }),
              {
                status: 200,
              },
            );
          }
        },
      ],
    },
  });
};

export const refresh = async () => {
  const refreshToken = localStorage.getItem('refresh_token');

  // 토큰이 있는 경우
  if (refreshToken)
    return await API.get('auth/refresh-token', {
      headers: { refreshToken },
      hooks: {
        afterResponse: [
          async (_request, _options, response) => {
            // Refresh 실패
            if (!response.ok)
              return new Response(
                JSON.stringify({ message: 'Refresh Failed!' }),
                {
                  status: 401,
                },
              );
            // Refresh 성공
            else {
              const { access_token, refresh_token } =
                (await response.json()) as any;

              localStorage.setItem('access_token', access_token);
              localStorage.setItem('refresh_token', refresh_token);

              return new Response(
                JSON.stringify({ message: 'Refresh Completed!' }),
                { status: 200 },
              );
            }
          },
        ],
      },
    });
  // 토큰이 없는 경우
  else
    return new Response(
      JSON.stringify({ message: 'There is No Refresh Token!' }),
      {
        status: 401,
      },
    );
};

export const checkLoggedIn = async () => {
  const accessToken = localStorage.getItem('access_token');

  // 토큰이 있는 경우
  if (accessToken)
    return await API.get('auth/profile', {
      headers: { Authorization: 'Bearer ' + accessToken },
      hooks: {
        afterResponse: [
          async (_request, _options, response) => {
            // access 실패: 토큰이 만료된 경우
            if (!response.ok) {
              await refresh();

              const refreshedAccessToken = localStorage.getItem('access_token');

              // refresh 후 재도전
              return await API.get('auth/profile', {
                headers: { Authorization: 'Bearer ' + refreshedAccessToken },
                hooks: {
                  afterResponse: [
                    async (_request, _options, response) => {
                      // 또 실패 -> 끝
                      if (!response.ok)
                        return new Response(JSON.stringify('로그인 실패!'), {
                          status: 401,
                        });
                      // 됨
                      else
                        return new Response(JSON.stringify('됐다!'), {
                          status: 200,
                        });
                    },
                  ],
                },
              });
            }
            // access 성공
            else {
              return new Response(JSON.stringify('됐다!'), {
                status: 200,
              });
            }
          },
        ],
      },
    });
  // 토큰이 없는 경우
  else {
    await refresh();

    const refreshedAccessToken = localStorage.getItem('access_token');

    // refresh 후 재도전
    return await API.get('auth/profile', {
      headers: { Authorization: 'Bearer ' + refreshedAccessToken },
      hooks: {
        afterResponse: [
          async (_request, _options, response) => {
            // 또 실패 -> 끝
            if (!response.ok)
              return new Response(JSON.stringify('로그인 실패!'), {
                status: 401,
              });
            // 됨
            else
              return new Response(JSON.stringify('됐다!'), {
                status: 200,
              });
          },
        ],
      },
    });
  }
};

export default API;
