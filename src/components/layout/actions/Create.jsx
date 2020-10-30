import React, { useEffect, useState } from "react";
import "./Create.scss";

const Create = ({ blur }) => {
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    const [newCategory, setNewCategory] = useState("")

    const getCategories = async () => {
        const response = await fetch(
            "http://localhost:5500/quotes/categories/"
        );
        setCategories(await response.json());
    };

    const categoryList = categories.map((category, index) => {
        let selected = false;
        index === 0 && (selected = true);
        return (
            <option key={Math.random()} value={category._id} selected={selected}>
                {category.category}
            </option>
        );
    });

    const createQuote = async (title, text, author, category) => {
        try {
            const response = await fetch("http://localhost:5500/quotes/", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    title: title,
                    quoteText: text,
                    quoteAuthor:
                        author,
                    category: category,
                }),
            });
            const data = await response.json();
            console.log(data);
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    };

    const createCategory = async (category) => {
        try {
            const response = await fetch(
                "http://localhost:5500/quotes/categories/",
                {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        category: category,
                    }),
                }
            );
            const data = await response.json();
            createQuote(title, text, author, data._id);
        } catch (err) {
            console.log(err);
        }
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const form = document.querySelector("form").children;
        // console.log(form[10].value)
        if (category === 'new') {
            createCategory(newCategory)
        } else {
            createQuote(title, text, author, category)
        }
        
    };
    const closeDialog = () => {
        document.querySelector(blur).style.filter = "blur(0px)";
        document.querySelector(".create").style.top = "-50%";
        setTitle('')
        setText('')
        setAuthor('')
        setCategory('')
        setNewCategory('')
    };

    

    useEffect(() => {
        getCategories();
        // createCategory('Kærlighed')
    }, []);
    useEffect(() => {
        // console.log(categories);
    });

    return (
        <article className="create">
            <h2>Opret nyt citat</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="title">Titel:</label>
                <input
                    type="text"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                    required="true"
                />
                <br />
                <label htmlFor="text">Citat:</label>
                <textarea
                    name="text"
                    cols="30"
                    rows="10"
                    onChange={(e) => setText(e.target.value)}
                    required="true"
                ></textarea>
                <br />
                <label htmlFor="author">Ophavsperson:</label>
                <input
                    type="text"
                    name="author"
                    onChange={(e) => setAuthor(e.target.value)}
                    required="true"
                />
                <br />
                <label htmlFor="category">Kategori:</label>
                <select
                    name="category"
                    onChange={(e) => setCategory(e.target.value)}
                    required="true"
                >
                    {categoryList}
                    <option value="new">Tilføj kategori:</option>
                </select>
                <br />
                {category === 'new' && <input
                    type="text"
                    name="newCategory"
                    onChange={(e) => setNewCategory(e.target.value)}
                    required="true"
                />}
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
