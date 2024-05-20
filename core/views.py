from django.shortcuts import render
from django.shortcuts import redirect

from .forms import LoginForm
from .models import User
from .models import Product
from .models import ProductInstance

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
    if request.session.get('user_id'):
        context['user_name'] = User.objects.filter(id=request.session['user_id'])[0].name
    products = []

    for product in Product.objects.all():
        info = return_product_info(product)
        products.append(info)
    context['products'] = products

    return render(request, 'home.html', context)

def return_product_info(product:Product):
    info = {
        'picture': product.picture.url,
        'name': product.name,
        'price': float(ProductInstance.objects.filter(product=product.id).order_by('price')[0].price),
        'id': product.id,
    }
    return info