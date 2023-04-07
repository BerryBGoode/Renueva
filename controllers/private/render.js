//const. con la dirección del api de ususarios
const USER_LOGOUT = 'business/private/user.php';

async function logOut() {
    //const para confirmar la acción del usuario
    const CONFIRM = await notificaciónConfirm('Do you wanna close sesion?');
    if (CONFIRM) {
        //const para ejecutar la respuesta del servidor al cerrar sesión
        const JSON = await dataRequest(USER_LOGOUT, 'logOut');
        if (JSON.status) {
            notificationRedirect('success', JSON.message, true, 'index.html');
        } else {
            notificationRedirect('error', JSON.exception, false);
        }
    }
}

//in this file use fun render, 'cause reduce code html, here render the components most important
//cont
let width_change = document.documentElement.clientWidth;
let width_fixed = window.innerWidth;

//render sidebar
let sidebar = document.getElementById('slidebar-main-container');

sidebar.innerHTML = `<div class="side-bar hide-on-small-only">
    <img src="../../resources/img/Logo/sidebar-logo.png" alt="Logo" class="logo-slide">
    <div class="options-container">
        <div class="options-main">
            <ul>
                <li>
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" class="icon-sidebar"
                        xmlns="../../resources/icons/dashboard-svgrepo-com.svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M22 8.52V3.98C22 2.57 21.36 2 19.77 2H15.73C14.14 2 13.5 2.57 13.5 3.98V8.51C13.5 9.93 14.14 10.49 15.73 10.49H19.77C21.36 10.5 22 9.93 22 8.52Z"
                                stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            </path>
                            <path
                                d="M22 19.77V15.73C22 14.14 21.36 13.5 19.77 13.5H15.73C14.14 13.5 13.5 14.14 13.5 15.73V19.77C13.5 21.36 14.14 22 15.73 22H19.77C21.36 22 22 21.36 22 19.77Z"
                                stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            </path>
                            <path
                                d="M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52Z"
                                stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            </path>
                            <path
                                d="M10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z"
                                stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            </path>
                        </g>
                    </svg>
                    <a href="../../view/private/dashboard.html">Dashboard</a>
                </li>
                <li>
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" class="icon-sidebar"
                        xmlns="../../resources/icons/user-octagon-svgrepo-com.svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M21.08 8.58003V15.42C21.08 16.54 20.48 17.58 19.51 18.15L13.57 21.58C12.6 22.14 11.4 22.14 10.42 21.58L4.48003 18.15C3.51003 17.59 2.91003 16.55 2.91003 15.42V8.58003C2.91003 7.46003 3.51003 6.41999 4.48003 5.84999L10.42 2.42C11.39 1.86 12.59 1.86 13.57 2.42L19.51 5.84999C20.48 6.41999 21.08 7.45003 21.08 8.58003Z"
                                stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path
                                d="M12 11.0001C13.2869 11.0001 14.33 9.95687 14.33 8.67004C14.33 7.38322 13.2869 6.34009 12 6.34009C10.7132 6.34009 9.67004 7.38322 9.67004 8.67004C9.67004 9.95687 10.7132 11.0001 12 11.0001Z"
                                stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M16 16.6601C16 14.8601 14.21 13.4001 12 13.4001C9.79 13.4001 8 14.8601 8 16.6601"
                                stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </g>
                    </svg>

                    <a href="../../view/private/users.html">Users</a>
                </li>
                <li>
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" class="icon-sidebar"
                        xmlns="/resources/icons/users-svgrepo-com.svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                                stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            </path>
                            <path
                                d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22"
                                stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            </path>
                        </g>
                    </svg>
                    <a href="../../view/private/staffs.html">Staffs</a>
                </li>
                <li>
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" class="icon-sidebar"
                        xmlns="../../resources/icons/clients-svgrepo-com.svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M9.16006 10.87C9.06006 10.86 8.94006 10.86 8.83006 10.87C6.45006 10.79 4.56006 8.84 4.56006 6.44C4.56006 3.99 6.54006 2 9.00006 2C11.4501 2 13.4401 3.99 13.4401 6.44C13.4301 8.84 11.5401 10.79 9.16006 10.87Z"
                                stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            </path>
                            <path
                                d="M16.41 4C18.35 4 19.91 5.57 19.91 7.5C19.91 9.39 18.41 10.93 16.54 11C16.46 10.99 16.37 10.99 16.28 11"
                                stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            </path>
                            <path
                                d="M4.15997 14.56C1.73997 16.18 1.73997 18.82 4.15997 20.43C6.90997 22.27 11.42 22.27 14.17 20.43C16.59 18.81 16.59 16.17 14.17 14.56C11.43 12.73 6.91997 12.73 4.15997 14.56Z"
                                stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            </path>
                            <path
                                d="M18.3401 20C19.0601 19.85 19.7401 19.56 20.3001 19.13C21.8601 17.96 21.8601 16.03 20.3001 14.86C19.7501 14.44 19.0801 14.16 18.3701 14"
                                stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            </path>
                        </g>
                    </svg>
                    <a href="../../view/private/clients.html">Clients</a>
                </li>
                <li>
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" class="icon-sidebar"
                        xmlns="../../resources/icons/orders-svgrepo-com.svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                                stroke="#000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                stroke-linejoin="round"></path>
                            <path
                                d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                                stroke="#000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                stroke-linejoin="round"></path>
                            <path
                                d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                                stroke="#000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                stroke-linejoin="round"></path>
                            <path d="M9 8H21" stroke="#000" stroke-width="1.5" stroke-miterlimit="10"
                                stroke-linecap="round" stroke-linejoin="round"></path>
                        </g>
                    </svg>
                    <a href="../../view/private/orders.html">Orders</a>
                </li>
                <li>
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" class="icon-sidebar"
                        xmlns="../../resources/icons/products-svgrepo-com.svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M8.67188 14.3298C8.67188 15.6198 9.66188 16.6598 10.8919 16.6598H13.4019C14.4719 16.6598 15.3419 15.7498 15.3419 14.6298C15.3419 13.4098 14.8119 12.9798 14.0219 12.6998L9.99187 11.2998C9.20187 11.0198 8.67188 10.5898 8.67188 9.36984C8.67188 8.24984 9.54187 7.33984 10.6119 7.33984H13.1219C14.3519 7.33984 15.3419 8.37984 15.3419 9.66984"
                                stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            </path>
                            <path d="M12 6V18" stroke="#000" stroke-width="1.5" stroke-linecap="round"
                                stroke-linejoin="round"></path>
                            <path d="M15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H15C20 2 22 4 22 9V15C22 20 20 22 15 22Z"
                                stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            </path>
                        </g>
                    </svg>
                    <a href="../../view/private/products.html">Products</a>
                </li>
                <li>
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" class="icon-sidebar"
                        xmlns="../../resources/icons/categories-svgrepo-com.svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M12.37 8.87988H17.62" stroke="#000" stroke-width="1.5" stroke-linecap="round"
                                stroke-linejoin="round"></path>
                            <path d="M6.38 8.87988L7.13 9.62988L9.38 7.37988" stroke="#000" stroke-width="1.5"
                                stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M12.37 15.8799H17.62" stroke="#000" stroke-width="1.5" stroke-linecap="round"
                                stroke-linejoin="round"></path>
                            <path d="M6.38 15.8799L7.13 16.6299L9.38 14.3799" stroke="#000" stroke-width="1.5"
                                stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                                stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            </path>
                        </g>
                    </svg>
                    <a href="../../view/private/categories.html">Categories</a>
                </li>
            </ul>

        </div>
        <div class="options-account">
            <ul>
                <li>
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" class="icon-sidebar"
                        xmlns="../../resources/icons/account-svgrepo-com.svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M10.49 2.23006L5.50003 4.10005C4.35003 4.53005 3.41003 5.89004 3.41003 7.12004V14.55C3.41003 15.73 4.19005 17.28 5.14005 17.99L9.44003 21.2001C10.85 22.2601 13.17 22.2601 14.58 21.2001L18.88 17.99C19.83 17.28 20.61 15.73 20.61 14.55V7.12004C20.61 5.89004 19.67 4.53005 18.52 4.10005L13.53 2.23006C12.68 1.92006 11.32 1.92006 10.49 2.23006Z"
                                stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            </path>
                            <path
                                d="M12.0001 10.92C11.9601 10.92 11.9101 10.92 11.8701 10.92C10.9301 10.89 10.1801 10.11 10.1801 9.16003C10.1801 8.19003 10.9701 7.40002 11.9401 7.40002C12.9101 7.40002 13.7001 8.19003 13.7001 9.16003C13.6901 10.12 12.9401 10.89 12.0001 10.92Z"
                                stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            </path>
                            <path
                                d="M10.01 13.72C9.05004 14.36 9.05004 15.41 10.01 16.05C11.1 16.78 12.89 16.78 13.98 16.05C14.94 15.41 14.94 14.36 13.98 13.72C12.9 12.99 11.11 12.99 10.01 13.72Z"
                                stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            </path>
                        </g>
                    </svg>
                    <a href="">Account</a>
                </li>
                <li onclick="logOut()">
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" class="icon-sidebar"
                        xmlns="../../resources/icons/logout-svgrepo-com.svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M17.4399 14.62L19.9999 12.06L17.4399 9.5" stroke="#000" stroke-width="1.5"
                                stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M9.76001 12.0601H19.93" stroke="#000" stroke-width="1.5" stroke-miterlimit="10"
                                stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M11.76 20C7.34001 20 3.76001 17 3.76001 12C3.76001 7 7.34001 4 11.76 4"
                                stroke="#000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                stroke-linejoin="round"></path>
                        </g>
                    </svg>
                    <a onclick="logOut()">Log out</a>
                </li>
            </ul>
        </div>
    </div>
</div>`;
search = document.getElementById('search-container'); search.innerHTML = `<svg width="18px" height="18px"
    viewBox="0 0 29 29" fill="none" class="search-icon" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M12.5263 21.5122C18.3398 21.5122 23.0526 17.1442 23.0526 11.7561C23.0526 6.36795 18.3398 2 12.5263 2C6.71279 2 2 6.36795 2 11.7561C2 17.1442 6.71279 21.5122 12.5263 21.5122Z"
        stroke="#424242" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M27 26.9999L21.7368 22.1218" stroke="#424242" stroke-width="4" stroke-linecap="round"
        stroke-linejoin="round" />
</svg>
<input type="text" placeholder="Search">`;

//render buttons print and add
let buttons = document.getElementById('more-actions');
if (buttons !== null) {
buttons.innerHTML = `<a href="#modal" class="waves-effect waves-light btn modal-trigger">Add</a>
<a href="" class="waves-effect waves-light btn ">Print</a>`;
}
