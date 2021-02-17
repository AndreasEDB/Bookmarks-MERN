import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { shorten } from "../../assets/scripts/tools";
import "./Admin.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faFile } from "@fortawesome/free-solid-svg-icons";
import Delete from "../layout/actions/Delete";
import Create from "../layout/actions/Create";
import Update from "../layout/actions/Update";
const server = process.env.REACT_APP_SERVER

const Admin = () => {
    const [links, setLinks] = useState([]);
    const [activeLink, setActiveLink] = useState("");
    const fetchLinks = async () => {
        let links;
        try {
            const response = await fetch(server + "/links");
            links = await response.json();
        } catch (err) {
            //console.log(err);
        }
        setLinks(links.reverse());
    };

    const openDialog = (e, link, dialog) => {
        e.preventDefault();
        setActiveLink(link);
        document.querySelector("#admin").style.filter = "blur(6px)";
        document.querySelector(dialog).style.top = "50%";
    };
    
    useEffect(() => {
        fetchLinks();
    }, []);


    const linkList = links.map((link) => {
        const categories = link.category.map(category => category.category)
        return (
            <li key={Math.random()} className="link">
                <p className="description">ID:</p>
                <p className="link-id">{link._id}</p>
                <p className="description">Kategori:</p>
                <p>{categories}</p>
                <p className="description">Titel:</p>
                <p title={link.title} >{link.title}</p>
                <p className="description">Beskrivelse:</p>
                <p title={link.linkDescription} >{shorten(link.linkDescription, 35)}</p>
                <p className="description">URL:</p>
                <p title={link.linkUrl} >{shorten(link.linkUrl, 15)}</p>
                <p className="description">Redigér:</p>
                <p>
                    <Link onClick={(e) => openDialog(e, link, '.update')}>
                        <FontAwesomeIcon icon={faEdit} />
                    </Link>
                </p>
                <p className="description">Slet:</p>
                <p>
                    <Link onClick={(e) => openDialog(e, link, '.delete')}>
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
                    <ul className="link-list">
                        <li className="new-link">
                            <Link onClick={e => openDialog(e, '', '.create')}><FontAwesomeIcon icon={faFile}  /> Nyt link</Link>
                        </li>
                        <li className="description-li">
                            <p>ID</p>
                            <p>Kategori</p>
                            <p>Titel</p>
                            <p>Beskrivelse</p>
                            <p>URL</p>
                            <p>Ret</p>
                            <p>Slet</p>
                        </li>
                        {linkList}
                    </ul>
                </article>
            </section>
            <Delete activeLink={activeLink} blur="#admin" />
            <Create blur="#admin"/>
            <Update link={activeLink} dismiss={() => setActiveLink('')} blur="#admin"/>
        </>
    );
};

export default Admin;
