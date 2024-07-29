function App() {
    const [quotes, setQuotes] = React.useState([]);
    const [randomQuote, setRandomQuote] = React.useState(null);
    const [color, setColor] = React.useState("red");

    React.useEffect(() => {
        async function fetchData() {
            const response = await fetch("https://type.fit/api/quotes");
            const data = await response.json();

            setQuotes(data);
            let randomIndex = Math.floor(Math.random() * data.length);
            setRandomQuote(data[randomIndex]);
        }
        fetchData();
    }, []);

    const getNewQuote = () => {
        const colors = [
            "#E57373", "#81C784", "#64B5F6", "#4DD0E1", "#F06292", "#FFEB3B",
            "#FFB74D", "#B0BEC5", "#757575", "#9575CD", "#F48FB1", "#4DB6AC",
            "#A1887F", "#DCE775", "#7986CB", "#C5E1A5", "#FF8A65", "#AED581",
            "#FFD54F", "#90A4AE"
        ];

        let randomIndex = Math.floor(Math.random() * quotes.length);
        let randColorIndex = Math.floor(Math.random() * colors.length);

        setRandomQuote(quotes[randomIndex]);
        setColor(colors[randColorIndex]);
    };

    return (
        <div style={{ backgroundColor: color, color: color, minHeight: "100vh" }}>
            <div className="container pt-5 d-flex justify-content-center align-items-center">
                <div className="jumbotron">
                    <div className="card" style={{ maxWidth: "70%", textAlign: "center", margin: "auto" }}>
                        <div className="card-body">
                            {randomQuote ? (
                                <>
                                    <h2 style={{ textAlign: "center" }} id="text" className="card-title">
                                        <strong>&quot;{randomQuote.text}&quot;</strong>
                                    </h2>
                                    <h4 style={{ textAlign: "right", fontSize: "16px" }} id="author" className="card-text">
                                        - <em>{randomQuote.author || "Unknown Author"}</em>
                                    </h4>
                                </>
                            ) : (
                                <h2>Loading...</h2>
                            )}
                            <div className="new-quote d-flex justify-content-center gap-2">
                                <a
                                    className="btn btn-primary"
                                    id="tweet-quote"
                                    href={
                                        "https://twitter.com/intent/tweet?text=" +
                                        encodeURIComponent('"' + (randomQuote ? randomQuote.text : "") + '" ' + (randomQuote ? randomQuote.author : ""))
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fa fa-twitter"></i>
                                </a>
                                <a className="btn btn-primary" href="#">
                                    <i className="fa fa-tumblr"></i>
                                </a>
                                <button id="new-quote" className="btn btn-primary ml-3" onClick={getNewQuote}>
                                    New Quote
                                </button>
                            </div>
                        </div>
                        <div style={{ textAlign: "center", fontSize: "small" }} className="card-footer">
                            by Carlos Reinis
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

//Quote Machine Seed from the site https://type.fit/api/quotes

ReactDOM.render(<App />, document.getElementById('app'));
