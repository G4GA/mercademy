let total_element = document.getElementById('detail-total')
let detail_list = document.getElementsByClassName('detail')

let total = 0

for (let i = 0; i < detail_list.length; i ++) {
    let cur_price = detail_list[i].getElementsByClassName('price')[0].textContent
    let quantity = detail_list[i].getElementsByClassName('detail-amount')[0].textContent
    let price = parseFloat(cur_price.substring(cur_price.indexOf('$') + 1)) * parseInt(quantity.substring(quantity.indexOf(':') + 2))

    total += price
}

total_element.textContent = `Total: $${total}`