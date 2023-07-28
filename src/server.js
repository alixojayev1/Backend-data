import express from "express";
import fs from "fs";
import path from "path";
import "dotenv/config";
import { log } from "console";

const expres = express();
const PORT = process.env.PORT;
expres.use(express.json());

expres.get("/users", (req, res) => {
  const data = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "src", "model", "categories.json"))
  );
  return res.send(data);
});

expres.get("/user", (req, res) => {
  const data = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "src", "model", "sapCategories.json")
    )
  );
  return res.send(data);
});

expres.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "src", "model", "categories.json"))
  );

  const data2 = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "src", "model", "sapCategories.json")
    )
  );

  const newData = data.find((e) => e.id == id);

  newData.array = [];

  for (const i of data2) {
    if (newData.id == i.categories_id) {
      newData.array.push(i);
    }
  }

  return res.send(newData);
});

expres.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "src", "model", "sapCategories.json")
    )
  );

  const data3 = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "src", "model", "sapSapCategories.json")
    )
  );
  const newUser = data.find((e) => e.id == id);

  newUser.array = [];
  for (const i of data3) {
    if (newUser.id == i.sup_categories_id) {
      newUser .array.push(i);
    }
  }
  return res.send(newUser);
});

expres.listen(PORT, console.log("create server"));
