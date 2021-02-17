import React, { useEffect, useState } from "react";
import "./Create.scss";
const server = process.env.REACT_APP_SERVER

const Create = ({ blur }) => {
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [url, setUrl] = useState("");
    const [category, setCategory] = useState([]);
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

    const createLink = async (title, text, url, category) => {
        try {
            await fetch(server + "/links/", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    title: title,
                    linkDescription: text,
                    linkUrl: url,
                    category: category,
                }),
            });
            window.location.reload();
        } catch (err) {
            alert('Der er desværre sket en fejl med serveren. Prøv igen :-)')
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
            createLink(title, text, url, data._id);
        } catch (err) {
            //console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (url === '') alert('Udfyld venligst URL-adresse :-)')
        if (category === "new") {
            createCategory(newCategory);
        } else {
            createLink(title, text, url, category);
        }
    };
    const closeDialog = () => {
        document.querySelector(blur).style.filter = "blur(0px)";
        document.querySelector(".create").style.top = "-50%";
        setTitle("");
        setText("");
        setUrl("");
        setCategory([]);
        setNewCategory("");
    };

    useEffect(() => {
        getCategories();
    }, []);
    useEffect(() => {
        setCategory([categories[0]])
    }, [categories])
    useEffect(() => {
        //console.log(category)
    });

    return (
        <article className="create">
            <h2>Opret nyt link</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="url">URL-adresse:</label>
                <input
                    type="text"
                    name="url"
                    onChange={(e) => setUrl(e.target.value)}
                    required="true"
                />
                <br />
                <p>Kategori:</p>
                <select
                    name="category"
                    onChange={(e) => {
                        setCategory(e.target.value);
                        //console.log(e.target.value);
                    }}
                    required="true"
                    value={category}
                >
                    {categoryList}
                    <option value="new">Tilføj kategori:</option>
                </select>
                <br />
                {category === 'new' && (
                    <>
                        <label htmlFor="newCategory">Ny kategori:</label>
                        <input
                            type="text"
                            name="newCategory"
                            onChange={(e) => setNewCategory(e.target.value)}
                            required
                        />
                    </>)
                }
            </form>
            <button className="btn-yes" onClick={(e) => handleSubmit(e)}>
                Opret
            </button>
            <button className="btn-no" onClick={() => closeDialog()}>
                Fortryd
            </button>
        </article>
    );
};

export default Create;
