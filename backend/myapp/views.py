import logging
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import NotFound
from .models import Loan
from .serializers import LoanSerializer
logger = logging.getLogger(__name__)

class LoanViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Loan.objects.all().order_by('-id')
    serializer_class = LoanSerializer

    # GET /api/loans/ - List all loans
    def list(self, request):
        serializer = self.serializer_class(self.queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # POST /api/loans/ - Create a new loan
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # GET /api/loans/<pk>/ - Retrieve a specific loan by ID
    def retrieve(self, request, pk=None):
        try:
            loan = Loan.objects.get(pk=pk)
            logger.info(f"Updating loan {loan.id}: {request.data}")
        except Loan.DoesNotExist:
            logger.error(f"Loan with id {pk} not found.")
            raise Http404("Loan not found")
        serializer = self.serializer_class(loan,data=request.data)

        if serializer.is_valid():
            serializer.save()
            logger.info(f"Loan {loan.id} updated successfully.")
            return Response(serializer.data, status=status.HTTP_200_OK)

        logger.error(f"Loan update failed: {serializer.errors}")
        return Response(serializer.data, status=status.HTTP_200_OK)

    # PUT /api/loans/<pk>/ - Fully update a loan
    def update(self, request, pk=None):
        try:
            loan = Loan.objects.get(pk=pk)
        except Loan.DoesNotExist:
            raise Http404("Loan not found")

        serializer = self.serializer_class(loan, data=request.data)
        if serializer.is_valid():
            serializer.save()  # Save updated data to DB
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None):
        try:
            loan = Loan.objects.get(pk=pk)
        except Loan.DoesNotExist:
            raise Http404("Loan not found")

        serializer = self.serializer_class(loan, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()  # Save updated data to DB
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    # DELETE /api/loans/<pk>/ - Delete a loan
    def destroy(self, request, pk=None):
        try:
            loan = get_object_or_404(Loan, pk=pk)
            loan.delete()
            return Response({"message": "Loan deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Loan.DoesNotExist:
            return Response({"message": "Loan Not Found"}, status=status.HTTP_204_BAD_REQUEST)
