# Minimalistic ToDo App with tRPC, NextJS, Typescript, PlanetScale Prisma, Chakra UI and Clerk

Idea behind this project to create a minimalistic todo app with least amount of clutter with latest technologies.
Only has priority setting, input field for todo, complete and delete.

## Running the app
[Live App](https://min-todo-lemon.vercel.app/)

In order to run the you need couple of api keys. Create a .env file with these configs in it:

```bash
DATABASE_URL=""
NEXT_PUBLIC_CLERK_FRONTEND_API=""
CLERK_API_KEY=""
CLERK_JWT_KEY=""
```
For DB, you can use PlanetScale and create Mysql instance, and, for the Clerk just copy the keys to .env file.
Finally,

```bash
npm run dev
```

You may need to configure the auth options in Clerk - gives lots of options like magic link, password, social logins etc...
By the way, if you are deploying on Vercel, don't forget to add secrets to Vercel as well.

## Tech Stack

- tRPC
- NextJS
- Typescript
- PlanetScale
- Prisma
- ChakraUI and Clerk

## Feedback

If you have any feedback, please reach out to me or feel free to open up an issue.
