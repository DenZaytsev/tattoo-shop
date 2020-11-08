from django.http import JsonResponse
from rest_framework.views import APIView

from core.exeptions import get_error_data


class BaseView(APIView):

    def dispatch(self, request, *args, **kwargs):
        try:
            response = super().dispatch(request, *args, **kwargs)
        except Exception as e:
            return self._response(get_error_data(e), status=400)

        if isinstance(response, (dict, list)):
            return self._response(response)
        else:
            return response

    @staticmethod
    def _response(data, *, status=200):
        return JsonResponse(
            data=data,
            status=status,
        )
