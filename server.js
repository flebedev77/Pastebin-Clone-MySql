import express from "express";
import "dotenv/config";

import path from "path";
import { fileURLToPath } from "url";

import {
  getPastes,
  getPaste,
  addPaste
} from "./database.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

const port = process.env.APP_PORT || 8080;

app.listen(port, console.log("Server listening on port " + port));

app.use(express.static("public"));

app.get("/paste/:id", async (req, res) => {
  if (req.params.id.toString() != "undefined" && req.params.id.toString().length == Number(process.env.TOKEN_LENGTH)) {
    const pastes = await getPastes();
    pastes.forEach((paste) => {
      if (paste.urlid == req.params.id.toString()) {
        console.log(paste);
      }
    })
  } else {
    res.sendFile(__dirname + "/public/notfound.html");
  }
})

