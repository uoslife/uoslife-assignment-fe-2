# 과제 목표

- 주어진 API를 이용하여 Auth 관련 기능을 구현합니다.
- ky를 이용하여 API를 fetch 해옵니다.
- CRUD를 구현합니다.

# 가이드

- 과제 진행 이전 pnpm install 명령어로 필요한 dependencies를 설치해주세요.
- 패키지 매니저는 **pnpm**을 사용합니다.
- pnpm start 명령어로 프로젝트를 dev환경에서 실행할 수 있습니다.
- 기본적으로 스타일은 styled-components를 이용하여 구현합니다.
- 라우팅은 react-router-dom(v6)을 이용하여 구현해주세요. 기본 환경 설정이 되어있습니다.
- 개인 repository에 fork해서 과제 수행 후 PR을 올려주세요.
- index.tsx, pages폴더 내부 파일은 변경하지 말아주세요.

### API 관련

- 해당 과제에서 API는 [Platzi Fake Store API](https://fakeapi.platzi.com/en/rest/introduction)를 사용합니다.
- ky를 이용하여 API를 사용해주세요. 사용법은 [공식 github](https://github.com/sindresorhus/ky)를 참고해주세요.
- 아래와 같이 instance가 생성되어 있습니다. 생성된 instance를 사용하여 API를 이용해주세요.

```typescript
// src/api/index.ts
import ky from 'ky';

export const API = ky.create({
  timeout: 10 * 1000,
  prefixUrl: 'https://api.escuelajs.co/api/v1',
});

export default API;
```

- 새로 생성된 Ky instance 사용법은 [url](https://github.com/sindresorhus/ky#kycreatedefaultoptions)을 통해 알 수 있습니다.

# 구현 요구 사항

## Auth

### 요구사항 1. 로그인 기능을 구현해주세요

```bash
[POST] https://api.escuelajs.co/api/v1/auth/login
# Body
{
  "email": "john@mail.com",
  "password": "changeme"
}
```

- [API docs](https://fakeapi.platzi.com/en/rest/auth-jwt#authentication)
- 로그인 폼을 만들고 상기 API를 이용하여 예시 email, password를 입력 후 제출했을 때 Main page로 redirect하도록 구현해주세요.
- access_token과 refresh_token은 localstorage에 저장해주세요.
- 로그인 폼 디자인은 자유롭게 구현해도 좋습니다.
- **(추가) 회원정보가 모두 입력되지 않았다면 API 요청을 보내지 않도록 구현해주세요.**

### 요구사항 2. 로그인 유지 기능을 구현해주세요

```bash
[GET] https://api.escuelajs.co/api/v1/auth/profile
# Headers
{
  "Authorization": "Bearer {your access token}"
}
```

- [API docs](https://fakeapi.platzi.com/en/rest/auth-jwt#get-user-with-session)
- 브라우저 새로고침시에도 로그인이 유지되어야 합니다.
- **(추가) src/api/index.ts 파일을 수정하여 구현해주세요.** : [참고문서](https://github.com/sindresorhus/ky#hooksafterresponse)
- localstorage에 저장된 access_token을 이용하여 구현해주세요.
- 해당 API의 response code가 401이라면 로그아웃되고 login페이지로 redirect되어야 합니다.
- 로그인 상태에서 login페이지('/login')에 접근시 알림 문구와 함께 메인페이지로 redirect되어야 합니다.
- 마찬가지로 로그아웃 상태에서 main페이지('/')에 접근시 알림 문구와 함께 login페이지로 redirect되어야 합니다.

### 요구사항 3. 로그아웃 기능을 구현해주세요

- Main page의 로그아웃 버튼을 클릭하면 로그아웃되며 login페이지로 redirect되어야 합니다.
- 로그아웃시 localstorage의 token정보를 삭제해주세요.

### (추가) 추가 요구사항 1. contextAPI를 사용하여 isLogin 상태를 전역상태로 관리해주세요.

```typescript
// src/App.tsx
const App = () => {
  const [islogin, setIsLogin] = useState(false); // 해당 코드가 추가되었습니다.
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
};
```

- contextAPI를 사용하여 context를 App.tsx 파일에서 생성해주세요.
- RouterProvider를 context로 감싸서 구현하면 됩니다.
- isLogin 상태는 로그인과 로그아웃 버튼을 눌렀을 때, 그리고 '추가 요구사항 2'의 token 상태를 다룰 때 등의 상황에서 변경되어야 합니다.

### 추가 요구사항 2.access token 만료시 refresh token을 받아와 로그인 상태를 유지해주세요

```bash
[POST] https://api.escuelajs.co/api/v1/auth/refresh-token
# Body
{
  "refreshToken": "{your refresh token}"
}
```

- [API docs](https://fakeapi.platzi.com/en/rest/auth-jwt#get-a-new-access-token-with-a-refresh-token)
- access token이 만료되었다면 응답 코드가 401이므로 기존 구현에서는 로그아웃되어야 하지만, 저장된 refresh token으로 새로운 access token을 발급받아 로그인을 유지시킬 수 있습니다.
- src/api/index.ts 파일을 수정하여 구현해주세요.
- 참고 문서: https://github.com/sindresorhus/ky#hooksafterresponse

## Todo

- Todo List를 작성합니다.
- pages/Main.tsx 파일에 기능을 구현해주세요.
- Todo에 사용되는 component를 분리해서 사용하면 좋습니다.
- 만약 id: 3인 todo를 삭제하고, 새로운 todo를 작성하면 해당 todo의 id는 4가 됩니다. 이점 유의해주세요.
- **가급적 API를 로직에서 직접 호출하지 말고, 사용하는 API를 폴더에 분리하여 구현해주세요.**

### 수정 요구

- Todo API가 추가됨에 따라 src/api/index.ts 파일을 아래와 같이 수정해주세요.

```typescript
import ky from 'ky';

export const API = ky.create({
  timeout: 10 * 1000,
  prefixUrl: 'https://api.escuelajs.co/api/v1',
});

export const TODO_API = ky.create({
  timeout: 10 * 1000,
  prefixUrl: 'https://todo-assignment-cms.fly.dev/api/todos',
});
```

- 이에 따라 기존 API를 import 해올 때 변경이 발생합니다.

```typescript
import API from 'src/api'; // 기존
import { API } from 'src/api'; // 변경
```

### 요구사항 1. todo API를 이용하여 todo list를 불러와주세요

```bash
[GET] https://todo-assignment-cms.fly.dev/api/todos
# Response
{
    "data": {
        "id": 5,
        "attributes": {
            "todo": "test",
            "createdAt": "2023-07-11T02:48:06.820Z",
            "updatedAt": "2023-07-11T02:48:06.820Z",
            "publishedAt": "2023-07-11T02:48:06.816Z"
        }
    },
    "meta": {}
}
```

### 요구사항 2. 새로운 todo를 생성합니다

```bash
[POST] https://todo-assignment-cms.fly.dev/api/todos
# Body
{
  "data": {
    "todo": "test"
  }
}
# Response
{
    "data": {
        "id": 5,
        "attributes": {
            "todo": "test",
            "createdAt": "2023-07-11T02:48:06.820Z",
            "updatedAt": "2023-07-11T02:48:06.820Z",
            "publishedAt": "2023-07-11T02:48:06.816Z"
        }
    },
    "meta": {}
}
```

### 요구사항 3. 원하는 todo를 수정합니다

```bash
[PUT] https://todo-assignment-cms.fly.dev/api/todos/3
# Body
{
  "data": {
    "todo": "test3"
  }
}
# Response
{
    "data": {
        "id": 3,
        "attributes": {
            "todo": "test3",
            "createdAt": "2023-07-11T02:48:06.820Z",
            "updatedAt": "2023-07-11T02:48:06.820Z",
            "publishedAt": "2023-07-11T02:48:06.816Z"
        }
    },
    "meta": {}
}
```

### 요구사항 4. 원하는 todo list를 삭제합니다

```bash
[DELETE] https://todo-assignment-cms.fly.dev/api/todos/5
# Response
{
    "data": {
        "id": 5,
        "attributes": {
            "todo": "test5",
            "createdAt": "2023-07-11T02:48:06.820Z",
            "updatedAt": "2023-07-11T02:48:06.820Z",
            "publishedAt": "2023-07-11T02:48:06.816Z"
        }
    },
    "meta": {}
}
```

# 참고 문서 링크

- https://github.com/sindresorhus/ky
- https://fakeapi.platzi.com/en/rest/introduction
