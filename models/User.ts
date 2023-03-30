import { sequelize } from '../lib/db'
import { DataTypes, Model } from 'sequelize'

interface UserInstance extends Model<IUser>, IUser {}

const User = sequelize.define<UserInstance>("user", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    balance: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    }
});

User.sync()
    .then(() => {
        console.log("User Model synced");
    });

export default User