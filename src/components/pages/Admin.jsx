import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { shorten } from "../../assets/scripts/tools";
import "./Admin.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faFile } from "@fortawesome/free-solid-svg-icons";
import Delete from "../layout/actions/Delete";
import Create from "../layout/actions/Create";

const Admin = () => {
    const [quotes, setQuotes] = useState([]);
    const [activeQuote, setActiveQuote] = useState("");
    const fetchQuotes = async () => {
        let quotes;
        try {
            const response = await fetch("http://localhost:5500/quotes");
            quotes = await response.json();
        } catch (err) {
            console.log(err);
        }
        setQuotes(quotes.reverse());
    };

    const openDialog = (e, quote, dialog) => {
        e.preventDefault();
        setActiveQuote(quote);
        document.querySelector("#admin").style.filter = "blur(6px)";
        document.querySelector(dialog).style.top = "50%";
    };
    
    useEffect(() => {
        fetchQuotes();
    }, []);


    const quoteList = quotes.map((quote) => {
        return (
            <li key={Math.random()}>
                <p className="description">ID:</p>
                <p className="quote-id">{quote._id}</p>
                <p className="description">Kategori:</p>
                <p>{quote.category.category}</p>
                <p className="description">Titel:</p>
                <p>{quote.title}</p>
                <p className="description">Citat:</p>
                <p>{shorten(quote.quoteText, 30)}</p>
                <p className="description">Ophavsperson:</p>
                <p>{quote.quoteAuthor}</p>
                <p className="description">Redigér:</p>
                <p>
                    <Link>
                        <FontAwesomeIcon icon={faEdit} />
                    </Link>
                </p>
                <p className="description">Slet:</p>
                <p>
                    <Link onClick={(e) => openDialog(e, quote, '.delete')}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </Link>
                </p>
            </li>
        );
    });
    return (
        <>
            <section id="admin">
                <article className="admin-panel">
                    <ul className="quote-list">
                        <li className="new-quote">
                            <Link onClick={e => openDialog(e, '', '.create')}><FontAwesomeIcon icon={faFile}  /> Nyt citat</Link>
                        </li>
                        <li className="description-li">
                            <p>ID</p>
                            <p>Kategori</p>
                            <p>Titel</p>
                            <p>Citat</p>
                            <p>Ophavsperson</p>
                            <p>Ret</p>
                            <p>Slet</p>
                        </li>
                        {quoteList}
                    </ul>
                </article>
            </section>
            <Delete activeQuote={activeQuote} blur="#admin" />
            <Create blur="#admin"/>
        </>
    );
};

export default Admin;
