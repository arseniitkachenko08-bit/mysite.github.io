function showPage(page) {
    const content = document.getElementById('content');
    
    if (page === 'home') {
            content.innerHTML = `
                <h3>The web for artists</h3>
                <form id="uploadForm">
                    <label>Upload your art!</label><br>
                    <input type="file" id="imgInput" accept="image/*">
                    <button id="upl" type="submit">Upload</button>
                </form>
                <div id="arts"></div>
            `;
            document.getElementById('uploadForm').addEventListener('submit', uploadArt)
                
    } else if (page === 'gallery') {
        content.innerHTML = `
            <h3>Gallery</h3>
            <p>The place with arts</p>
            <div id="arts"></div>
        `;
        loadArts(); 
    } else if (page === 'profile') {
        const name = localStorage.getItem('username') || 'Guest';
        content.innerHTML = `
            <h3>Profile</h3>
            <p>Username: <b>${name}</b></p>
            <button onclick="alert('Donations coming soon!')">Donate</button>
        `;
    } else if (page === 'login') {
        content.innerHTML = `
            <h3>Login</h3>
            <form id="loginForm">
                <label>Username</label><br>
                <input type="text" id="loginName" required><br>
                <label>Password</label><br>
                <input type="password" id="loginPass" required><br>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="#" onclick="showPage('register')">Register</a></p>
            <p id="loginMessage"></p>
     `;
    
        document.getElementById('loginForm').addEventListener('submit',function (event){
            event.preventDefault();
            const name = document.getElementById('loginName').value.trim();
            const pass = document.getElementById('loginPass').value

            const storedUser = JSON.parse(localStorage.getItem('user_' + name))

            if (storedUser && storedUser.password === pass) {
                localStorage.setItem('username', name);
                document.getElementById('username').textContent = name;
                document.getElementById('loginBtn').style.display = 'none';
                document.getElementById('logoutBtn').style.display = 'inline';
                showPage('home')
            } else {
                document.getElementById('loginMessage').textContent = "Incorrect password!"
            }
        });
    } else if (page === 'register') {
        content.innerHTML = `
            <h3>Register</h3>
            <form id="registerForm">
                <label>Username:</label><br>
                <input type="text" id="regName" required><br>
                <label>Password:</label><br>
                <input type="password" id="regPass" required><br>
                <button type="submit">Create Account</button>
            </form>
            <p>Already have an account? <a href="#" onclick="showPage('login')">Login</a></p>
            <p id="regMessage"></p>
        `;

        document.getElementById('registerForm').addEventListener('submit',function(event){
            event.preventDefault();
            const name = document.getElementById('regName').value.trim();
            const pass = document.getElementById('regPass').value

            if(localStorage.getItem('user_'+ name)) {
                document.getElementById('regMessage').textContent = 'This user already exists!';
            } else {
                localStorage.setItem('user_'+ name, JSON.stringify({ password: pass }));
                document.getElementById('regMessage').textContent = 'Account created!'
            }
        });
    }
};