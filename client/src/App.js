import './App.css';

function App() {
  return (
    <>
      <main>
        <h1>Pastebin Clone</h1>
        <hr></hr>
        <label for="title-input">Paste Title</label>
        <br></br>
        <input id="title-input" name="title-input" placeholder="..." autocomplete="off" />
        <br></br> <br></br>
        <label for="content-input">Paste contents (what you are actually sharing)</label>
        <br></br>
        <textarea id="content-input" name="content-input">

        </textarea>
        <button id="publish-button">Publish</button>
      </main>
    </>
  );
}

export default App;
