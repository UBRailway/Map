from django.shortcuts import render, redirect
from .models import *

# Create your views here.

def index(request):
    kilometers = Kilometers.objects.all()
    artificial_construction = Artificial_Construction.objects.all()
    station = Station.objects.all()
    sections_kilometers = SectionsKilometers.objects.all()
    media_artificial_construction = Media_Artificial_Construction.objects.all()

    context = {
        'kilometers': kilometers,
        'artificial_construction': artificial_construction,
        'stations': station,
        'sections_kilometers': sections_kilometers,
        'media_artificial_construction': media_artificial_construction
    }

    # for sk in sections_kilometers:
    #     print(sk.kilometers.risk)

    return render(request, 'interactive_map/index.html', context=context)