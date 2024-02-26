const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./typeDef");
const { resolvers } = require("./resolvers");

require("dotenv").config();
require("./drivers/conect-db");

const app = express();

async function start() {
  app.use(cors());
  app.use(express.json());
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({app});

  app.set("PORT", process.env.PORT || 3000);

  app.use("/", (req, res) =>
    res.send("Back del proyecto de creación y consumo de APIs")
  );

  const port = app.get("PORT");
  app.listen(port, () => console.log(`Server listening on port ${port}`));
}

start(); // Llamamos a la función start antes de definir las rutas y de iniciar el servidor
