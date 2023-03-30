import { sequelize } from '../lib/db'
import { DataTypes, Model } from 'sequelize'
import User from './User'

interface BetInstance extends Model<IBet>, IBet {}

const Bet = sequelize.define<BetInstance>("bet", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    userId: {
        type: DataTypes.INTEGER,
        references: { model: User, key: 'id' },
        allowNull: false,
    },
    betAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    chance: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    payout: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    win: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
});

Bet.sync()
    .then(() => {
        console.log("Bet Model synced");
    });

User.hasMany(Bet, { foreignKey: 'userId' });
Bet.belongsTo(User, { foreignKey: 'userId' });

export default Bet
