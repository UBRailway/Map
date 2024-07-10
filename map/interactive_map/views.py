from django.shortcuts import render, redirect
from .models import *

# Create your views here.

def index(request):
    kilometers = Kilometers.objects.all()
    artificial_construction = Artificial_Construction.objects.all()
    station = Station.objects.all()

    context = {
        'kilometers': list(kilometers.values()),
        'artificial_construction': list(artificial_construction),
        'station': list(station.values())
    }

    return render(request, 'interactive_map/index.html', context=context)