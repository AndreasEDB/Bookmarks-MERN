import React, { useEffect, useState } from "react";
import "./Update.scss";
const server = process.env.REACT_APP_SERVER

const Update = ({ link, blur, dismiss }) => {
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [url, setUrl] = useState("");
    const [category, setCategory] = useState("");
    const [newCategory, setNewCategory] = useState("");

    const getCategories = async () => {
        const response = await fetch(
            server + "/categories/"
        );
        setCategories(await response.json());
    };

    const categoryList = categories.map((category, index) => {
        return (
            <option
                key={Math.random()}
                value={category._id}
            >
                {category.category}
            </option>
        );
    });

    const closeDialog = () => {
        document.querySelector(blur).style.filter = "blur(0px)";
        document.querySelector(".update").style.top = "-50%";
        setTitle("");
        setText("");
        setUrl("");
        setCategory("");
        setNewCategory("");
        dismiss()
    };

    const updateLink = async (title, text, url, category) => {
        try {
            const response = await fetch(
                `${server}/links/${link._id}`,
                {
                    method: "PATCH",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        title: title,
                        linkDescription: text,
                        linkUrl: url,
                        category: category,
                    }),
                }
            );
            const data = await response.json();
            //console.log(data);
            // window.location.reload()
            closeDialog();
        } catch (err) {
            //console.log(err);
        }
    };

    const createCategory = async (category) => {
        try {
            const response = await fetch(
                server + "/categories/",
                {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        category: category,
                    }),
                }
            );
            const data = await response.json();
            updateLink(title, text, url, data._id);
        } catch (err) {
            //console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const form = document.querySelector("form").children;
        // //console.log(form[10].value)
        if (category === "new") {
            createCategory(newCategory);
        } else {
            updateLink(title, text, url, category);
        }
    };

    useEffect(() => {
        getCategories();
        setTitle(link.title);
        setText(link.linkDescription);
        setUrl(link.linkUrl);
        setCategory(link.category !== undefined ? link.category[0]._id : '');
        //console.log(link)
        // createCategory('Kærlighed')
    }, [link]);

    useEffect(() => {
        // //console.log(link);
        // //console.log(title)
        //console.log(category)
    });

    return (
        <article className="update">
            <h2>Redigér link</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="title">Titel:</label>
            
                <input
                    type="text"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required
                />
                <br />
                <label htmlFor="text">Beskrivelse:</label>

                <textarea
                    name="text"
                    value={text}
                    cols="30"
                    rows="10"
                    onChange={(e) => setText(e.target.value)}
                    required
                ></textarea>
                <br />
                <label htmlFor="url">URL-adresse:</label>

                <input
                    type="text"
                    name="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="category">Kategori:</label>
                <select
                    name="category"
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    value={category}
                >
                    {categoryList}
                    <option value="new">Tilføj kategori:</option>
                </select>
                <br />
                {category === "new" && (
                    <>
                        <label htmlFor="newCategory">Ny kategori:</label>
                    <input
                        type="text"
                        name="newCategory"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        required
                    />
                    </>
                )}
            </form>
            <button className="btn-yes" onClick={(e) => handleSubmit(e)}>
                Gem
            </button>
            <button className="btn-no" onClick={() => closeDialog()}>
                Fortryd
            </button>
        </article>
    );
};

export default Update;
