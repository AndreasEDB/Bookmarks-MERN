export const shorten = (text, no) => {
    let shortened = text.slice(0, no);
    shortened.split("").reverse().indexOf(" ") === 0 &&
        (shortened = shortened.slice(0, -1));
    text.length > no && (shortened += "...");
    return shortened
};