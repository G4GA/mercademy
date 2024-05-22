import json

from django.shortcuts import render
from django.http import JsonResponse
from django.db import transaction

from core.models import User, Product, ProductInstance
from .models import Sale, SaleDetail

from django.utils import timezone

def detail(request):
    context = {}
    detail_list = []
    sale_obj = Sale.objects.filter(id=request.GET.get('saleId')).first()
    context['date'] = sale_obj.date
    context['sale_id'] = sale_obj.id

    detail_list = []

    for model in SaleDetail.objects.filter(sale=sale_obj.id):
        detail_list.append({'p_name': model.product_instance.product.name,
                           'amount': model.amount,
                           'seller': model.product_instance.seller.name})

    context['detail_list'] = detail_list

    print(context)

    return render(request, 'detail.html', context)

def purchase(request):
    context = {}

    product_data_json = request.GET.get('data', '')
    product_data = json.loads(product_data_json)

    context['product_list'] = [return_product_info(Product.objects.filter(id=product['id'])[0], product['price']) for product in product_data]

    if request.session.get('user_id'):
        context['user_name'] = User.objects.filter(id=request.session['user_id'])[0].name

    return render(request, 'purchase.html', context)

def get_sellers(request):
    p_id = json.loads(request.body.decode())['product_id']
    product_item = Product.objects.filter(id=p_id)[0]
    p = [{'seller':{'id':x.seller.id, 'name':x.seller.name}, 'instance':{'price':f'{float(x.price)}', 'id':x.id, 'amount':x.quantity}} for x in ProductInstance.objects.filter(product=product_item)]
    p = {'sellers':p, 'product_id':p_id}
    return JsonResponse(p, status=200)

def make_sale(request):
    body = json.loads(request.body.decode())['body_dict']['product_info']
    p_ins_list = []
    sale_info = {}

    if request.session.get('user_id') is None:
        return JsonResponse({'error':'user undefined'})

    try:
        with transaction.atomic():
            for p_instance in body:
                ins = None
                if p_instance['id'] == '':
                    product = Product.objects.filter(name=p_instance['name']).first()
                    ins = ProductInstance.objects.filter(product=product, price=float(p_instance['price'])).first()
                else:
                    ins = ProductInstance.objects.filter(id=p_instance['id']).first()
                if not ins or int(p_instance['amount']) > ins.quantity:
                    return JsonResponse({'error':{'name': ins.product.name, 'amount': ins.quantity}})
                ins.quantity -= int(p_instance['amount'])
                ins.save()

                p_ins_list.append((ins, int(p_instance['amount'])))

            sale = Sale(user=User.objects.filter(id=request.session.get('user_id')).first())
            sale.save()

            sale_info['id'] =  sale.id

            sale_info['date'] = timezone.now()

            for ins, d_amount in p_ins_list:
                SaleDetail(sale=sale, product_instance=ins, amount=d_amount).save()

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse(sale_info, status=200)

def return_product_info(product:Product, price):
    info = {
        'name': product.name,
        'picture': product.picture.url,
        'price': float(ProductInstance.objects.filter(product=product.id, price=price).order_by('price')[0].price),
        'id': product.id,
    }
    return info