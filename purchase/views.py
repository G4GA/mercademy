import json

from django.shortcuts import render
from django.http import JsonResponse

from core.models import User, Product, ProductInstance

def purchase(request):
    context = {}

    product_data_json = request.GET.get('data', '')
    product_data = json.loads(product_data_json)

    context['product_list'] = [return_product_info(Product.objects.filter(id=product['id'])[0]) for product in product_data]

    if request.session.get('user_id'):
        context['user_name'] = User.objects.filter(id=request.session['user_id'])[0].name

    return render(request, 'purchase.html', context)

def get_sellers(request):
    p_id = json.loads(request.body.decode())['product_id']
    product_item = Product.objects.filter(id=p_id)[0]
    p = [{'seller':{'id':x.seller.id, 'name':x.seller.name}, 'instance':{'price':f'{float(x.price)}', 'id':x.id}} for x in ProductInstance.objects.filter(product=product_item)]
    p = {'sellers':p, 'product_id':p_id}
    print(p)
    return JsonResponse(p, status=200)

def return_product_info(product:Product):
    info = {
        'name': product.name,
        'picture': product.picture.url,
        'price': float(ProductInstance.objects.filter(product=product.id).order_by('price')[0].price),
        'id': product.id,
    }
    return info