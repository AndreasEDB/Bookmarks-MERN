import React from "react";
import "./Delete.scss";

const Delete = ({ activeQuote, blur }) => {

    const deleteQuote = async (quote) => {
        try {
            const response = await fetch(
                "http://localhost:5500/quotes/" + quote._id,
                {
                    method: "DELETE",
                }
            );
            console.log(await response.json());
        } catch (err) {
            console.log(err);
        }
        window.location.reload()
    };
    const closeDialog = () => {
        document.querySelector(blur).style.filter = "blur(0px)";
        document.querySelector(".delete").style.top = "-50%";
    };

    return (
        <article className={"delete quote" + activeQuote._id}>
                <p>Ønsker De at slette følgende citat?</p>
                <blockquote>{activeQuote.quoteText}</blockquote>
                <p className="del-author"><em>-{activeQuote.quoteAuthor}</em></p>
                <button
                    className="btn-yes"
                    onClick={() => deleteQuote(activeQuote)}
                >
                    Ja
                </button>
                <button className="btn-no" onClick={() => closeDialog()}>
                    Nej
                </button>
            </article>
    );
};

export default Delete;
