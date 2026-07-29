# GreenSwap

GreenSwap is a web based marketplace exclusively for the UNT community. Verified students, faculty, and staff can buy and sell secondhand items including textbooks, furniture, electronics, clothing, and more.

**Tech Stack:** React * Django REST Framework * PostgreSQL

---

## Overview

Many students resort to Facebook Marketplace or other public platforms to buy and sell items. GreenSwap addresses this by providing a members-only marketplace restricted to solely verified UNT email holders, making every transaction safer and more trusted within the campus community.

---

## Features

- **UNT-verified registration**: accounts restricted to '@my.unt.edu'/'@unt.edu' emails
- **JWT authentication**: token-based login with password reset
- **Listings management**: create, edit, delete, and mark items as sold
- **Browse, search & filter**: find listings by keyword, category, condition, and price range
- **User profiles** - editable profiles with secure image upload
- **Ownership-based authorization** - users can only modify their own listings

---

## Security 
Security was a core focus throughout the app's development, built into each decision. 

- **Authorization checks** - users can only edit or delete listings they own
- **User enumeration defense** -login returns generic errors so attacks can't distinguish valid from invalid accounts
- **Rate limiting** - login attempts are limited to defend against brute-force attacks
- **Secure file uploads** - uploaded images are validated by actual file content (not just filename or extension), rejecting malicious files disguised.
- **Password hashing** - passwords are hashed, never stored in plaintext
- **Single-use, time-sensitive tokens** - email verification and password reset tokens are secure, single-use, and time-limited

---

## Team

**Joshua Moreno**
**Jeffrey Kachapilly** 
**Tin Nguyen** 
**Junior Cortina** 

---

## Folder Structure

```
greenswap/
├── frontend/        # React app
├── backend/         # Django REST Framework API
├── docs/            # Project documentation
├── .gitignore
└── README.md
```

---

## Documentation

All project documents are located in the `/docs` directory:

- Software Requirements Specification (SRS)
- UML Diagrams
- Design Document
- Testing Reports

---

## Git Workflow

### Rules
- **Do not push directly to main**
- All changes go through feature branches and pull requests
- Always pull the latest changes before starting a new task

---

### Starting a Task

1. Pull the latest changes from main:
```bash
git checkout main
git pull
```

2. Create a feature branch named after your task:
```bash
git checkout -b feature/task-name
```

**Branch naming examples:**
- `feature/register-form`
- `feature/login-endpoint`
- `feature/profile-picture-upload`

---

### Saving Your Work

```bash
git add .
git commit -m "Your commit message here"
git push -u origin feature/task-name
```

**Commit message examples:**
- `Add registration form (React)`
- `Fix expired token error on account activation`
- `Linked registration form to backend API`

---

### Finishing a Task

1. Push your feature branch to GitHub
2. Open a Pull Request from your feature branch into main
3. Once checked, merge into main

---

## License

This project is developed for educational purposes as part of CSCE 3444 - Software Engineering at UNT.
