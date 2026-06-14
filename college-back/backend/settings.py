from decouple import config
from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config('DEBUG', default=False, cast=bool)

def _csv_list(value, default="*"):
    """Список из переменной вида «a,b,c» (пробелы обрезаются)."""
    raw = (value or "").strip() or default
    return [x.strip() for x in raw.split(",") if x.strip()]


ALLOWED_HOSTS = _csv_list(config("ALLOWED_HOSTS", default="*"))


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # downloaded
    'drf_yasg',
    'rest_framework',
    'corsheaders',
    'modeltranslation',
    'django_filters',
    'decouple',

    # my apps
    'apps.abouts',
    'apps.education',
    'apps.events',
    'apps.news'
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('POSTGRES_DB', default='postgres'),
        'USER': config('POSTGRES_USER', default='postgres'),
        'PASSWORD': config('POSTGRES_PASSWORD', default='password'),
        'HOST': config('POSTGRES_HOST', default='db'),
        'PORT': config('POSTGRES_PORT', default='5432'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = "en"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = False

USE_TZ = True

MODELTRANSLATION_DEFAULT_LANGUAGE = "ru"

gettext = lambda s: s
LANGUAGES = (
    ("ru", gettext("Russian")),
    ("en", gettext("English")),
    ("ky", gettext("Kyrgyz")),
)

MODELTRANSLATION_FALLBACK_LANGUAGES = {
    "default": ("ru", "en"),
    "en": ("ru",),
    "ru": ("en",),
    "ky": ("ru",),
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static') 

MEDIA_URL = '/media/' 
MEDIA_ROOT = os.path.join(BASE_DIR, 'media') 

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Через запятую: https://ваш-сайт.kg,https://www.ваш-сайт.kg
# Важно: corsheaders не принимает `*` как элемент списка, поэтому отдельно обрабатываем.
_cors_raw = config("CORS_ALLOWED_ORIGINS", default="http://localhost:3000")
if str(_cors_raw).strip() == "*":
    CORS_ALLOW_ALL_ORIGINS = True
    CORS_ALLOWED_ORIGINS = []
else:
    CORS_ALLOW_ALL_ORIGINS = False
    CORS_ALLOWED_ORIGINS = _csv_list(
        _cors_raw,
        default="http://localhost:3000",
    )

# Админка и формы по HTTPS за nginx (полные origin со схемой)
_csrf_raw = config("CSRF_TRUSTED_ORIGINS", default="")
CSRF_TRUSTED_ORIGINS = (
    _csv_list(_csrf_raw, default="") if str(_csrf_raw).strip() else []
)

# За reverse proxy (nginx) с HTTPS.
# Включается флагом USE_TLS_BEHIND_PROXY=True ТОЛЬКО когда есть валидный сертификат,
# иначе SECURE_SSL_REDIRECT уведёт сайт в бесконечный редирект по http.
if config("USE_TLS_BEHIND_PROXY", default=False, cast=bool):
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
    USE_X_FORWARDED_HOST = True
    # Куки только по HTTPS
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    # Принудительный редирект http→https (nginx обычно тоже это делает — дублируем на уровне Django)
    SECURE_SSL_REDIRECT = True
    # HSTS: год, со включением поддоменов и preload. Включать только когда HTTPS точно стабилен.
    SECURE_HSTS_SECONDS = config("SECURE_HSTS_SECONDS", default=31536000, cast=int)
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True

# Не раскрывать тип контента вопреки заголовку; clickjacking-защита
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = "DENY"

# Для отладки без SMTP: EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
EMAIL_BACKEND = config(
    'EMAIL_BACKEND',
    default='django.core.mail.backends.smtp.EmailBackend',
)
EMAIL_HOST = config('EMAIL_HOST')
EMAIL_PORT = config('EMAIL_PORT', cast=int)
EMAIL_USE_TLS = config('EMAIL_USE_TLS', default=True, cast=bool)
EMAIL_HOST_USER = config('EMAIL_HOST_USER', default='')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD', default='')
# Gmail и многие SMTP требуют, чтобы From совпадал с EMAIL_HOST_USER
DEFAULT_FROM_EMAIL = config('DEFAULT_FROM_EMAIL', default=EMAIL_HOST_USER or 'noreply@localhost')

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'backend.pagination.PageSizePagination',
    'PAGE_SIZE': 3
}