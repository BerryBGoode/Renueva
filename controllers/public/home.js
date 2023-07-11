const HEADER = document.querySelector('header');
const SECTION = document.querySelector('section');

if (HEADER) {

    HEADER.innerHTML = `<nav class="nav-extended navbar-home">
            <div class="nav-wrapper">
                <img src="../../resources/img/Logo/LogoRenueva_Login.png" alt="" class="header-img">
            </div>
            <div class="nav-content">
                <ul class="right hide-on-med-and-down">
                    <li><a href="../public/"></i>Home</a></li>
                    <li><a href="products.html"></i>Products</a></li>
                    <li><a href="featured.html"></i>Featured</a></li>
                </ul>
            </div>
            <div id="wrap">
            <form method="post" id="form-search" class="form-search">    
                    <svg width="18px" height="18px" id="search-button"
                    viewBox="0 0 29 29" fill="none" class="search-icon" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12.5263 21.5122C18.3398 21.5122 23.0526 17.1442 23.0526 11.7561C23.0526 6.36795 18.3398 2 12.5263 2C6.71279 2 2 6.36795 2 11.7561C2 17.1442 6.71279 21.5122 12.5263 21.5122Z"
                        stroke="#424242" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M27 26.9999L21.7368 22.1218" stroke="#424242" stroke-width="4" stroke-linecap="round"
                        stroke-linejoin="round" />
                    </svg>
                    <input type="search" name="search" id="search-input">
            </form>
            </div>
            <div class="icons-nav">                                
                <svg id="cart" data-tooltip="I am a tooltip" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                                stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                stroke-linejoin="round"></path>
                            <path
                                    d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                                    stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                stroke-linejoin="round"></path>
                            <path
                                d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                                stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                stroke-linejoin="round"></path>
                            <path d="M9 8H21" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                stroke-linejoin="round"></path>
                        </g>
                </svg>                                
                <svg id="account" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> 
                        <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#424242" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> 
                        <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="#424242" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> 
                    </g>
                </svg>
            </div>

        </nav>
        `;

}

const CARTBTN = document.getElementById('cart');
if (CARTBTN) {

    const CART = 'business/public/cart.php';

    CARTBTN.addEventListener('click', async () => {
        // obtener orden pendiente según cliente
        const JSON = await dataRequest(CART, 'getActuallyOrder');
        // verificar el resultado
        switch (JSON.status) {
            case -1:
                // mandar a usuario a iniciar sesión
                setTimeout(() => {
                    location.href = 'login.html';
                }, 500);
                break;

            case 1:
                setTimeout(() => {
                    // redireciones a la página del cart, enviandole la orden recuperada
                    const URL = 'cart.html' + '?orderid=' + encodeURIComponent(JSON.dataset[0].id_order);
                    location.href = URL;
                }, 500);
                break;

            case 2:

                M.toast({ html: "Add products to your cart" });

                break;
            default:
                break;
        }
        // dependiendo de la sesión enviar a login
        // enviar a cart.html
    })
}

const USERS = 'business/private/user.php';
const ACCOUNT = document.getElementById('account');
if (ACCOUNT) {


    let button = '<button class="btn-flat toast-action" type="submit">Log out</button>'

    ACCOUNT.addEventListener('click', async event => {
        event.preventDefault();
        const JSON = await dataRequest(USERS, 'checkSessionClient');
        switch (JSON.status) {
            case 1:
                M.toast({ html: '<span> Do you wanna log out </span><button class="btn-flat toast-action" onclick="logOut()" type="submit">Log out</button>' })
                break;

            case -1:
                setTimeout(() => {
                    location.href = 'login.html';
                }, 500);
                break;
                break;
            default:
                break;
        }
    })
}

const logOut = async () => {
    const JSON = await dataRequest(USERS, 'logOut');
    if (JSON.status) {
        setTimeout(() => {
            location.href = '../../view/public/';
        }, 500);

    }

}

document.addEventListener('DOMContentLoaded', function () {
    M.AutoInit();
});

