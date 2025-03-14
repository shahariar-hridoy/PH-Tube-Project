// create function of categories
function removeActiveClass() {
    const activeButtons = document.getElementsByClassName('active')
    for (let btn of activeButtons) {
        btn.classList.remove('active')
    }
}

function loadCategories() {
    // fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')

        // convert promise to json
        .then((res) => res.json())
        // send data to display
        .then((data) => displayCatagories(data.categories))
}

// create function of videos
function loadVideos() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then((res) => res.json())
        .then((data) => {
            removeActiveClass()
            document.getElementById('btn-all').classList.add('active')
            displayVideos(data.videos)

        })
}

// load category vidoes

const loadCategoryVideos = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActiveClass()
            const clickedButton = document.getElementById(`btn-${id}`)
            clickedButton.classList.add('active')
            displayVideos(data.category)
        })
}

function displayCatagories(categories) {
    // get the container
    const categoryContainer = document.getElementById('category-container');
    // loop operation on Array of object
    for (let cat of categories) {

        // create Element
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
        <button id = "btn-${cat.category_id}" onclick= "loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `
        // Append the Element
        categoryContainer.appendChild(categoryDiv)
    }

}

const displayVideos = (videos) => {
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = ''
    if (videos.length == 0) {
        videoContainer.innerHTML = `
        <div class=" col-span-full flex flex-col justify-center items-center py-20 gap-4">
            <img class="w-[120px]" src="Assets/Icon.png" alt="">
            <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
        </div>
        `
        return
    }
    videos.forEach(video => {

        const videoCard = document.createElement('div')
        videoCard.innerHTML = `
                <div class="card bg-base-100">
            <figure class="relative">
                <img class="w-full h-[150px] object-cover" src="${video.thumbnail}" alt="image" />
                <span class="absolute bottom-2 right-2 text-white bg-black p-1 rounded-sm text-xs">3hrs 56 min ago</span>
            </figure>
            <!-- card body -->
            <div class=" flex gap-3 px-0 py-5">
                <div>
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                          <img src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>
                </div>
                <div class="intro">
                    <h2 class="text-sm font-semibold">${video.title}</h2>
                    <p class="text-sm text-gray-500 flex gap-1 items-center">${video.authors[0].profile_name} <img class="w-4 h-4" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt=""></p>
                    <p class="text-sm text-gray-500 ">${video.others.views}</p>
                </div>
            </div>
        </div>
        `
        videoContainer.appendChild(videoCard)
    });

}

loadCategories()



