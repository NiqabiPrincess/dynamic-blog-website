//* Saving Variables from HTML pages
const saveButton = document.getElementById('savePost');

postTitle = document.getElementById('title');
postContent = document.getElementById('content');
postPic = document.getElementById('image');


saveButton.addEventListener('click', savePost);


//* Functions to save inputs from new post page
function saveTitle(){
    if (postTitle){
        const title = postTitle.value;
        localStorage.setItem('postTitle', content);
        return title;
    }
}

function saveContent(){
    if (postContent){
        const content = postContent.value;
        localStorage.setItem('postContent', content);
        return content;
    }
}

function savePic(){
    if (postPic && postPic.files.length > 0) {
        const reader = new FileReader();
        const imageFile = postPic.files[0]; 
        return new Promise((resolve) => {
            reader.onload = function(e) {
                const imageUrl = e.target.result;
                localStorage.setItem('postPic', imageUrl); e
                resolve(imageUrl); 
            };
            reader.readAsDataURL(imageFile); 
        });
    }
    return Promise.resolve('');
        
    }

function savePost() {
    const title = saveTitle();
    const content = saveContent();
    const imageUrl = savePic();  
    
    const newPost = {
        title: title,
        content: content,
        imageUrl: imageUrl || '', 
        date: new Date().toLocaleString() 
    };

    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    posts.push(newPost);
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    }
    





//! find out how to explain
function displayPost() {
    const postsContainer = document.getElementById('posts-container');
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];  // Get stored posts, or an empty array if none exist

    // Clear any existing posts in case of multiple refreshes
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            ${post.imageUrl ? `<img src="${post.imageUrl}" alt="Post image">` : ''}
            <p class="date">${post.date}</p>
        `;

        postsContainer.appendChild(postElement);
    });
}

document.addEventListener('DOMContentLoaded', displayPost);

savePost();   
displayPost();