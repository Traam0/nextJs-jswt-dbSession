## User Authentication with Next.js, MongoDB, and JWTs

This documentation provides an overview of the user authentication
implementation using Next.js, MongoDB, and JSON Web Tokens (JWTs). The
authentication system allows users to securely log in, generates refresh and
access tokens (RTS and ATS), and stores session data in a MongoDB database.

### Authentication Flow

1.  **User Login**: Users provide their credentials (e.g., email and password)
    to log in to the application.
2.  **Credential Verification**: The system validates the provided credentials
    by comparing them to the stored user data in MongoDB.
3.  **Token Generation**: If the credentials are valid, the system generates a
    refresh token (RTS) using JSON Web Tokens. The RTS contains user
    identification information.
4.  **Session Management**: The system stores the user session in the MongoDB
    database, associating it with the user's ID and the generated RTS. Any
    existing refresh tokens for the user are deleted to ensure single-session
    usage.
5.  **Access Token Generation**: An access token (ATS) is created with a shorter
    lifespan. It contains the user's ID, email, and the RTS.
6.  **Token Attachement**: The ATS is attached to the response as an HTTP-only
    cookie to enable subsequent authorized requests from the client.
7.  **Authentication Middleware**: An authentication middleware function is
    implemented to validate the ATS on protected routes or APIs. The middleware
    decodes and verifies the ATS using the JWT library and ensures the
    authenticity and expiration of the token.
8.  **Token Refreshment**: When the ATS expires, the client can use the RTS to
    request a new ATS from the server without requiring the user to log in
    again. The RTS is sent to the server, verified, and a new ATS is generated
    and attached to the response.

### Benefits

- Secure user authentication: The system ensures secure user login by comparing
  credentials, generating JWTs, and verifying tokens on subsequent requests.
- Stateless authentication: JWTs allow for stateless authentication, eliminating
  the need to store session data on the server and reducing database
  dependencies.
- Database session storage: User sessions are stored in a MongoDB database,
  enabling session persistence and effective session management.

## Dependencies

To implement the user authentication functionality using Next.js, MongoDB (or
your preferred database), and JSON Web Tokens (JWTs), you'll need to install the
following dependencies:

- `next`: The Next.js framework for server-side rendering and API development.
- `mongoose` (or your preferred database library): The MongoDB object modeling
  tool for interacting with the database. If you choose a different database,
  make sure to modify the code accordingly.
- `jsonwebtoken`: A library for generating and verifying JSON Web Tokens (JWTs).
- `http-status-codes` (optional): A collection of HTTP status codes for
  convenient status code reference.
- `cookies-next`: A library for handling HTTP cookies in Next.js applications.
- `bcryptjs` (or your preferred password hashing library): A library for hashing
  and comparing passwords securely. If you opt for a different library, ensure
  that you make the necessary code modifications.
- `@tanstack/react-query`: is a powerful and flexible data-fetching library for
  React applications.

You can install these dependencies using a package manager like npm or yarn.
Here's an example command to install them using npm:

```
npm install next mongoose jsonwebtoken http-status-codes bcryptjs cookies-next @tanstack/react-query
```

Make sure to add the necessary import statements in your code to use these
dependencies effectively.

Note: If you're using a different database or password hashing library, make
sure to modify the code accordingly, replacing `mongoose` and `bcryptjs` with
the appropriate libraries.

## Utils Folder

To handle common utility functions in your project, create a `utils` folder with
the following structure:

```
Project_DIR
└── utils
    ├── [index.ts]
    ├── [cookies.ts]
    └── [jwt.ts]
```

