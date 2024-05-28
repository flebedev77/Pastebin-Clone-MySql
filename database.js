import "dotenv/config";
import mysql from "mysql2";

function generateId() {
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFHIJKLMNOPQRSTUVWXYZ";
  let str = "";
  for(let i = 0; i < Number(10); i++) {
    str += letters.charAt(Math.round(Math.random() * letters.length));
  }
  return str;
}

const pool = mysql.createPool({
  host: process.env.host,
  user: "root",
  password: process.env.password,
  database: "paste_app"
}).promise();

export async function getPastes() {
  const [result] = await pool.query("SELECT * FROM pastes");
  return result;
}

export async function getPasteByUrlid(id) {
  const [result] = await pool.query(`
    SELECT * FROM pastes
    WHERE urlid = ?
  `, [id]);

  return result[0];
}

export async function getPaste(id) {
  const [result] = await pool.query(`
    SELECT * FROM pastes
    WHERE id = ?
  `, [id]);

  return result[0];
}

export async function addPaste(title, content) {
  const result = await pool.query(`
    INSERT INTO pastes (title, content, urlid)
    VALUES
    (?, ?, ?)
  `, [title, content, generateId()]);

  return result[0].insertId;
}