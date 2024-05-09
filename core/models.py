from django.db import models
#TODO: Take a brief look to all models again and ensure that every model is done

class User(models.Model):
    name = models.CharField(max_length=255, blank=False, verbose_name='Display name')
    phone_number = models.CharField(max_length=10, blank=False, verbose_name='Phone number')
    address = models.CharField(max_length=255, blank=False)
    email_addr = models.EmailField(verbose_name='Email address', blank=False)
    password = models.CharField(max_length=32, blank=False)

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return  self.name

class Product(models.Model):
    name = models.CharField(max_length=255, blank=False, verbose_name='Product name')
    picture = models.ImageField(upload_to='images', blank=False, verbose_name='Product image')
    description = models.TextField(verbose_name='Product description', blank=False)

    category = models.ForeignKey('ProductCategory', on_delete=models.PROTECT)

    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'

    def __str__(self):
        return self.name

class ProductInstance(models.Model):
    price = models.DecimalField(max_digits=8, decimal_places=2, verbose_name='Price', blank=False)
    quantity = models.IntegerField(verbose_name='Product quantity', blank=False)

    product = models.ForeignKey('Product', verbose_name='Product', on_delete=models.PROTECT)
    seller = models.ForeignKey('User', verbose_name='Product seller', on_delete=models.PROTECT)

    class Meta:
        verbose_name = 'Product instance'

    def __str__(self):
        return str(self.product)

class Course(models.Model):
    name = models.CharField(max_length=255, verbose_name='Course name', blank=False)
    description = models.TextField(verbose_name='Course description', blank=False)
    price = models.DecimalField(max_digits=8, decimal_places=2, verbose_name='Course price')

    category = models.ForeignKey('CourseCategory', on_delete=models.PROTECT)
    instructor = models.ForeignKey('User', verbose_name='Course instructor', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class CourseCategory(models.Model):
    name = models.CharField(max_length=255, verbose_name='Course category', blank=False)

    class Meta:
        verbose_name = 'Course category'
        verbose_name = 'Course categories'

    def __str__(self):
        return self.name


#TODO: Don't forget to add this to the product instance latter
class PrimaryColor(models.Model):
    color_name = models.CharField(max_length=32, null=True, verbose_name='Color name', blank=False)
    hex_code = models.BigIntegerField(verbose_name='Color hex code', null=False)

    def __str__(self):
        return self.color_name

class ProductCategory(models.Model):
    name = models.CharField(max_length=64, null=False)

    class Meta:
        verbose_name = 'Product category'
        verbose_name_plural = 'Product categories'

    def __str__(self):
        return self.name