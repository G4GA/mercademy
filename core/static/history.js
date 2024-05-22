let info_element = document.getElementById('info')

info_element.textContent = 'Compras: '

let sale_list = document.getElementsByClassName('sale-litem')

for (let i = 0; i < sale_list.length; i++) {
    sale_list[i].getElementsByTagName('button')[0].addEventListener('click', () => {
        let id_item = sale_list[i].getElementsByClassName('sale-id')[0].textContent
        let id = id_item.substring(id_item.indexOf(':') + 2)
        let sale_id = new URLSearchParams({'saleId':id}).toString();

        let url = `/purchase/detail/?${sale_id}`

        window.location.href = url
    })

}