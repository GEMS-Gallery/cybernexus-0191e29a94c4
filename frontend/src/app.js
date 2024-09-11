import { backend } from 'declarations/backend';

// DOM elements
const postList = document.getElementById('post-list');
const loadingSpinner = document.getElementById('loading-spinner');

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

// Event listeners for category navigation
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const category = event.target.dataset.category;
        loadPosts(category);
    });
});

// Initial load of all posts
loadPosts();

// Typing effect for the welcome message
const welcomeMessage = document.querySelector('#user-info p');
welcomeMessage.classList.add('typing');

// Glowing effect for the "Create New Post" link
const createPostLink = document.querySelector('#quick-links a');
createPostLink.classList.add('glow');