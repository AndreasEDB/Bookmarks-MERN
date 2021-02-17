import React, { useEffect, useState } from 'react'
import './Link.scss'
const server = process.env.REACT_APP_SERVER

const Link = ({match}) => {
    const linkID = match.params.linkID
    const [link, setLink] = useState('')
    const fetchLink = async () => {
        const response = await fetch(`${server}/links/${linkID}`)
        setLink(await response.json())
    }
    useEffect(() => {
        fetchLink()
    }, [])
    return (
        <section id="link">
            <article className="link" key={Math.random()}>
                <h4>
                    <em>{link.title}</em>
                </h4>
                <blocklink className="link-text">{link.linkText}</blocklink>
                <p className="link-author">
                    <em>-{link.linkAuthor}</em>
                </p>
               
            </article>
        </section>
    )
}

export default Link
