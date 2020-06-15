# MovieRater-Angular_DjangoREST

### Frontend:

- Install node packages:
  ```
  cd MovieRaterFrontend
  npm install
  ```

- Run Angular Development Server:
  ```
  ng serve
  ```
---

### Backend:

- Create Virtual Environment:
    ```
    python3 -m venv .env
    ```

- Activate Virtual Environment:
    ```
    source .env/bin/activate
    ```

- Install `requirements.txt`:
    ```
    pip install -r requirements.txt
    ```

- Run Development Server:
    ```
    python3 MovieRaterBackend/manage.py runserver 0.0.0.0:8000
    ```
    
- Create New APP:
    ```
    cd MovieRaterBackend
    django-admin startapp <APP Name>
    ```

#### Things to add to in backend server:

- Add to `INSTALLED_APPS`:
    ```python
    INSTALLED_APPS = [
    ...
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders'
    'API',
]
    ```

- Add to `MIDDLEWARE`:
    ```python
    INSTALLED_APPS = [
    ...
    'corsheaders.middleware.CorsMiddleware',
]
    ```

- Add to `settings.py`:
    ```python
    # Rest Framework
    REST_FRAMEWORK = {
        # must use brackets (tuple) or square brackets (list) here, not curly brackets (set)
        'DEFAULT_PERMISSION_CLASSES': (
            #'rest_framework.permissions.IsAuthenticated',
        ) 
    }

    CORS_ORIGIN_WHITELIST = [
        # local development servers for angular apps
        "http://localhost:4200",
        "http://127.0.0.1:4200",
    ]

    CORS_ALLOW_METHODS = [
        'DELETE',
        'GET',
        'OPTIONS',
        'PATCH',
        'POST',
        'PUT',
    ]
    ```