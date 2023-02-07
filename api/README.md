# Task player
## 

## run project
### with docker
docker-compose up

### with conda
- `conda create --name my_env python=3`
- `conda activate my_env`
- cd app
- `python manage.py runserver`

## install dependencies
- pip install django
- pip install djangorestframework
- pip install djangorestframework-simplejwt
- pip install django-cors-headers

## login
### Auth token
- `curl -X POST -H "Content-Type: application/json" -d '{"username":"admin","password":"password123"}' http://localhost:8000/api/token/`
### Auth authorization example
`curl http://127.0.0.1:8000/tasks/ -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTQzODI4NDMxLCJqdGkiOiI3ZjU5OTdiNzE1MGQ0NjU3OWRjMmI0OTE2NzA5N2U3YiIsInVzZXJfaWQiOjF9.Ju70kdcaHKn1Qaz8H42zrOYk0Jx9kIckTn9Xx7vhikY'`


### Basic Auth
- `POST http://localhost:8000/api-auth/login`

## resources
```
{
    "tasks": "http://localhost:8000/tasks/",
    "http://localhost:8000/api/token/",
    "http://localhost:8000/users/"
}
```
## create new user
- ```docker-compose run app python manage.py createsuperuser ```

## mofify models and run
- ```docker-compose run app python manage.py makemigrations```
- ```docker-compose run app python manage.py migrate```
## packages
- `djangorestframework-simplejwt`, `conda install -c conda-forge djangorestframework_simplejwt`
- `conda install -c conda-forge django-cors-headers`
- 
