//* Saving Variables from HTML pages
const saveButton = document.getElementById('savePost');

const form = document.getElementById('post-form');
if (saveButton) {
    form.addEventListener ('submit', function(event) {
        event.preventDefault();
        savePost();
    }); }

if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        savePost();
    });
}

//* Functions to save inputs from new post page
export function saveTitle(){
    const postTitle = document.getElementById('title');
    if (postTitle){
        const title = postTitle.value;
        localStorage.setItem('postTitle', content);
        return title;
    }
}

export function saveContent(){
    const postContent = document.getElementById('content');
    if (postContent){
        const content = postContent.value;
        localStorage.setItem('postContent', content);
        return content;
    }
}

export function savePic(){
    const postPic = document.getElementById('image');
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

export async function savePost() {
    const title = saveTitle();
    const content = saveContent();
    const imageUrl = await savePic();  
    
    const newPost = {
        id: Date.now(),
        title: title,
        content: content,
        imageUrl: imageUrl || '', 
        date: new Date().toLocaleString() 
    };

    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    posts.push(newPost);
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    window.location.href = "index.html";

    }