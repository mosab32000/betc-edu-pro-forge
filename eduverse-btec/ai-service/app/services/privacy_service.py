import re

EMAIL_PATTERN = re.compile(r'[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}')
PHONE_PATTERN = re.compile(r'\+?\d[\d\-\s]{7,}\d')


def redact_pii(text: str) -> str:
    text = EMAIL_PATTERN.sub('[REDACTED_EMAIL]', text)
    text = PHONE_PATTERN.sub('[REDACTED_PHONE]', text)
    return text
