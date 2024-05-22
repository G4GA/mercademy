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

checkout_button.addEventListener('click', (event) => {
    let productData = shopping_cart_info_list.map(info => {
        console.log(info.price.substring(1))
        return {
            id: info.product_id,
            price: info.price.substring(1),
        };
    });
    let url = `/purchase?data=${encodeURIComponent(JSON.stringify(productData))}`
    window.location.href = url
})

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


let close_button = () => {
    let sale_element = document.getElementById('sale')
    document.body.removeChild(sale_element)
}

if (document.getElementById('close')) {
    document.getElementById('close').addEventListener('click', (event) => {
        close_button()
    })
}

if (document.getElementById('see-detail')) {
    document.getElementById('see-detail').addEventListener('click', (event) => {
        let id_str = document.getElementById('sale-id').textContent.substring(document.getElementById('sale-id').textContent.indexOf(':') + 2)
        let sale_id = new URLSearchParams({'saleId':id_str}).toString();
        let url = `/purchase/detail/?${sale_id}`

        console.log(url)

        window.location.href = url
    })
}

if (document.getElementById('history')) {
    document.getElementById('history').addEventListener('click', (event) => {
        let url = '/history'

        window.location.href = url
    })
}