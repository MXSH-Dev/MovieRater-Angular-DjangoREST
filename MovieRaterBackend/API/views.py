# from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

from django.contrib.auth.models import User


from .models import Movie, Rating
from .serializers import MovieSerializer, RatingSerializer, UserSerializer

# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    """
    User view set
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class MoiveViewSet(viewsets.ModelViewSet):
    """
    MoiveViewSet
    """
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    @action(detail=True, methods=['POST'])
    def rate_movie(self, request, pk):
        """
        add or update movie rating
        """
        if 'stars' in request.data:

            movie = Movie.objects.get(id=pk)
            stars = request.data['stars']
            user = request.user
            # user = User.objects.get(id=1)

            try:
                rating = Rating.objects.get(user=user.id, movie=movie.id)
                print(rating.stars, type(rating.stars), stars, type(stars))
                if rating.stars == int(stars):
                    response = {
                        'error': 'same rating for this movie already exist'}
                    return Response(response, status=status.HTTP_400_BAD_REQUEST)
                rating.stars = stars
                rating.save()
                serializer = RatingSerializer(rating, many=False)
                response = {'success': 'Rating updated',
                            'result': serializer.data}
                return Response(response, status=status.HTTP_200_OK)
            except:
                rating = Rating.objects.create(
                    user=user, movie=movie, stars=stars)
                serializer = RatingSerializer(rating, many=False)
                print(serializer.data)
                response = {'success': 'Rating created',
                            'result': serializer.data}
                return Response(response, status=status.HTTP_200_OK)

        else:
            response = {'error': "bad request"}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


class RatingViewSet(viewsets.ModelViewSet):
    """
    Rating view set
    """
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def update(self, request, *args, **kwargs):
        """"
        Override update to disallow this method
        """
        response = {'error': "Not allowed update rating with this method"}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        """"
        Override create to disallow this method
        """
        response = {'error': "Not allowed create rating with this method"}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)
