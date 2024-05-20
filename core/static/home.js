//Var init
var shopping_cart_element = document.createElement('div')
shopping_cart_element.id = 'shopping-cart'

var shopping_cart_list = document.createElement('ul')
shopping_cart_list.id = "shopping-cart-list"
shopping_cart_element.appendChild(shopping_cart_list)

var checkout_button = document.createElement('button')
checkout_button.id = "shopping-cart-checkout"
checkout_button.innerHTML = 'Proceder al pago'
checkout_button.className = 'btn btn-secondary'
shopping_cart_element.appendChild(checkout_button)

var log_in_b = document.getElementById("session").getElementsByTagName('button')[0]
if (log_in_b) {
    log_in_b.addEventListener('click', (event) => {
        window.location.href = '/login'
    })
}

checkout_button.addEventListener('click', (event) => {
    let productData = shopping_cart_info_list.map(info => {
        return {
            id: info.product_id,
        };
    });
    let url = `/purchase?data=${encodeURIComponent(JSON.stringify(productData))}`
    window.location.href = url
})

console.log(log_in_b)

var shopping_cart_info_list = []
var all_products = document.body.getElementsByClassName('item')
var carrito = document.getElementById('carrito')
var header_grid = document.getElementById('header-grid')

for (let i = 0; i < all_products.length; i ++) {
    let li_item = all_products[i]
    let button = li_item.getElementsByTagName('button')[0]

    let id = li_item.className.substring(li_item.className.length - 1)

    let price_element = all_products[i].getElementsByClassName('price')[0]
    let name_element = all_products[i].getElementsByClassName('name')[0]
    let picture = all_products[i].getElementsByTagName('img')[0]

    cur_pinfo = {
        "img": picture.src,
        "name": name_element.innerHTML,
        "price": price_element.textContent.substring(price_element.textContent.indexOf("$")),
        "product_id": id,
    }

    function addProductToCart(pinfo) {
        return function() {
            let cinfo = shopping_cart_info_list.find(info => info.product_id === pinfo.product_id)
            console.log(cinfo)
            if (cinfo === undefined) {
                let sc_item = document.createElement('li')
                sc_item.className = `sc-${pinfo.product_id}`

                let image_element = document.createElement('img')
                image_element.src = pinfo.img
                sc_item.appendChild(image_element)

                let info_grid = document.createElement('div')
                info_grid.id = 'info-grid'

                let name_element = document.createElement('p')
                name_element.textContent = pinfo.name
                info_grid.appendChild(name_element)

                let price_element = document.createElement('p')
                price_element.textContent = `Precio: ${pinfo.price}`
                info_grid.appendChild(price_element)

                sc_item.appendChild(info_grid)

                shopping_cart_list.appendChild(sc_item)

                pinfo.html_content = sc_item
                shopping_cart_info_list.push({... pinfo})
            } else {
            }
        };
    }
    button.addEventListener('click', addProductToCart(cur_pinfo))
}



let show_sl = () => {
    if (shopping_cart_list.children.length > 0) {
        document.body.insertBefore(shopping_cart_element, document.getElementById('content'))
    }
}

let hide_sl = () => {
    if (shopping_cart_list.children.length > 0) {
        document.body.removeChild(shopping_cart_element)
    }
}

carrito.addEventListener('click', (event) => {
    if (!document.getElementById('shopping-cart')) {
        show_sl()
    } else {
        hide_sl()
    }
})

// carrito.addEventListener('mouseleave', hide_sl)

let get_drop_down_menu = () => {
    document.createElement()
}