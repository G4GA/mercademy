let product_info_list = document.getElementById('sc-products').getElementsByTagName('li')
const csrfToken = document.querySelector('input[name=csrfmiddlewaretoken]').value;
let instances = []

for (let i = 0; i < product_info_list.length; i ++) {
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
    })
    sub_b.addEventListener('click', (event) => {
        let count = counter.getElementsByClassName('item-name')[0].textContent
        if (count > 1) {
            counter.getElementsByClassName('item-name')[0].textContent = `${parseInt(count) - 1}`
        }
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
            let sellers = data.sellers
            let product_id = data.product_id
            let cur_item = document.getElementById('sc-products').getElementsByClassName(`it-${product_id}`)[0]

            let seller_container = document.createElement('ul')
            seller_container.className = 'seller-container'
            for (let i = 0; i < sellers.length; i++) {
                let seller_info = document.createElement('li')
                seller_info.style = 'display: flex; justify-content: space-between;'

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
                    cur_item.removeChild(cur_item.getElementsByClassName('seller-container')[0])
                    cur_item.style = 'grid-template-columns: 1fr 1fr 1fr 1fr 1.5fr 1fr'
                })

                seller_container.appendChild(seller_info)
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