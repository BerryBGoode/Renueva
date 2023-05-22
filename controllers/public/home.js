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
                <form action="" autocomplete="on">
                    <input id="search" name="search" type="text" placeholder="What're we looking for?" autocomplete="off">
                    <svg width="25" height="25" viewBox="0 0 27 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.5264 24.1588C17.34 24.1588 22.0528 18.9745 22.0528 12.5794C22.0528 6.18426 17.34 1 11.5264 1C5.71283 1 1 6.18426 1 12.5794C1 18.9745 5.71283 24.1588 11.5264 24.1588Z"
                            stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M26 30.6719L20.7368 24.8822" stroke="black" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>

                    </from>
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
                }, 0500);
                break;

            case 1:
                setTimeout(() => {
                    // redireciones a la página del cart, enviandole la orden recuperada
                    const URL = 'cart.html' + '?orderid=' + encodeURIComponent(JSON.dataset[0].id_order);
                    location.href = URL;
                }, 0500);
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
                }, 0500);
                break;
                break;
            default:
                break;
        }
    })
}

const logOut = async () => {
    const JSON = await dataRequest(USERS, 'logOut');
    setTimeout(() => {
        location.href = '../../view/public/';
    }, 0500);

}
document.addEventListener('DOMContentLoaded', function () {
    M.AutoInit();
});

