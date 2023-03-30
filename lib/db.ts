import { Sequelize } from 'sequelize'

// const sequelize = new Sequelize(config.database, config.username, config.password, {
//     host: config.host,
//     dialect: 'postgres'
//   });

const sequelize = new Sequelize('sqlite::memory:') // I used in memory sample database here to have sample tiny database

  const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
export {
    sequelize,
    testDbConnection
}
