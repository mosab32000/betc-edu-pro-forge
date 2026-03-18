import unittest
from app.services.privacy_service import redact_pii


class PrivacyServiceTests(unittest.TestCase):
    def test_redacts_email_and_phone(self):
        raw = 'Contact me at user@example.com and +1 555 123 4567'
        redacted = redact_pii(raw)
        self.assertIn('[REDACTED_EMAIL]', redacted)
        self.assertIn('[REDACTED_PHONE]', redacted)


if __name__ == '__main__':
    unittest.main()
