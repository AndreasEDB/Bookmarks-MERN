import React, { useEffect, useState } from 'react'
import './Quote.scss'

const Quote = ({match}) => {
    const quoteID = match.params.quoteID
    const [quote, setQuote] = useState('')
    const fetchQuote = async () => {
        const response = await fetch(`http://localhost:5500/quotes/${quoteID}`)
        setQuote(await response.json())
    }
    useEffect(() => {
        fetchQuote()
    }, [])
    useEffect(() => console.log(quote))
    console.log(quoteID)
    return (
        <section id="quote">
            <article className="quote" key={Math.random()}>
                <h4>
                    <em>{quote.title}</em>
                </h4>
                <blockquote className="quote-text">{quote.quoteText}</blockquote>
                <p className="quote-author">
                    <em>-{quote.quoteAuthor}</em>
                </p>
               
            </article>
        </section>
    )
}

export default Quote
