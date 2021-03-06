import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import "./Links.scss";
import {shorten} from '../../assets/scripts/tools'
const server = process.env.REACT_APP_SERVER
// //console.log(server)

const Links = () => {
    const [links, setLinks] = useState([]);
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
    useEffect(() => {
        fetchLinks();
    }, []);
    useEffect(() => {
        //console.table(links);
    });
    const linkList = links.map((link) => {
        let linkImg
        if (link.linkImg) {
            if (link.linkImg.indexOf('http') !== -1) {
                linkImg = link.linkImg
            }
            else {
                linkImg = process.env.REACT_APP_SERVER + link.linkImg.replace('./public/', '/')
            }
        }
        let linkHref = link.linkUrl.indexOf('http') === -1 ? 'http://' + link.linkUrl : link.linkUrl
        
        return (
            <article className="link" key={Math.random()}>
                <div className="link-img" style={{backgroundImage: `url('${linkImg}')`}}></div>
                <h4>
                    <em>{link.title}</em>
                </h4>
                <p className="link-author">
                    <em>{shorten(link.linkUrl, 30)}</em>
                </p>
                <a
                    href={linkHref}
                    target="_blank"
                    className="link-overlay"
                >
                    <h2>
                       ÅBN SIDE
                    </h2>
                </a>
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
