let product_info_list = document.getElementById('sc-products').getElementsByTagName('li')
const csrfToken = document.querySelector('input[name=csrfmiddlewaretoken]').value;
let instances = []

let total_item = document.getElementById('amount')
let total = 0

for (let i = 0; i < product_info_list.length; i ++) {
    let price = product_info_list[i].getElementsByClassName('item-price')
    total = total + parseFloat(price[0].textContent.substring(1))
    let buttons = product_info_list[i].getElementsByTagName('button')
    let counter = product_info_list[i].getElementsByClassName('counter')[0]
    let li_item = product_info_list[i]

    let add_b = buttons[0]
    let sub_b = buttons[1]
    let del_b = buttons[2]
    let sel_b = product_info_list[i].getElementsByClassName('seller')[0]

    add_b.addEventListener('click', (event) => {
        let count = counter.getElementsByClassName('item-name')[0].textContent
        counter.getElementsByClassName('item-name')[0].textContent = `${parseInt(count) + 1}`
        update_total_price()
    })
    sub_b.addEventListener('click', (event) => {
        let count = counter.getElementsByClassName('item-name')[0].textContent
        if (count > 1) {
            counter.getElementsByClassName('item-name')[0].textContent = `${parseInt(count) - 1}`
        }
        update_total_price()
    })
    del_b.addEventListener('click', (event) => {
        document.getElementById('sc-products').removeChild(li_item)
    })
    sel_b.addEventListener('click', (event) => {

        let product_id = li_item.className.substring(li_item.className.indexOf('-') + 1)
        fetch('/purchase/get-sellers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify({
                'product_id': product_id,
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON response
        }).then(data => {
            console.log(data)
            let sellers = data.sellers
            let product_id = data.product_id
            let cur_item = document.getElementById('sc-products').getElementsByClassName(`it-${product_id}`)[0]

            let seller_container = document.createElement('ul')
            seller_container.className = 'seller-container'
            for (let i = 0; i < sellers.length; i++) {
                let seller_info = document.createElement('li')
                seller_info.style = 'display: flex; justify-content: space-between;'
                if (sellers[i].instance.amount > 0) {
                    let seller_name = document.createElement('p')
                    seller_name.id = 'seller-name'
                    seller_name.textContent = sellers[i].seller.name
                    seller_info.appendChild(seller_name)

                    let seller_price = document.createElement('p')
                    seller_price.className = 'seller-price'
                    seller_price.textContent = ` $${sellers[i].instance.price}`
                    seller_info.appendChild(seller_price)

                    let select_b = document.createElement('button')
                    select_b.textContent = 'Seleccionar'
                    seller_info.appendChild(select_b)
                    select_b.className = "btn btn-secondary"

                    select_b.addEventListener('click', (event) => {
                        let cur_item_price = cur_item.getElementsByClassName('item-price')[0]
                        cur_item_price.textContent = `$${sellers[i].instance.price}`
                        cur_item_price.id = `${sellers[i].instance.id}`
                        cur_item.removeChild(cur_item.getElementsByClassName('seller-container')[0])
                        cur_item.style = 'grid-template-columns: 1fr 1fr 1fr 1fr 1.5fr 1fr'
                        update_total_price()
                    })

                    seller_container.appendChild(seller_info)
                }
            }
            let list_items = document.getElementById('sc-products').getElementsByClassName('item')
            let flag = false
            let pitem = ''
            for (let i = 0; i < list_items.length; i++) {
                let containers = list_items[i].getElementsByClassName('seller-container')
                if (containers.length > 0) {
                    pitem = list_items[i]
                    flag = true
                }
            }

            if (flag) {
                let container = pitem.getElementsByClassName('seller-container')[0]
                pitem.removeChild(container)
                pitem.style = 'grid-template-columns: 1fr 1fr 1fr 1fr 1.5fr 1fr'
                cur_item.appendChild(seller_container)
            } else {
                cur_item.appendChild(seller_container)
            }
            cur_item.style = 'grid-template-columns: 1fr 1fr 1fr 1fr 1.5fr 1fr 1fr'

        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    })
}

let update_total_price = () => {
    let new_total = 0
    for (let i = 0; i < product_info_list.length; i ++) {
        let cur_price = product_info_list[i].getElementsByClassName('item-price')[0].textContent.substring(1)
        let cur_amount = product_info_list[i].getElementsByClassName('counter')[0].getElementsByClassName('item-name')[0].textContent

        new_total += parseFloat(`${parseInt(cur_amount) * parseFloat(cur_price)}`)
    }
    total_item.textContent = `${new_total}`
}

total_item.textContent = `${total}`

document.getElementById('purchase-botton').addEventListener('click', () => {
    let items = document.getElementsByClassName('item')
    let body_list = []
    for (let i = 0;i < items.length; i ++) {
        body_list.push({
            'name': items[i].getElementsByClassName('p-name')[0].getElementsByClassName('item-name')[0].textContent,
            'id': items[i].getElementsByClassName('item-price')[0].id,
            'price': items[i].getElementsByClassName('item-price')[0].textContent.substring(1),
            'amount': items[i].getElementsByClassName('counter')[0].getElementsByClassName('item-name')[0].textContent
        })
    }
    let body_dict = {'product_info':body_list}
    fetch('/purchase/make-sale', {
        method:  'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({
            body_dict
        })

    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        if (data['error']) {
            let e_info = data['error']
            if (document.getElementById('error')) {
                document.getElementById('error').removeChild()
            }
            let error_messagge = document.createElement('p')
            error_messagge.id = 'error'
            if (data['error'] === 'user undefined') {
                error_messagge.style.color = 'blue'
                error_messagge.textContent = 'Primero debes iniciar sesion'
            } else {
                error_messagge.style.color = 'red'
                error_messagge.textContent = `Limite máximo de artículos excedido para ${e_info['name']}. Limite: ${e_info['amount']}`
            }
            document.getElementById('content').appendChild(error_messagge)
        } else {
            let data_info = new URLSearchParams(data).toString();
            let url = `/home?${data_info}`
            window.location.href = url
        }
    })
})