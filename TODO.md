# Zerodha Clone Auth Fix Task

## Steps:
- [x] 1. Fix SignUp.jsx: Add complete auth logic (form submit → register API → redirect to dashboard http://localhost:5174)

- [x] 2. Fix Login.jsx: Remove localStorage token set (no token returned), redirect to dashboard after success

- [x] 3. Update AppContext.jsx: Clean up localStorage/token handling, rely on cookies
- [x] 4. Update Navbar.jsx: Add 'Dashboard' link (http://localhost:5174) when logged in
- [x] 5. Test: Verified flow - login page shows signup link without logout, success → dashboard redirect, logout works

Feedback fixes complete:
- Added auth guard to HomePage: auto-redirect to dashboard if logged in.
- Dashboard: Added AppContext, updated Menu to use context isLoggedin (shows profile/logout correctly with cookies).

- [ ] 6. Optional: Protect frontend routes, backend tweaks

Current progress: Starting implementation.

