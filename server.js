import express from "express";
import "dotenv/config";

import path from "path";
import { fileURLToPath } from "url";

import cors from "cors";

import {
  getPastes,
  getPaste,
  getPasteByUrlid,
  addPaste
} from "./database.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

const port = process.env.APP_PORT || 8080;

app.set("view engine", "ejs");
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.get("/paste/:id", async (req, res) => {
  if (req.params.id.toString() != "undefined") {
    let startTime = Date.now();
    const paste = await getPasteByUrlid(req.params.id.toString());
    console.log("Took " + (Date.now() - startTime) + "ms to find " + paste.title)
    res.render("paste", {
      title: paste.title,
      content: paste.content,
      date: paste.created
    })
  } else {
    res.sendFile(__dirname + "/public/notfound.html");
  }
})

app.post("/paste-upload", async (req, res) => {
  if (
    req.body.title.toString().trim() != "undefined" &&
    req.body.title.toString().trim() != "" &&
    req.body.content.toString().trim() != "undefined" &&
    req.body.content.toString().trim() != ""
  ) {
    const id = await addPaste(req.body.title, req.body.content);
    const urlid = await getPaste(id);
    res.json({ id, ok: true, urlid: urlid.urlid });
  } else {
    res.json({ id: -1, ok: false, urlid: undefined });
  }
})

app.listen(port, console.log("Server listening on port " + port));