import traceback
from typing import Dict


def get_error_data(exception) -> Dict[str, str]:
    """Возвращает инфодмацию об ошибке."""

    data = {
        'errorMessage': str(exception),
        'errorClass': str(exception.__class__),
        'errorTrace': str(traceback.extract_tb(exception.__traceback__))
    }
    return data
