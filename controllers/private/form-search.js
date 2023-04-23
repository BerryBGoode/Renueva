search = document.getElementById('search-container'); 
search.innerHTML = `<form method="post" id="form-search" class="form-search">
    
    <button type="submit" class="button-transparent">
        <svg width="18px" height="18px"
        viewBox="0 0 29 29" fill="none" class="search-icon" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12.5263 21.5122C18.3398 21.5122 23.0526 17.1442 23.0526 11.7561C23.0526 6.36795 18.3398 2 12.5263 2C6.71279 2 2 6.36795 2 11.7561C2 17.1442 6.71279 21.5122 12.5263 21.5122Z"
                stroke="#424242" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M27 26.9999L21.7368 22.1218" stroke="#424242" stroke-width="4" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
    </button>
    <input type="text" name="search" id="search" placeholder="Search">
</form>`;