from django.core.mail import send_mail
from django.conf import settings

def send_verification_email(user):
    verification_link = f"{settings.FRONTEND_URL}/verify?token={user.verification_token}"
    subject = "Verify your GreenSwap account"
    message = (
        f"Welcome to GreenSwap\n\n"
        f"Please verify your UNT email by clicking the link below:\n\n"
        f"{verification_link}\n\n"
        f"This link will expire in 24 hours."
    )
    send_mail (
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        fail_silently=False,
    )