const dataLoader = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => loadCategory(data.categories))
    .catch((error) => console.log(error));
};
const removeActiveClass = () => {
    const remove = document.getElementsByClassName('category-btn')
    console.log(remove)
    for(let btn of remove){
        btn.classList.remove('active')
    }

}

const logCategoryVideos =(id) =>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
        // removeActiveClasss
        removeActiveClass()

        const activeBtn = document.getElementById(`btn-${id}`)
        console.log(activeBtn)
        activeBtn.classList.add('active')
        loadVideos(data.category)
    })
    .catch((error) => console.log(error));
}

function loadCategory(data) {
    
    const showCategoryPlace = document.getElementById('category-container')

    data.forEach((item)=> {
        console.log(item)
        // create button 
        const btnContainer = document.createElement('div')
        btnContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick = "logCategoryVideos(${item.category_id})" class="btn category-btn">
            ${item.category}
        </button>
        `
        

        // append 
        showCategoryPlace.appendChild(btnContainer)
    })
}

dataLoader();
