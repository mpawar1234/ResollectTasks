from django.db import models

class Loan(models.Model):
    loan_number = models.CharField(max_length=100)
    loan_type = models.CharField(max_length=50)
    borrower = models.CharField(max_length=100)
    borrower_address = models.TextField()
    co_borrower = models.CharField(max_length=100, blank=True, null=True)
    co_borrower_address = models.TextField(blank=True, null=True)
    current_dpd = models.IntegerField()
    sanctioned_amount = models.DecimalField(max_digits=10, decimal_places=2)
    region = models.CharField(max_length=50)
    stage = models.CharField(max_length=10)

    def __str__(self):
        return self.loan_number
