form.addEventListener ('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const image = document.getElementById('image').files[0]; // Get the image file

    let imageUrl = '';
    if (image) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imageUrl = e.target.result; 
            savePost(title, content, imageUrl); 
        };
        reader.readAsDataURL(image); 
    } else {
    
        savePost(title, content, imageUrl);
    }
});

function savePost(title, content, imageUrl) {
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const newPost = {
        title: title,
        content: content,
        imageUrl: imageUrl,
        date: new Date().toLocaleString() 
    };
}

posts.push(newPost);
localStorage.setItem('blogPosts', JSON.stringify(posts));
window.location.href = 'index.html';


function loadBlogPosts(){
    const postList = document.getElementById('post-list');
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];

    posts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            ${post.imageUrl ? `<img src="${post.imageUrl}" alt="Post image">` : ''}
            <p><em>Posted on: ${post.date}</em></p>
        `;
        postList.appendChild(listItem);
    });
}

loadBlogPosts();