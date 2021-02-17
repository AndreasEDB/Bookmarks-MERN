const apiFetch = {
    quotesUrl: "http://localhost:5500/quotes/",
    async findQuotes() {
        let quotes
        try {
            let response = await fetch(this.quotesUrl);
            quotes = await response.json();
            //console.log(quotes)
            // return quotes;
        } catch (err) {
            //console.log(err);
        }
        return quotes
    },
};


export default apiFetch;
