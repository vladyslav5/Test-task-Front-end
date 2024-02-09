async function fetchImages() {
    const res = await fetch("./data.json").then(res => res.json())
    return res
}

function CreateImageBlock(image,cls){
    this.image = image


    this.htmlObj = document.createElement("div")
    const img = document.createElement("img")
    const imageTitle = document.createElement("h4")
    const tagsBlock = document.createElement("div")
    const contentBlock = document.createElement("div")

    this.htmlObj.classList.add(cls)
    img.setAttribute("src", this.image.image)
    imageTitle.innerHTML = this.image.title
    tagsBlock.classList.add("tags")
    contentBlock.classList.add("image-content")

    this.image.tags.map((tag) => {
        const tagObj = document.createElement("p")
        tagObj.innerText = tag
        tagsBlock.appendChild(tagObj)
    })

    this.htmlObj.appendChild(img)
    contentBlock.appendChild(imageTitle)
    contentBlock.appendChild(tagsBlock)
    this.htmlObj.appendChild(contentBlock)

}

async function renderImages() {
    const allImages = await fetchImages().then(res => res.sort((a, b) => b.rating - a.rating))
    const featureImages = allImages.slice(0, 5)
    const lastImages = allImages.sort((a, b) => a.age - b.age).slice(0, 2)
    const featured = document.querySelector(".carousel")
    const last = document.querySelector(".last_grid")

    featureImages.forEach((image) => {
        const block = new CreateImageBlock(image,"featured-item")
        featured.appendChild(block.htmlObj)
    })
    lastImages.forEach((image) => {
        const block = new CreateImageBlock(image,"item")
        last.appendChild(block.htmlObj)
    })
    console.log(document.querySelectorAll("*"))
    console.log(countElements())
    const list = {}
    const listLength = {}
    allImages.forEach((image)=>{
        image.tags.forEach(tag=>{
            if(!list[tag]) list[tag] = []
            list[tag].push(image)
        })
    })
    console.log(list)
    Object.keys(list).forEach(key=>console.log(key,list[key].length))
    allImages.forEach((image)=>{
        image.tags.forEach(tag=>{
            const len = tag.length
            if(!listLength[len]) listLength[len] = []
            listLength[len].push(image)
        })
    })
    console.log(listLength)
    Object.keys(listLength).forEach(key=>console.log(key,listLength[key].length))
}

function countElements(element = document.body){
    let amount = 0;
    let child = element.firstElementChild
    while (child){
        if (child.shadowRoot) { amount += countNodes(child.shadowRoot); }
        amount+=1 + countElements(child)
        child = child.nextElementSibling
    }
    return amount
}
renderImages()