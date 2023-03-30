import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { testDbConnection } from './lib/db'
import { seed as userSeeder } from './seeders/user';
import typeDefs from './graph/typeDefs';
import resolvers from './graph/resolvers';

(async () => {

    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    try {
        await testDbConnection();

        const { url } = await startStandaloneServer(server, {
            listen: { port: 4000 },
        });

        await userSeeder()

        console.log(`🚀  Server ready at: ${url}`);

    } catch (error) {
        console.error('Unable to connect to the server:', error);
    }
})();