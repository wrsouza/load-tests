import "./config/otel";

import { faker } from "@faker-js/faker";
import express, { Request, Response } from "express";
import { Repository } from "typeorm";
import Database from "./config/database";
import { User } from "./entities";

const app = express();
const port = 3333;

app.use(express.json());

async function insertUsers(repository: Repository<User>, users: User[]) {
  for (let i = 0; i < 100; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName });
    const password = faker.internet.password();
    const newUser = repository.create({
      name: `${firstName} ${lastName}`,
      email,
      password,
    });
    await repository.save(newUser);
    users.push(newUser);
  }
}

app.get("/users", async (req: Request, res: Response) => {
  if (!Database.isInitialized) {
    await Database.initialize();
  }

  const repository: Repository<User> = Database.getRepository("User");
  const users = await repository.find();

  if (users.length === 0) {
    await insertUsers(repository, users);
  }

  res.json(users);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
