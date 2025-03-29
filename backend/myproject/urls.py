from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),       # Django Admin
    path('api/', include('myapp.urls')),   # Include myapp's URL routes
]
