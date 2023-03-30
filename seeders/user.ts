import { faker } from '@faker-js/faker';
import Bet from '../models/Bet';
import User from '../models/User';

const NUM_USERS = 10;

function generateUsers(num: number) {
    const users = [];

    for (let i = 1; i < num; i++) {
        users.push({
            id: i,
            name: faker.name.fullName(),
            balance: Number(faker.finance.amount(100, 1000)),
        });
    }

    return users;
}

export async function seed() {
    const users = await User.bulkCreate(generateUsers(NUM_USERS));

    console.log(`Seeded database with ${users.length} users`);

    return true
}