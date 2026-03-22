from rest_framework.pagination import PageNumberPagination


class PageSizePagination(PageNumberPagination):
    """Пагинация с возможностью задать размер страницы через query-параметр."""
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 20
