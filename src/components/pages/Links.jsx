import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import "./Links.scss";
import {shorten} from '../../assets/scripts/tools'

const Links = () => {
    const [links, setLinks] = useState([]);
    const fetchLinks = async () => {
        let links;
        try {
            const response = await fetch("http://localhost:5500/links");
            links = await response.json();
        } catch (err) {
            console.log(err);
        }
        setLinks(links.reverse());
    };
    useEffect(() => {
        fetchLinks();
    }, []);
    useEffect(() => {
        console.log(links);
    });
    const linkList = links.map((link) => {
        let linkImg
        if (link.linkImg) {
            if (link.linkImg.indexOf('http') != -1) {
                linkImg = link.linkImg
            }
            else {
                linkImg = process.env.PUBLIC_URL + link.linkImg.replace('./public/', '')
            }
        }
        
        return (
            <article className="link" key={Math.random()}>
                <div className="link-img" style={{backgroundImage: `url('${linkImg}')`}}></div>
                <h4>
                    <em>{link.title}</em>
                </h4>
                <p className="link-author">
                    <em>{shorten(link.linkUrl, 30)}</em>
                </p>
                <Link
                    to={`/links/${link._id}`}
                    target="_blank"
                    className="link-overlay"
                >
                    <h2>
                       VIS CITAT
                    </h2>
                </Link>
            </article>
        );
    });
    return (
        <section id="links">
            <section className="link-list">{linkList}</section>
        </section>
    );
};

export default Links;
