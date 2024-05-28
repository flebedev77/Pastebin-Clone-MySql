import { useState } from "react";
import PasteSucessPage from "./PasteSucess.jsx";
import './css/App.css';

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pasted, setPasted] = useState(false);
  const [pasteUrl, setPasteUrl] = useState("");

  const sendData = () => {
    fetch("http://localhost:8080/paste-upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, content })
    }).then(res => {
      if (res.ok) return res.json();
    }).then(data => {
      console.log(data);
      if (data.ok && data.urlid !== undefined) {
        alert("Sucessfully uploaded your paste");
        setPasted(true);
        setPasteUrl(window.location.href + "paste/" + data.urlid);
      } else {
        alert("Something went wrong");
        window.location.reload();
      }
    })
  }

  return (
    (pasted === false) ?
    <main>
      <h1>Pastebin Clone</h1>
      <hr></hr>
      <label htmlFor="title-input">Paste Title</label>
      <br></br>
      <input id="title-input" name="title-input" placeholder="..." autoComplete="off" onChange={(e) => { setTitle(e.target.value) }} />
      <br></br> <br></br>
      <label htmlFor="content-input">Paste contents (what you are actually sharing)</label>
      <br></br>
      <textarea id="content-input" name="content-input" onChange={(e) => setContent(e.target.value)}></textarea>
      <button id="publish-button" onClick={(e) => sendData()}>Publish</button>
    </main> : <PasteSucessPage link={pasteUrl}/>
  );
}

export default App;
