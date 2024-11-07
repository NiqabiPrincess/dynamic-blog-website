function loadBlogPosts(){
    const postList = document.getElementById('post-list');
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];

    posts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
        postList.appendChild(listItem);
    });
}

loadBlogPosts();