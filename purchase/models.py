from django.db import models

from core.models import User, ProductInstance

class Sale(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    date = models.DateField(auto_now=True)

    class Meta:
        verbose_name = 'Sale'
        verbose_name_plural = 'Sales'

    def __str__(self) -> str:
        return f'{self.user} {self.date}'

class SaleDetail(models.Model):
    sale = models.ForeignKey('Sale', on_delete=models.PROTECT)
    product_instance = models.ForeignKey(ProductInstance, on_delete=models.PROTECT)
