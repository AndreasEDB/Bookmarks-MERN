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
            server + "/links/categories/"
        );
        setCategories(await response.json());
    };

    // const categoryList = categories.map((category, index) => {
    //     // let selected = false;
    //     // index === 0 && (selected = true);
    //     return (
    //         <>
    //             <input type="checkbox" id={category._id} name={category._id} value={category._id} />
    //         <label for={category._id}>{category.category}</label><br></br>
    //         </>
    //     );
    // });
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
            const response = await fetch(server + "/links/", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    title: title,
                    linkDescription: text,
                    linkUrl: url,
                    category: category,
                }),
            });
            const data = await response.json();
            console.log(data);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    const createCategory = async (category) => {
        try {
            const response = await fetch(
                server + "/links/categories/",
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
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const form = document.querySelector("form").children;
        // console.log(form[10].value)
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
        // createCategory('Kærlighed')
    }, []);
    useEffect(() => {
        setCategory([categories[0]])
    }, [categories])
    useEffect(() => {
        console.log(category)
    });

    return (
        <article className="create">
            <h2>Opret nyt link</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                {/* <label htmlFor="title">Titel(valgfri):</label>
                <input
                    type="text"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="text">Beskrivelse(valgfri):</label>
                <textarea
                    name="text"
                    cols="30"
                    rows="10"
                    onChange={(e) => setText(e.target.value)}
                    required
                ></textarea>
                <br /> */}
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
                        console.log(e.target.value);
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