The `utils` folder contains three files: [index.ts](#), [cookies.ts](#), and
[jwt.ts](#), each serving a specific purpose. Here's an overview of each file:

### [index.ts](#)

This file serves as an entry point for the utility functions in the `utils`
folder. It imports functions from other files and exports them, allowing you to
access all utility functions from a single location. You can organize and
structure your imports and exports based on your specific needs.

### [jwt.ts](#)

The [jwt.ts](#) file exports a function that is responsible for signing JSON Web
Tokens (JWTs). It takes the necessary payload and expiration time as parameters
and returns a signed JWT string. You can customize this file according to your
specific JWT signing requirements, such as adding a secret key or configuring
additional options.

### [cookies.ts](#)

The [cookies.ts](#) file exports a function that handles attaching cookies to
the API response. This function takes the request (`req`), response (`res`), and
the token as parameters. It adds the cookie to the response headers, allowing
you to set cookies for authentication purposes or other use cases. Customize
this file as needed to suit your specific cookie handling requirements.

Please note that the actual implementation and code logic of these files may
vary based on your project's specific needs. Feel free to modify and extend them
according to your requirements.

Use the links above to access the code for each file. Adapt the code to fit your
project's structure and functionality.

## Middleware Folder

To organize your middleware functions in your project, create a `middlewares`
folder with the following structure:

```
Project_DIR
└── middlewares
    ├── [index.ts]
    ├── [authMiddleware.ts]
    └── [connDB.ts]
```

The `middlewares` folder contains three files: [index.ts](#),
[authMiddleware.ts](#), and [connDB.ts], each serving a specific purpose. Here's
an overview of each file:

### [index.ts](#)

The [index.ts](#) file serves as an entry point for the middleware functions in
the `middlewares` folder. It imports functions from other files and exports
them, allowing you to access all middleware functions from a single location.
This centralizes your middleware logic for easy management and organization.

### [authMiddleware.ts](#)

The [authMiddleware.ts](#) file exports a middleware function that handles
authentication for protected endpoints. This function takes the request (`req`),
response (`res`), and next (`next`) as parameters. Within the middleware
function, you can implement the necessary logic to check the authentication
status of the request, such as verifying tokens or validating user credentials.
If authentication fails, you can choose to return an appropriate response or
redirect the user. This middleware function also handles the refreshing of
Access Tokens (ATS) if needed. Adapt this file to fit your specific
authentication and token management requirements.

### [connDB.ts](#)

The [connDB.ts](#) file exports a middleware function that handles the
connection to the MongoDB database. This function ensures that the database
connection is established before executing subsequent operations. If you are not
using MongoDB or have a different database setup, you can modify this file
accordingly to establish the connection to your chosen database system.

Please note that the actual implementation and code logic of these files may
vary based on your project's specific needs. Feel free to modify and extend them
according to your requirements.

Use the links above to access the code for each file. Adapt the code to fit your
project's structure and functionality

## Errors Folder <sub>(optional)</sub>

```
Project_DIR
└── erros
	├── [index.ts]
	└── [...errorFiles.ts]
```

Please note that the presence of this folder depends on whether you are using
the `http-status-codes` package, which is recommended for better content
management.

The `errors` folder contains multiple files, including:

- [`index.ts`](#): This file imports functions from other error files and
  exports them, providing a central location for managing and exporting error
  functions.
- Each individual error file (e.g., `ConflictError.ts`, `NotFoundError.ts`):
  These files export functions that take a response object as an argument, along
  with a message. These functions handle the response with the corresponding
  status code (e.g., `StatusCodes.OK`, `StatusCodes.CONFLICT`) and the
  appropriate message.

Please refer to the specific files in the `errors` folder for more details on
how the error functions are implemented and used.

## Hooks Folder

```
Project_DIR
└── hooks
	├── [index.ts]
	└── [useSession.ts]
```

The hooks folder contains two files:
[index.ts](https://chat.openai.com/hooks/index.ts) and
[useSession.ts](https://chat.openai.com/hooks/useSession.ts).

- [index.ts](https://chat.openai.com/hooks/index.ts): This file serves as the
  entry point for accessing the hooks defined in the folder. It imports
  functions from other files and exports them, providing a centralized place to
  import and use the hooks throughout the application.
- [useSession.ts](https://chat.openai.com/hooks/useSession.ts): This file
  exports a custom hook called `useSession`. The `useSession` hook is
  responsible for handling client session fetching. It utilizes the
  functionality of `@tanstack/react-query`, **(makes use of authMiddleware)**,
  to request a session object from the server. It also handles automatic
  refetching of the session data when it becomes stale or when the window
  regains focus.

By organizing hooks in the hooks folder and utilizing the `useSession` hook, you
can easily manage session-related fetching and refetching logic in your
application using the powerful features provided by `@tanstack/react-query`.

## Modals Folder

```
Project_DIR
└── Modals
	├── [index.ts]
	├── [User.ts]
	└── [Session.ts]
```

The models folder contains three files:
[index.ts](https://chat.openai.com/models/index.ts),
[User.ts](https://chat.openai.com/models/User.ts), and
[Session.ts](https://chat.openai.com/models/Session.ts).

- [index.ts](https://chat.openai.com/models/index.ts): This file serves as the
  entry point for accessing the models defined in the folder. It imports
  functions from other files and exports them, providing a centralized place to
  import and use the models throughout the application.
- [User.ts](https://chat.openai.com/models/User.ts): This file exports the
  `UserCollection` schema. The `UserCollection` schema defines the structure and
  properties of the user data stored in the database. Please note that the
  implementation may vary depending on your database choice.
- [Session.ts](https://chat.openai.com/models/Session.ts): This file exports the
  `SessionCollection` schema. The `SessionCollection` schema defines the
  structure and properties of the session data stored in the database. This is
  used for managing user sessions and storing session-related information.
  Again, keep in mind that the implementation may vary based on your chosen
  database system.

By organizing your models in the models folder, you can maintain a clear
separation of concerns and easily manage the schemas and data structures
associated with your application's entities.
