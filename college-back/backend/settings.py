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
    'jazzmin',
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

# ─────────────────────────────────────────────
#  Панель управления сайтом (Jazzmin)
# ─────────────────────────────────────────────
JAZZMIN_SETTINGS = {
    # Заголовки
    "site_title": "АТК — Сайт",
    "site_header": "Управление сайтом",
    "site_brand": "АТК",
    "welcome_sign": "Добро пожаловать! Выберите раздел слева, чтобы добавить или изменить содержимое сайта.",
    "copyright": "Агротехнический колледж им. С. Ибраимова",

    # Логотип в шапке (если есть файл в /static/)
    "site_logo": None,
    "site_icon": None,

    # Иконка для страницы входа (Font Awesome)
    "login_logo": None,

    # Поиск: искать по каким моделям
    "search_model": ["news.News", "abouts.Graduate", "abouts.FAQ"],

    # Какое поле пользователя показывать в шапке
    "user_avatar": None,

    # Верхнее меню (ссылки для быстрого перехода на сайт)
    "topmenu_links": [
        {"name": "🌐 Открыть сайт", "url": "http://localhost:3000/ru", "new_window": True},
        {"name": "📋 Главная панели", "url": "admin:index"},
    ],

    # Меню пользователя (справа вверху)
    "usermenu_links": [
        {"name": "Сменить пароль", "url": "admin:password_change"},
    ],

    # ── Боковая навигация ──
    # Порядок и группировка разделов в сайдбаре.
    # Иконки — Font Awesome 5 Free (fas / far / fab).
    "show_sidebar": True,
    "navigation_expanded": True,
    "hide_apps": [],
    "hide_models": [],
    "order_with_respect_to": [
        # Порядок групп (app_label)
        "news",
        "abouts",
        "education",
        "auth",
    ],

    "icons": {
        # Приложения
        "news": "fas fa-newspaper",
        "abouts": "fas fa-info-circle",
        "education": "fas fa-graduation-cap",
        "auth": "fas fa-users-cog",

        # Модели news
        "news.News": "fas fa-newspaper",

        # Модели abouts
        "abouts.Graduate": "fas fa-user-graduate",
        "abouts.Images_for_multimedia": "fas fa-photo-video",
        "abouts.FAQ": "fas fa-question-circle",
        "abouts.Sertificate": "fas fa-award",
        "abouts.Contact": "fas fa-address-card",
        "abouts.Email_sending": "fas fa-envelope",
        "abouts.Lecturer": "fas fa-chalkboard-teacher",

        # Модели education
        "education.Courses_programms": "fas fa-book-open",
        "education.Admission_date": "fas fa-calendar-alt",
        "education.Schedule": "fas fa-table",
        "education.LecturePreparationMaterial": "fas fa-file-download",

        # auth
        "auth.User": "fas fa-user",
        "auth.Group": "fas fa-users",
    },

    "default_icon_parents": "fas fa-folder",
    "default_icon_children": "fas fa-circle",

    # Показывать счётчик объектов в меню
    "related_modal_active": True,

    # Кастомные CSS/JS (можно добавить свои правки поверх jazzmin)
    "custom_css": None,
    "custom_js": None,

    # Показывать UI-переключатель темы
    "show_ui_builder": False,

    # Форматы дат
    "changeform_format": "horizontal_tabs",
    "changeform_format_overrides": {
        "auth.user": "collapsible",
        "auth.group": "vertical_tabs",
    },

    # Язык (jazzmin отображает интерфейс на языке браузера; Django i18n RU)
    "language_chooser": False,
}

JAZZMIN_UI_TWEAKS = {
    # Тема Bootstrap (flatly — чистая, светлая, профессиональная)
    "navbar_small_text": False,
    "footer_small_text": False,
    "body_small_text": False,
    "brand_small_text": False,
    "brand_colour": "navbar-primary",
    "accent": "accent-primary",
    "navbar": "navbar-white navbar-light",
    "no_navbar_border": False,
    "navbar_fixed": True,        # шапка всегда сверху
    "layout_boxed": False,
    "footer_fixed": False,
    "sidebar_fixed": True,       # сайдбар не прокручивается
    "sidebar": "sidebar-dark-primary",   # тёмный сайдбар
    "sidebar_nav_small_text": False,
    "sidebar_disable_expand": False,
    "sidebar_nav_child_indent": True,
    "sidebar_nav_compact_style": False,
    "sidebar_nav_legacy_style": False,
    "sidebar_nav_flat_style": False,
    "theme": "flatly",           # светлая чистая тема
    "dark_mode_theme": None,
    "button_classes": {
        "primary": "btn-primary",
        "secondary": "btn-secondary",
        "info": "btn-outline-info",
        "warning": "btn-warning",
        "danger": "btn-danger",
        "success": "btn-success",
    },
}