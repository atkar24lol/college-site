"""Утилиты для мультимедиа."""
import re
from urllib.parse import parse_qs, urlparse


def normalize_video_embed_url(url: str) -> str:
    """
    Превращает ссылку на YouTube/Vimeo в URL для iframe.
    Уже готовые embed-ссылки возвращает без изменений.
    """
    if not url or not str(url).strip():
        return ''
    u = str(url).strip()

    if 'youtube.com/embed/' in u or 'player.vimeo.com/video/' in u:
        return u

    if 'youtu.be/' in u:
        m = re.search(r'youtu\.be/([^?&/]+)', u)
        if m:
            return f'https://www.youtube.com/embed/{m.group(1)}'

    if 'youtube.com' in u and 'watch' in u:
        qs = parse_qs(urlparse(u).query)
        if qs.get('v') and qs['v'][0]:
            return f'https://www.youtube.com/embed/{qs["v"][0]}'

    if 'vimeo.com' in u and 'player.vimeo.com' not in u:
        m = re.search(r'vimeo\.com/(\d+)', u)
        if m:
            return f'https://player.vimeo.com/video/{m.group(1)}'

    return u
