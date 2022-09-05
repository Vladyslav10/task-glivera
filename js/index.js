(function () {
  const mainLink = document.querySelector(".menu__link-mes");
  const back = document.querySelector('.main__back');

  window.onresize = function() {
    const w = window.innerWidth;
    if(w > 767){
      mainLink.classList.add("active");
    } mainLink.classList.remove("active");

  }

  mainLink.addEventListener('click', function(){
    const w = window.innerWidth;
    if(w < 768){
      document.querySelector('aside').classList.add('hide');
      document.querySelector('.main').classList.add('active');
      back.classList.add('active');
    } null
    
  });
  
  back.addEventListener('click', function(){
    if(back.classList.contains('active')){
      document.querySelector('aside').classList.remove('hide');
      document.querySelector('.main').classList.remove('active');
      back.classList.remove('active');
    } 
  });

  const links = document.querySelectorAll(".menu__link-new");
  if (links.length > 0) {
    for (let index = 0; index < links.length; index++) {
      const element = links[index];
      element.addEventListener("click", function () {
        const pageName = element.textContent;
        localStorage.setItem("name", `${pageName}`);
      });
    }
  }
})();

///////////////////////////////BODY//////////////////////////////////////////////////////////////

(async function () {
  const bodyBlock = document.querySelector(".body-main");
  const deleteMes = document.getElementById("delete");
  const archiveMes = document.getElementById("toarchive");
  const unreaded = document.getElementById("unread");
  const archive = document.getElementById("archive");

  const response = await fetch("../mockData.json");
  const data = await response.json();

  if (response.ok) {
    bodyBlock.innerHTML = ``;
    getMessages(data);
  } else {
    bodyBlock.innerHTML = response.statusText();
  }

  function getMessages(items) {
    for (const el of items) {
      bodyBlock.innerHTML += `
          <div id=${el.id} class="body-main__row">
              <div class="body-main__check">
                <input type="checkbox">
                <span class='checked-area'><span/>
              </div>
              <div class="body-main__avatar">
                <img src="img/right/profile_1_.svg" alt="user avatar">
                <span data-archive=${el.archived} class='body-main__archive'><img src="img/right/archive.svg" alt="package pic"></span>
              </div>
              <p class="body-main__name">${el.userName}</p>
              <p data-read=${el.read} class="body-main__message">${el.text}</p>
              <div class="body-main__date">
                <p>${el.date}</p>
                <p>${el.time}</p>   
              </div>
          </div>
        `;
    }
  }

  function archiveCheck(){
    const arc = document.querySelectorAll('.body-main__archive');
    arc.forEach(item => {
      if(item.dataset.archive === 'false'){
        item.style.display = 'none';
      } else {
        item.style.display = 'inline';
      }
    })
  }
  archiveCheck()

  function messagesCheck(){
    const messages = document.querySelectorAll('.body-main__message');
    messages.forEach(item => {
      if(item.dataset.read === 'false'){
        item.classList.add('unreaded')
      } else {
        item.classList.add('readed')
      }
    })
  }
  messagesCheck()

  unreaded.addEventListener("click", function () {
    let arr = [...data].filter(el => el.read === false);
    bodyBlock.innerHTML = ``;
    getMessages(arr);
    archiveCheck();
    messagesCheck();
  });

  archive.addEventListener("click", function () {
    let arr = [...data].filter(el => el.archived === true);
    bodyBlock.innerHTML = ``;
    getMessages(arr);
    archiveCheck();
    messagesCheck();
  });

  bodyBlock.addEventListener('click', function(e){
    const curEl = e.target.closest('.body-main__row');
    curEl.classList.toggle("active");
    const curElId = curEl.id;
    if(curEl.classList.contains('active')) {
      data[curElId - 1].selected = true;
    } else {
      data[curElId - 1].selected = false;
    }
  
    deleteMes.addEventListener("click", function () {
      bodyBlock.innerHTML = `
        <div class="body-main__loading ibg">
          <img src="img/gi.gif" alt="Loading...">
        </div> 
      `;
      bodyBlock.innerHTML = ``;
      getMessages(data.filter((item) => item.selected === false));
      archiveCheck();
      messagesCheck();
    });

    archiveMes.addEventListener("click", function () {
      let arr = [...data].filter(el => el.selected === true).map(el => el.id)
      .map(item => {
        if(data[item - 1].archived === false){
          data[item - 1].archived = true;
          data[item - 1].selected = false
        }
      });
      bodyBlock.innerHTML = ``;
      getMessages(data);
      archiveCheck();
      messagesCheck();
    });
  })
  
  window.onunload = function () {
    localStorage.removeItem("name");
  };

})();

//////////////////////////////Bottom//////////////////////////////////////////////////////////////

(function(){
  const paginationArea = document.querySelector('.bottom-main__pagination');
  const arrow = document.querySelector('.bottom-main__image');

  let arr = [];
  
  for (let index = 0; index < 10; index++) {
    arr.push(index + 1);
  }

  arr.forEach(item => {
    paginationArea.innerHTML +=`
      <span class='bottom-main__pagination-element'>${item}</span>
    `;
  })

  paginationArea.innerHTML += `
    <span class='bottom-main__pagination-element'>123</span>
  `

  const paginationElements = document.querySelectorAll('.bottom-main__pagination-element');

  for (let index = 0; index < paginationElements.length; index++) {
    const element = paginationElements[index];
    element.addEventListener('click', function(){
      paginationElements.forEach(item => item.classList.remove('active'));
      element.classList.add('active');
    });
  } 

  arrow.addEventListener('click', function(){
    const activeEl = document.querySelector('.bottom-main__pagination-element.active');
    paginationElements.forEach(item => item.classList.remove('active'));
    activeEl.nextElementSibling.classList.add('active');
  });

})();