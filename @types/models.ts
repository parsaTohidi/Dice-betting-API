interface IBet {
    id: number,
    userId: number
    betAmount: number
    chance: number
    payout: number
    win: Boolean
}


interface IUser {
    id: number
    name: String
    balance: number
}