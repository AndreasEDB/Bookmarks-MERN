import React from "react";
import "./Delete.scss";

const Delete = ({ quote }) => {
    return (
        <>
            <article className="blur"></article>
            <article className={"delete quote" + quote._id}>
                <p>Ønsker De at slette følgende citat?</p>
                <blockquote>{quote.quoteText}</blockquote>
            </article>
        </>
    );
};

export default Delete;
