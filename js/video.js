// Fetch , Load  and Display catagories

// load catagories on a function
const loadCatagories = () => {
    //fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCatagories(data.categories))
        .catch(error => console.log(error))

}

// load Videos on a function
const loadVideos = (searchText="") => {
    //fetch the data
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(error => console.log(error))

}
// load video with categories
const loadCategorieVideo = (id) =>{
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            const activeBtn=document.getElementById(`btn-${id}`)
            activeBtnRemove();
            activeBtn.classList.add("active")
            displayVideos(data.category)
        })
        .catch(error => console.log(error))
}
//  active btn remove  with btn
 const activeBtnRemove= () =>{
    const btns=document.getElementsByClassName("btn-categories");
    for(let btn of btns){
        btn.classList.remove("active")
    }

 }
 const loadDetails= async (videoId) =>{
    console.log(videoId);

    const uri=`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const res = await fetch(uri);
    const data= await res.json();
    displayDetails(data.video)

 }
 const displayDetails = (video) =>{
    // console.log(video.description)
    
    const detailsContainer=document.getElementById('modalcontent');
    detailsContainer.innerHTML=`
    <img src="${video.thumbnail}" />
      <p>${video.description}</p>
    `
          //  way 1 to show modal
    document.getElementById('modalContainer').showModal()
          //  way 02 to show modal
    // document.getElementById('showModalData').click()

 }

function getTimeString(time){
    const hour= parseInt(time / 3600);
    let remainingSecond= time % 3600;
    const minute= parseInt(remainingSecond / 60);
    remainingSecond= remainingSecond % 60;
    return  `${hour} hrs ${minute} min ${remainingSecond} second ago`
}

// Dispaly videos on a function
const displayVideos = (videos) => {
    const videosContainer=document.getElementById('videosContainer')
    videosContainer.innerHTML=''
    if(videos.length == 0){
        videosContainer.classList.remove('grid')
        videosContainer.innerHTML=`
        <div class="min-h-[300px] flex flex-col justify-center items-center gap-5">
        <img src="/assets/Icon.png"/>
        <h4 class="text-center text-xl font-bold text-gray-400">NO Content Here this Category</h4>
        </div>
        ` ;
        return;
    }else{
        videosContainer.classList.add('grid')
    }
    videos.forEach(video => {
        // console.log(video)
        // create cards dynamicaly
        const card = document.createElement('div');
        card.classList="card card-compact "
        card.innerHTML = `
  <figure class="h-[200px] relative">
    <img
      src=${video.thumbnail}
      class="h-full w-full object-cover"
      alt="" />
      ${
        video.others.posted_date?.length == 0 
        ? ' '
         : `<span class="absolute text-xs right-2 bottom-2 bg-gray-900 p-1 rounded-lg text-gray-100">${getTimeString(video.others.posted_date)}</span>`
      }  
        
      </figure>
  <div class="px-0 py-3 flex gap-2 items-center">
     <div>
     <img class="h-10 w-10 rounded-full object-cover" src=${video.authors[0].profile_picture }/>
     </div>
     <div>
     <h2 class="font-bold">${video.title}</h2>
     <div class="flex items-center gap-2">
     <p class="text-gray-400">${video.authors[0].profile_name }</p>
      ${video.authors[0].verified === true ? `<img class="w-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png" />` : ""}
     </div>
     <p><button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error mt-3 text-white">Details</button></p>
     </div>
   
  </div>
        `

     videosContainer.append(card);
    })

}

// Dispaly catagories on a function
const displayCatagories = (categories) => {

    const categorieContainer = document.getElementById('categories')
    // add data in html
    categories.forEach(item => {
        console.log(item)
        // create categorie button
        const btnContainer = document.createElement('button');
        btnContainer.innerHTML=`
        <button id="btn-${item.category_id}" class="btn btn-categories" onclick="loadCategorieVideo(${item.category_id})">${item.category}</button>
        `
       
        // add categorie btn to categorie container
        categorieContainer.append(btnContainer)
       
    });
}
document.getElementById('search-input').addEventListener('keyup', (event) =>{
    loadVideos(event.target.value);
})
loadCatagories();
loadVideos();
 