const formWrapper = document.querySelector(".form-wrapper")
const form = document.querySelector("#form")
const searcInput = document.querySelector("#src-input")
const buttonWrapper = document.querySelector(".btn-wrapper")
const searchBtn = document.querySelector("#search-btn")
const clearBtn = document.querySelector("#clear-btn")
const imgListWapper = document.querySelector(".imgList-wrapper")

runEventListenrs()
function runEventListenrs(){
    form.addEventListener("submit",search)
    clearBtn.addEventListener("click",clear)
}

function clear(){
    searcInput.value=""
    imgListWapper.innerHTML = ""
}

function search(e){
    const value = searcInput.value.trim()
    fetch(`https://api.unsplash.com/search/photos?query=${value}`,{
        method:"GET",
        headers:{
            Authorization :"Client-ID fRD6uL0M4cZjubfTKAaM1PsdcoYCH3Xib7-UjL_GnwE"
        }
    })
    .then((res)=> res.json())
    .then((data)=>{
        Array.from(data.results).forEach((img)=>{
            // console.log(img.urls.small)
            addImgUI(img.urls.small)
        })
    })
    .catch((err)=> console.log(err))
    e.preventDefault()
}

function addImgUI(url){
    const div = document.createElement("div")
    div.classList= "card"

    const img = document.createElement("img")
    img.setAttribute("src",url)
    img.width="350"
    img.height="350"
    img.style.borderRadius= "20px"
    div.appendChild(img)
    imgListWapper.appendChild(div)
}
