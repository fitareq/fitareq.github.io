async function fetchMediumPosts() {
    const mediumUsername = 'fitareq';
    const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumUsername}`;
    
    try {
        const response = await fetch(rssUrl);
        const data = await response.json();
        
        if (data.status === 'ok') {
            const posts = data.items.slice(0, 3); // Get latest 3 posts
            const blogGrid = document.querySelector('.blog-grid');
            blogGrid.innerHTML = ''; // Clear existing posts
            
            posts.forEach(post => {
                // Get the first image from the content
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = post.content;
                const firstImg = tempDiv.querySelector('img');
                const imageUrl = firstImg ? firstImg.src : (post.thumbnail || 'images/blog-placeholder.svg');
                
                // Clean up the image URL to use HTTPS
                const secureImageUrl = imageUrl.replace(/^http:\/\//i, 'https://');
                
                const articleHtml = `
                    <article class="blog-card">
                        <div class="blog-image">
                            <img src="${secureImageUrl}" alt="${post.title}" class="blog-img" onerror="this.src='images/blog-placeholder.svg'">
                        </div>
                        <div class="blog-data">
                            <span class="blog-tag">${getPostTag(post.categories)}</span>
                            <h3 class="blog-title">${post.title}</h3>
                            <p class="blog-text">
                                ${getExcerpt(post.description)}
                            </p>
                            <div class="blog-footer">
                                <span class="blog-date">${formatDate(post.pubDate)}</span>
                                <a href="${post.link}" target="_blank" class="blog-link">Read More <i class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </article>
                `;
                blogGrid.innerHTML += articleHtml;
            });
        }
    } catch (error) {
        console.error('Error fetching Medium posts:', error);
        displayFallbackPosts();
    }
}

function getPostTag(categories) {
    if (!categories || categories.length === 0) return 'Android';
    return categories[0];
}

function getExcerpt(description) {
    // Remove HTML tags and get first 150 characters
    const text = description.replace(/<[^>]*>/g, '');
    return text.substring(0, 150) + '...';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function displayFallbackPosts() {
    // Display static content if API fails
    const blogGrid = document.querySelector('.blog-grid');
    blogGrid.innerHTML = `
        <article class="blog-card">
            <div class="blog-image">
                <img src="images/blog-placeholder.svg" alt="MVVM Architecture Pattern" class="blog-img">
            </div>
            <div class="blog-data">
                <span class="blog-tag">Architecture</span>
                <h3 class="blog-title">Understanding MVVM Architecture in Android</h3>
                <p class="blog-text">
                    A comprehensive guide to implementing MVVM architecture pattern in Android applications with practical examples.
                </p>
                <div class="blog-footer">
                    <span class="blog-date">March 15, 2024</span>
                    <a href="https://medium.com/@fitareq" target="_blank" class="blog-link">Read More <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        </article>
    `;
}

// Fetch posts when the page loads
document.addEventListener('DOMContentLoaded', fetchMediumPosts);
