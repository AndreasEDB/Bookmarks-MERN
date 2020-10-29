import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import "./Quotes.scss";
import {shorten} from '../../assets/scripts/tools'

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
        return (
            <article className="quote" key={Math.random()}>
                <h4>
                    <em>{quote.title}</em>
                </h4>
                <blockquote className="quote-text">{shorten(quote.quoteText, 30)}</blockquote>
                <p className="quote-author">
                    <em>-{quote.quoteAuthor}</em>
                </p>
                <Link
                    to={`/quotes/${quote._id}`}
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
