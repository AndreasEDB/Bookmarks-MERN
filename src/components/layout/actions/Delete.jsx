import React from "react";
import "./Delete.scss";

const Delete = ({ activeLink, blur }) => {

    const deleteLink = async (link) => {
        try {
            const response = await fetch(
                "http://localhost:5500/links/" + link._id,
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
        <article className={"delete link" + activeLink._id}>
                <p>Ønsker De at slette følgende citat?</p>
                <blocklink>{activeLink.linkText}</blocklink>
                <p className="del-author"><em>-{activeLink.linkAuthor}</em></p>
                <button
                    className="btn-yes"
                    onClick={() => deleteLink(activeLink)}
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
