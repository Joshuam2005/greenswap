# GreenSwap

GreenSwap is a web based marketplace exclusively for the UNT community. Verified students, faculty, and staff can buy and sell secondhand items including textbooks, furniture, electronics, clothing, and more.

---

## Overview

Many students resort to Facebook Marketplace or other public platforms to buy and sell items. GreenSwap addresses this by providing a members-only marketplace restricted to solely verified UNT email holders, making every transaction safer and more trusted within the campus community.

---

## System Architecture

```
Web Browser → React Frontend → Django REST API → PostgreSQL
```

---

## Features

**Marketplace**
- Post, edit, and delete item listings (textbooks, furniture, electronics, clothing, and more)
- Browse and search listings by keyword, category, price, and condition
- Mark items as sold

**Authentication**
- UNT email verification (@my.unt.edu for students / @unt.edu for staff) required to access our platform
- Secure login, logout, and password reset

**Messaging**
- In-app messaging between buyers and sellers
- Notifications for new messages and listing activity

**User Profiles**
- Editable profile with display name, bio, and profile picture
- View your active and sold listings transacations

**Admin**
- Moderation tools to review reports and remove inappropriate listings
- User suspension for policy violations

---

## User Roles

**Buyer** : Verified UNT user browsing listings, messaging sellers, and saving favorites.

**Seller** : Verified UNT user posting items for sale, managing listings, and responding to buyers.

**Admin** : Moderates listings, reviews reports, and suspends users.

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
