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

def send_password_reset_email(user):
    reset_link = f"{settings.FRONTEND_URL}/reset-password?token={user.password_reset_token}"
    subject = "Reset your GreenSwap password"
    message = (
        f"We received a request to reset your GreenSwap password.\n\n"
        f"Click the link below to set a new password:\n\n"
        f"{reset_link}\n\n"
        f"This link will expire in one hour "
        f"If you didn't request this, you can safely ignore this email."
    )
    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        fail_silently=False,
    )