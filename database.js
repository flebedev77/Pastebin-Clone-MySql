import "dotenv/config";
import mysql from "mysql2";

function generateId() {
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFHIJKLMNOPQRSTUVWXYZ";
  let str = "";
  for(let i = 0; i < Number(process.env.TOKEN_LENGTH); i++) {
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

export async function getPaste(id) {
  const [result] = await pool.query(`
    SELECT * FROM pastes
    WHERE id = ?
  `, [id]);

  return result;
}

export async function addPaste(title, content) {
  const result = await pool.query(`
    INSERT INTO pastes (title, content, urlid)
    VALUES
    (?, ?, ${generateId()})
  `, [title, content]);

  return result[0].insertId;
}