import "./css/PasteSucessPage.css";

export default function PasteSucessPage(props) {
    return (
    <div>
        <h1>Here is your paste:</h1>
        <a href={props.link}>{props.link}</a>
    </div>
    )
}