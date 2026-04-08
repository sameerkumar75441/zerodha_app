# Authentication UI Bug Fixes - Full Fix Plan

## Status: In Progress

1. [✅] Create this TODO.md file
2. [✅] Read backend auth files - Verified /is-auth works with cookies/token, no backend changes needed
3. [✅] Fix frontend/src/Landingpage/login/login.jsx: Hard redirects → navigate('/'), syntax fixed
4. [✅] Enhance frontend/src/context/AppContext.jsx: Added token interceptor, localStorage clear on logout, sync useEffect
5. [✅] Fix dashboard/src/components/Menu.jsx: Conditional profile/logout (token check), API logout + redirect to frontend/login
6. [✅] Verified: No other dashboard auth issues (prior search clean, TopBar etc. ok)
7. [ ] Test: Refresh pages, check localStorage sync, login/logout flows (user manual)
8. [✅] Backend already supports token/cookies
9. [ ] Complete task

**Next step after each: Update TODO.md with progress**
