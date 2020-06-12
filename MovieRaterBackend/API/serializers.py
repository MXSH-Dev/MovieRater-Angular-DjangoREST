from rest_framework import serializers
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User

from .models import Movie, Rating


class UserSerializer(serializers.ModelSerializer):
    """
    User Serializer
    """
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'required': True,
            }
        }

    def create(self, validated_data):
        '''
        override create (reigster user)
        '''

        user = User.objects.create_user(**validated_data)
        token = Token.objects.create(user=user)
        return user


class MovieSerializer(serializers.ModelSerializer):
    """
    Movie Serializer
    """
    class Meta:
        model = Movie
        fields = ('id', 'title', 'description',
                  'number_of_ratings', 'average_rating',)


class RatingSerializer(serializers.ModelSerializer):
    """
    Rating Serializer
    """
    class Meta:
        model = Rating
        fields = ('id', 'movie', 'user', 'stars',)
