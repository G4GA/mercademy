from django.shortcuts import render
from django.shortcuts import redirect

from .forms import LoginForm
from .models import User
from .models import Product
from .models import ProductInstance

from purchase.models import Sale

from datetime import datetime

def login(request):
    print(request)
    context = {
        'form': LoginForm(),
        'auth_failure': request.session['auth_failure'] if request.session.get('auth_failure') else False
    }
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            email_addr = form.cleaned_data['email_addr']
            password = form.cleaned_data['password']

            user = User.objects.filter(email_addr=email_addr, password=password)
            if user:
                request.session['user_id'] = user[0].id
                request.session['auth_failure'] = False
                return redirect('home')
            else:
                request.session['auth_failure'] = True
    return render(request, 'login.html', context)

def home(request):
    context = {}
    products = []
    if request.session.get('user_id'):
        context['user_name'] = User.objects.filter(id=request.session['user_id'])[0].name
    if (request.GET):
        date = datetime.fromisoformat(request.GET['date'].replace('Z', '+00:00'))
        context['sale'] = {'id': request.GET['id'], 'date': date}

    for product in Product.objects.all():
        info = return_product_info(product)
        if info['price'] is not None:
            products.append(info)
    context['products'] = products
    return render(request, 'home.html', context)

def history(request):
    context = {}
    if request.session.get('user_id'):
        context['user_name'] = User.objects.filter(id=request.session['user_id'])[0].name
    else:
        return redirect('home')
    sale_list = []
    sale_query_list = Sale.objects.filter(user=User.objects.filter(id=request.session.get('user_id')).first())
    for sale in sale_query_list:
        sale_list.append({
            'id': sale.id,
            'date': sale.date
        })

    context['sales'] = sale_list

    return render(request, 'history.html', context)

def return_product_info(product:Product):
    query_price = ProductInstance.objects.filter(product=product.id, quantity__gt=0)
    info = {
        'picture': product.picture.url,
        'name': product.name,
        'price': float(query_price.order_by('price')[0].price)
                 if query_price else None,
        'id': product.id,
    }
    return info