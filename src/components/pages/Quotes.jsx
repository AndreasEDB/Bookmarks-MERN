import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import "./Quotes.scss";

const Quotes = () => {
    const [quotes, setQuotes] = useState([]);
    const fetchQuotes = async () => {
        let quotes;
        try {
            const response = await fetch("http://localhost:5500/quotes");
            quotes = await response.json();
        } catch (err) {
            console.log(err);
        }
        setQuotes(quotes);
    };
    useEffect(() => {
        fetchQuotes();
    }, []);
    useEffect(() => {
        console.log(quotes);
    });
    const quoteList = quotes.map((quote) => {
        let quoteText = quote.quoteText.slice(0, 30);
        quoteText.split("").reverse().indexOf(" ") === 0 &&
            (quoteText = quoteText.slice(0, -1));
        let text;
        quote.quoteText.length > 30 && (quoteText += "...");
        return (
            <article className="quote" key={Math.random()}>
                <h4>
                    <em>{quote.title}</em>
                </h4>
                <blockquote className="quote-text">{quoteText}</blockquote>
                <p className="quote-author">
                    <em>-{quote.quoteAuthor}</em>
                </p>
                <Link
                    to={`/${quote._id}`}
                    target="_blank"
                    className="quote-overlay"
                >
                    <h2>
                       VIS CITAT
                    </h2>
                </Link>
            </article>
        );
    });
    return (
        <section id="quotes">
            <section className="quote-list">{quoteList}</section>
        </section>
    );
};

export default Quotes;
