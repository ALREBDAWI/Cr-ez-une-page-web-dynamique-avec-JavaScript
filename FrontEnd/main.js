let data = []; 
async function getWorks() {
    try {
        const responseWorks = await fetch("http://localhost:5678/api/works")
        .then(responseWorks => responseWorks.json());
        //console.log(responseWorks);
        data = responseWorks;generateworks(responseWorks);
        

    } catch (error) {
        console.error('erreur', error);
        
    }
}
getWorks();



async function generateworks(works){
   works.forEach(work =>{
    
    console.log(work);
    const portfolio = document.getElementById('portfolio');
    const gallery = document.querySelector('.gallery');
    const figure = document.createElement('figure');
    const image = document.createElement('img');
    const figcaption = document.createElement('figcaption');
    portfolio.appendChild(gallery);
    gallery.appendChild(figure);
    figure.appendChild(image);
    figure.appendChild(figcaption);
    image.src=work.imageUrl;
    figcaption.innerText=work.title; 
    
});
}



