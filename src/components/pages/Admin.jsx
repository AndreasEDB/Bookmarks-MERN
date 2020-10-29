import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {shorten} from '../../assets/scripts/tools'
import "./Admin.scss";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import Delete from "../layout/actions/Delete";

const Admin = () => {
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
            <li>
                <p>{quote._id}</p>
                <p>{quote.category.category}</p>
                <p>{quote.title}</p>
                <p>{shorten(quote.quoteText, 30)}</p>
                <p>{quote.quoteAuthor}</p>
                <p><Link><FontAwesomeIcon icon={faEdit} /></Link></p>
                <p><Link><FontAwesomeIcon icon={faTrashAlt} /></Link></p>
                <Delete quote={quote}/>
            </li>
        );
    });
    return (
        <section id="admin">
            <article className="admin-panel">
                <ul className="quote-list">
                    <li>
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
    );
};

export default Admin;
