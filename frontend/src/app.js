import { backend } from 'declarations/backend';

// DOM elements
const postList = document.getElementById('post-list');
const loadingSpinner = document.getElementById('loading-spinner');
const createPostModal = document.getElementById('create-post-modal');
const createPostForm = document.getElementById('create-post-form');
const createPostLink = document.getElementById('create-post-link');
const closeModalButton = document.getElementById('close-modal');

// Helper function to show/hide loading spinner
function toggleLoading(show) {
    loadingSpinner.classList.toggle('hidden', !show);
}

// Function to create a post element
function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <small>Posted by ${post.author} in ${post.category}</small>
    `;
    return postElement;
}

// Function to load posts
async function loadPosts(category = null) {
    toggleLoading(true);
    try {
        let posts;
        if (category) {
            posts = await backend.getPostsByCategory(category);
        } else {
            posts = await backend.getAllPosts();
        }
        postList.innerHTML = '';
        posts.forEach(post => {
            const postElement = createPostElement(post);
            postList.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error loading posts:', error);
    } finally {
        toggleLoading(false);
    }
}

// Function to create a new post
async function createPost(category, title, content) {
    toggleLoading(true);
    try {
        const postId = await backend.createPost(category, title, content);
        console.log('New post created with ID:', postId);
        loadPosts(category);
        createPostModal.classList.add('hidden');
    } catch (error) {
        console.error('Error creating post:', error);
    } finally {
        toggleLoading(false);
    }
}

// Event listeners for category navigation
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const category = event.target.dataset.category;
        loadPosts(category);
    });
});

// Event listener for create post form submission
createPostForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const category = document.getElementById('post-category').value;
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    await createPost(category, title, content);
});

// Event listener for opening the create post modal
createPostLink.addEventListener('click', (event) => {
    event.preventDefault();
    createPostModal.classList.remove('hidden');
});

// Event listener for closing the create post modal
closeModalButton.addEventListener('click', () => {
    createPostModal.classList.add('hidden');
});

// Initial load of all posts
loadPosts();

// Typing effect for the welcome message
const welcomeMessage = document.querySelector('#user-info p');
welcomeMessage.classList.add('typing');

// Glowing effect for the "Create New Post" link
createPostLink.classList.add('glow');