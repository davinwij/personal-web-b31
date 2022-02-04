let blogs = []

const month = [
    'Jan', 'Feb', 'Mar', 'Apr',
    'Mei', 'Jun', 'Jul', 'Agt',
    'Sep', 'Okt', 'Nov', 'Des'

]

function addBlog(event){

    //agar halaman tidak terrefresh
    event.preventDefault();

    let getTitle = document.getElementById('input-blog-title').value
    let getContent = document.getElementById('input-blog-content').value
    let getImage = document.getElementById('input-blog-image')

    getImage = URL.createObjectURL(getImage.files[0])    

    let blog = {
        title: getTitle,
        content: getContent,
        img: getImage,
        postedAt: new Date()
    }

    //push untuk masukan data baru di baris baru
    blogs.push(blog)

    renderBlog()
}

function renderBlog(){

    let blogContainer = document.getElementById('contents')

    blogContainer.innerHTML = firstBlogContent()

    let lengthData = blogs.length

    for(let i = 0 ; i < lengthData ; i++){
            blogContainer.innerHTML += `
          <div class="blog-list-item">
              <div class="blog-image">
                <img src="${blogs[i].img}" alt="" />
              </div>
              <div class="blog-content">
                  <div class="btn-group">
                    <button class="btn-edit">Edit Post</button>
                    <button class="btn-post">Post Blog</button>
                  </div>
                  <h1>
                    <a href="blog-detail.html" target="_blank"
                      >${blogs[i].title}</a
                    >
                  </h1>
                  <div class="detail-blog-content">
                    ${getFullTime(blogs[i].postedAt)}
                  </div>
                  <p>
                    ${blogs[i].content}
                  </p>
                  <div style="text-align: right; margin-top: 20px">
                  <span style="color:grey; font-size: 15px;">
                  ${getDistanceTime(blogs[i].postedAt)}
                  </span>
                  </div>
              </div>
          </div>
          `
    }
}

function getFullTime(time){
  const date = time.getDate()
  const monthIndex = time.getMonth()
  const year = time.getFullYear()

  const hours = time.getHours()
  const minutes = time.getMinutes()

  return `${date} ${month[monthIndex]} ${year} ${hours}:${minutes} WIB`

}


function getDistanceTime(time){
  const distance = new Date() - new Date(time)

  //convert to day
  const milliseconds = 1000
  const secondInMinutes = 60
  const minutesInHours = 60
  const secondsInHours = secondInMinutes * minutesInHours
  const hoursInDay = 23

  const dayDistance = distance / (milliseconds * secondsInHours * hoursInDay)


  if(dayDistance >= 1 ){
    const time = Math.floor(dayDistance) + ' a day ago'
    return time
  } else {
    //convert to hour
    let hourDistance = Math.floor(distance / (milliseconds * secondsInHours))

    if(hourDistance > 0){
      return hourDistance + ' hour ago'
    } else {
      //convert to minute
      const minuteDistance = Math.floor(distance / (milliseconds * secondInMinutes))
      return minuteDistance + ' minute ago'
    }
  }

}

setInterval(function () {
  renderBlog()
}, 2000)


function firstBlogContent(){
    return `
    <div class="blog-list-item">
          <div class="blog-image">
            <img src="assets/blog-img.png" alt="" />
          </div>
          <div class="blog-content">
            <div class="btn-group">
              <button class="btn-edit">Edit Post</button>
              <button class="btn-post">Post Blog</button>
            </div>
            <h1>
              <a href="blog-detail.html" target="_blank"
                >Pasar Coding di Indonesia Dinilai Masih Menjanjikan</a
              >
            </h1>
            <div class="detail-blog-content">
              12 Jul 2021 22:30 WIB | Ichsan Emrald Alamsyah
            </div>
            <p>
              Ketimpangan sumber daya manusia (SDM) di sektor digital masih
              menjadi isu yang belum terpecahkan. Berdasarkan penelitian
              ManpowerGroup, ketimpangan SDM global, termasuk Indonesia,
              meningkat dua kali lipat dalam satu dekade terakhir. Lorem ipsum,
              dolor sit amet consectetur adipisicing elit. Quam, molestiae
              numquam! Deleniti maiores expedita eaque deserunt quaerat! Dicta,
              eligendi debitis?
            </p>
          </div>
        </div>
    `
}

