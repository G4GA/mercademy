from django.contrib import admin

from .models import (
    User,
    Product,
    ProductCategory,
    ProductInstance,
    Course,
    CourseCategory,
    PrimaryColor,
)

from purchase.models import (
    Sale,
    SaleDetail
)

admin.site.register(User)
admin.site.register(Product)
admin.site.register(ProductInstance)
admin.site.register(ProductCategory)
admin.site.register(Course)
admin.site.register(CourseCategory)
admin.site.register(PrimaryColor)
admin.site.register(Sale)
admin.site.register(SaleDetail)
