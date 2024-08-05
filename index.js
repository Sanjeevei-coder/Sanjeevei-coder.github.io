const apikey = 'c30a6ee8b8f94ced96db0d3235f096e2';
const blogc = document.getElementById("blog-container");
const searchField=document.getElementById('Search-bar');
const searchButton=document.getElementById('search-btn');

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        return data.articles; // Ensure you return the articles array here
    } catch (error) {
        console.error("Error fetching random news", error);
        return []; // Return an empty array in case of error
    }
}
searchButton.addEventListener("click",async () =>{
    const query=searchField.value.trim()
    if(query!==""){
        try{
            const articles=await fetchNewsquerry(query)
            displayBlogs(articles);

        }
        catch(error){
            console.error("error",error);

        }
    }
});
async function fetchNewsquerry(query){
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        return data.articles; // Ensure you return the articles array here
    } catch (error) {
        console.error("Error fetching random news", error);
        return []; // Return an empty array in case of error
    }

}



function displayBlogs(articles) {
    blogc.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage 
        img.alt = article.title;

        const title = document.createElement("h2");
        const truncatedtitle=article.title.length>30
        ? article.title.slice(0,30)+"....":article.title;
        title.textContent=truncatedtitle

        const description = document.createElement("p");
        description.textContent = article.description || 'No description available';

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click",()=>{
            window.open(article.url,"_blank")
        })
        blogc.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error displaying blogs", error);
    }
})();
