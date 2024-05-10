from django.db import models

class User(models.Model):
    name = models.CharField(max_length=255, blank=False, verbose_name='Display name', default='')
    phone_number = models.CharField(max_length=10, blank=False, verbose_name='Phone number', default='')
    address = models.CharField(max_length=255, blank=False, default='')
    email_addr = models.EmailField(verbose_name='Email address', blank=False, default='')
    password = models.CharField(max_length=32, blank=False, default='')

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return  self.name

class Product(models.Model):
    name = models.CharField(max_length=255, blank=False, verbose_name='Product name', default='')
    picture = models.ImageField(upload_to='images', blank=False, verbose_name='Product image', default='')
    description = models.TextField(verbose_name='Product description', blank=False, default='')

    category = models.ForeignKey('ProductCategory', on_delete=models.PROTECT)

    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'

    def __str__(self):
        return self.name

class ProductInstance(models.Model):
    price = models.DecimalField(max_digits=8, decimal_places=2, verbose_name='Price', blank=False, default='')
    quantity = models.IntegerField(verbose_name='Product quantity', blank=False, default='')

    product = models.ForeignKey('Product', verbose_name='Product', on_delete=models.PROTECT)
    seller = models.ForeignKey('User', verbose_name='Product seller', on_delete=models.PROTECT)
    primary_color = models.ForeignKey('PrimaryColor', verbose_name='Primary color', on_delete=models.PROTECT)

    class Meta:
        verbose_name = 'Product instance'

    def __str__(self):
        return str(self.product)

class Course(models.Model):
    name = models.CharField(max_length=255, verbose_name='Course name', blank=False, default='')
    description = models.TextField(verbose_name='Course description', blank=False, default='')
    price = models.DecimalField(max_digits=8, decimal_places=2, verbose_name='Course price', default='')

    category = models.ForeignKey('CourseCategory', on_delete=models.PROTECT)
    instructor = models.ForeignKey('User', verbose_name='Course instructor', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class CourseCategory(models.Model):
    name = models.CharField(max_length=255, verbose_name='Course category', blank=False, default='')

    class Meta:
        verbose_name = 'Course category'
        verbose_name = 'Course categories'

    def __str__(self):
        return self.name

class PrimaryColor(models.Model):
    color_name = models.CharField(max_length=32, null=True, verbose_name='Color name', blank=False, default='')
    hex_code = models.BigIntegerField(verbose_name='Color hex code', null=False, default='')

    def __str__(self):
        return self.color_name

class ProductCategory(models.Model):
    name = models.CharField(max_length=64, null=False, default='')

    class Meta:
        verbose_name = 'Product category'
        verbose_name_plural = 'Product categories'

    def __str__(self):
        return self.name