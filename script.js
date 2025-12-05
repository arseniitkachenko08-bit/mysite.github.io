function uploadArt(event) {
    event.preventDefault();
    const fileInput = document.getElementById('imgInput');
    const art = document.getElementById('arts'); 
    const file = fileInput.files[0];

    if (file) {
        const wrapper = document.createElement('div'); 
        wrapper.className = 'artDiv';

        const reader = new FileReader();
        reader.onload = function(e) {
            const imgData = e.target.result

            const img = document.createElement('img');
            const name = document.createElement('p')
            name.textContent = localStorage.getItem('username')
            img.src = e.target.result;
            img.width = 300;
            img.height = 400;
            wrapper.appendChild(img);
            
            const likeButton = document.createElement('button')
            likeButton.className = 'like-btn'
            likeButton.textContent = '❤️ 0'
            
            likeButton.addEventListener('click', function(){
                let currentLikes = parseInt(this.textContent.replace('❤️ ', ''));
                this.textContent = '❤️ ' + (currentLikes + 1)
                saveArts();
            });

            wrapper.appendChild(img);
            wrapper.appendChild(likeButton)
            art.appendChild(wrapper);
        };

        reader.readAsDataURL(file);
        } else {
            alert("Выберите картинку перед загрузкой!");
        };
}

function saveArts() {
    const artDivs = document.querySelectorAll('#art .artdiv');
    const arts = [];

    artDivs.forEach(div => {
        const img = div.querySelector('img');
        const likeBtn = div.querySelector('.like-btn')
        arts.push({
            src: img.src,
            likes: likeBtn.textContent.replace('❤️ ', '')
        });
    });

    localStorage.setItem('arts', JSON.stringify(arts));
}

function loadArts() {
    const saved = localStorage.getItem('arts');
    if (!saved) return;

    const arts = JSON.parse(saved);
    const art = document.getElementById('art');

    arts.forEach(a => {
        const wrapper = document.createElement('div');
        wrapper.className = 'arts';

        const img = document.createElement('img');
        img.src = a.src;
        img.width = 300;
        img.height = 400;

        const likeButton = document.createElement('button');
        likeButton.className = 'like-btn';
        likeButton.textContent = '❤️ ' + a.likes;

        likeButton.addEventListener('click', function(){
            let currentLikes = parseInt(this.textContent.replace('❤️ ',''));
            this.textContent = '❤️ ' + (currentLikes + 1);
            saveArts();
        });
        wrapper.appendChild(img);
        wrapper.appendChild(likeButton);
        art.appendChild(wrapper);
    });
}

window.onload = function () {    
    const name = localStorage.getItem('username');
    const usernameEl = document.getElementById('username');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (name) {
        usernameEl.textContent = name;
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline';
    } else {
        usernameEl.textContent = 'Guest';
        loginBtn.style.display = 'inline';
        logoutBtn.style.display = 'none'
        showPage('login');
    }

    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('username');

        loginBtn.style.display = 'inline';
        logoutBtn.style.display = 'none';

        usernameEl.textContent = 'Guest'
        
        showPage('login')
    });
    loadArts();
};