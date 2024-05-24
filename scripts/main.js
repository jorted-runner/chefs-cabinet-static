document.addEventListener("DOMContentLoaded", function() {
    const devLogContainer = document.getElementById('devLogContainer');
    const devPosts = Array.from(document.querySelectorAll('.devPost'));
    const postsPerPage = 4;
    let currentPage = 1;

    function parseDate(dateString) {
        const [month, day, year] = dateString.split(' ');
        return new Date(`${month} ${day.replace(',', '')}, ${year}`);
    }

    function sortPosts(order) {
        devPosts.sort((a, b) => {
            const dateA = parseDate(a.querySelector('h1').innerText);
            const dateB = parseDate(b.querySelector('h1').innerText);
            return order === 'newest' ? dateB - dateA : dateA - dateB;
        });
        devPosts.forEach(post => devLogContainer.appendChild(post));
        showPage(1);
    }

    function showPage(page) {
        currentPage = page;
        const startIndex = (page - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;

        devPosts.forEach((post, index) => {
            post.style.display = (index >= startIndex && index < endIndex) ? 'block' : 'none';
        });

        updatePaginationButtons();
        window.scrollTo(0, 0);
    }

    function createPaginationButtons() {
        const numPages = Math.ceil(devPosts.length / postsPerPage);
        const topPaginationContainer = document.getElementById('top-pagination');
        const bottomPaginationContainer = document.getElementById('bottom-pagination');
        
        topPaginationContainer.innerHTML = '';
        bottomPaginationContainer.innerHTML = '';
    
        for (let i = 1; i <= numPages; i++) {
            const button = document.createElement('button');
            button.innerText = i;
            button.classList.add('pagination-button');
            button.addEventListener('click', () => {
                showPage(i);
            });
    
            topPaginationContainer.appendChild(button);
            bottomPaginationContainer.appendChild(button.cloneNode(true));
        }
    
        const bottomButtons = bottomPaginationContainer.querySelectorAll('.pagination-button');
        bottomButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                showPage(index + 1);
            });
        });
    }

    function updatePaginationButtons() {
        const buttons = document.querySelectorAll('.pagination-button');
        buttons.forEach((button, index) => {
            button.classList.toggle('active', index + 1 === currentPage);
        });
    
        const bottomButtons = document.querySelectorAll('#bottom-pagination .pagination-button');
        bottomButtons.forEach((button, index) => {
            button.classList.toggle('active', index + 1 === currentPage);
        });
    }

    function init() {
        const sortDropdown = document.getElementById('sortDropdown');
        sortDropdown.addEventListener('change', () => {
            sortPosts(sortDropdown.value);
        });
        sortPosts('newest');
        createPaginationButtons();
        showPage(currentPage);
    }

    init();
});