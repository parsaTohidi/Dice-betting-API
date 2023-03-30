import User from '../models/User';
import Bet from '../models/Bet';
import { customAlphabet } from 'nanoid';

/* IMPORTANT_NOTE:If we have more complex system we should create a directory for
   database respositories to define the queries there and just use it here */
export default {
    Query: {
        getUser: (_: any, args: { id: number }) => {
            return User.findOne({ where: { id: args.id } })
        },
        getUserList: () => {
            return User.findAll()
        },
        getBet: (_: any, args: { id: number }) => {
            return Bet.findOne({ where: { id: args.id } })
        },
        getBetList: () => {
            return Bet.findAll()
        },
        // **NOTE: here I wanted to create array of user objects which contains their best bets. but based on the query the task requirements
        // ** has provided in the Email the output of getBestBetPerUser query must be just list of bets, so I decided to respect it. 
        getBestBetPerUser: async (_: any, args: { limit: number }) => {
            try {
                let allBets: IBet[] = []
                const users: IUser[] = await User.findAll()
                for (let i = 0; i < users.length; i++) {
                    const bets: IBet[] = await Bet.findAll({
                        where: { userId: users[i].id, win: true },
                        order: [
                            ['payout', 'DESC']
                        ],
                        limit: args.limit
                    })
                    allBets = allBets.concat(bets)
                }
                return allBets
            } catch (e) {
                console.log(e)
            }
        },
    },
    Mutation: {
        createBet: async (_: any, args: { userId: number, betAmount: number, chance: number }) => {
            try {
                const user = await User.findOne({ where: { id: args.userId } })
                if (!user) {
                    throw new Error('User not found')
                }

                if (args.betAmount < 0) {
                    throw new Error('invalid betAmount')
                }
                if (user.balance < args.betAmount) {
                    throw new Error('not enough balance')
                }
                if (0 > args.chance || args.chance > 100) {
                    throw new Error('invalid chance')
                }

                const nanoid = customAlphabet('1234567890', 8)

                const newBet: IBet = await Bet.create({
                    id: Number(nanoid()),
                    userId: args.userId,
                    betAmount: args.betAmount,
                    chance: args.chance,
                    payout: (100 / args.chance) * args.betAmount,
                    win: Math.random() <= (args.chance / 100)
                })

                const updatedBalance = newBet.win ? user.balance + newBet.payout : user.balance - newBet.betAmount
                await user.update({ balance: updatedBalance })

                return newBet
            } catch (error) {
                throw error
            }
        }
    }
};