# Dice betting API

## Prerequisites
- Node.js v16 or above
- npm
- Typescript
- Graphql
- Sequelize

## Getting Started
1. Clone the repository to your local machine
2. Navigate to the repository's root directory using terminal or command prompt
3. Run `npm install` to install required packages and dependencies
4. Run `npm run build` to compile the TypeScript code
5. Run `npm start` to start the Express.js server
6. Server is now listening on `http://localhost:4000` by default

**Note:** After server started the seeder function will get called and 9 random users will be generated and added to database.
**Note:** You might need to run the system in DEV mode. You can do this by running `npm run dev`.

## Queries
- `getUser(id: Int): User`: Return user by id
- `getUserList: [User!]`: Return all users
- `getBet(id: Int)`: Return Bet by id
- `getBetList: [Bet!]`: Return all Bets
- `getBestBetPerUser(limit: Int): [Bet!]`: Return a list of the best bet each user has made.

## Mutations
- `createBet(userId: Int, betAmount: Float, chance: Float): Bet`: Create Bet based on inputs

## Code Structure
- `./index.ts`: appollo graphql server
- `./@types/`: Defined interfaces
- `./graph/`: contains typeDefs and resolvers files 
- `./lib/`: Libraries methods and useful functions (just db in this case)
- `./seeders/`: Contains user seeder file which run on start of server to have multiple users to bet
- `./models/`: Defined postgres models by sequelize 


