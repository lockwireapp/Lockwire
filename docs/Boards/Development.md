---

kanban-plugin: basic

---

## Common

- [ ] License
- [ ] Patreon
- [ ] Landing
- [ ] Documentation #Documentation <br><br>- Describe protocol<br>- Copy schematics images to repo<br>- Product description
- [ ] Deployment actions #CI<br><br>- Deploy functions<br>- Deploy hosting<br>- Deploy application<br>- Deploy browser<br>- Deploy lib to NPM<br><br>[Progress bar with ORA](https://www.google.com/url?q=https://www.npmjs.com/package/ora&sa=D&source=editors&ust=1706530099466256&usg=AOvVaw0xxqa99Lu0ogMzrOev20eM) ^r15ico
- [ ] Automatic versioning #CI
- [ ] Address TODOs in code #Common


## Browser

- [ ] Restrict API key #Browser<br><br>[Credentials](https://console.cloud.google.com/apis/credentials?pli=1&rapt=AEjHL4PJm0gZV_SufDToo_9zCORCn0IRAF1W-itUJhm2BaA9xm5O4BrKP5nY8KaWzv7Rnz_xb88zhU8i5FJRXjEi-A1QVJcEHhf39cn58g7DKKqTATl7a5c&project=lockwire-9561c)
- [ ] Forbid unused auth actions #Browser  #Auth
- [ ] Introduce DI #Browser
- [ ] Redesign popup #Browser<br>- Include description
- [ ] Pass chrome store review #Browser
- [ ] Semi / automatic registration #Browser
- [ ] QR code retry button #Browser
- [ ] Implement incognito session mode #Browser
- [ ] Internationalization #Browser
- [ ] Login autofill #Browser
- [ ] Detect token revocation #Browser  #Auth<br><br>[Detect ID token revocation](https://firebase.google.com/docs/auth/admin/manage-sessions#detect_id_token_revocation)
- [ ] Verify tokens #Browser  #Auth<br><br>[Verify ID tokens](https://www.google.com/url?q=https://firebase.google.com/docs/auth/admin/verify-id-tokens%23verify_id_tokens_using_the_firebase_admin_sdk&sa=D&source=editors&ust=1706530213495097&usg=AOvVaw0RH9o8ZV7Z9wP73RctjJ7h)
- [ ] Improve error handling #Browser


## Application

- [ ] Restrict API key #App<br><br>[Credentials](https://console.cloud.google.com/apis/credentials?pli=1&rapt=AEjHL4PJm0gZV_SufDToo_9zCORCn0IRAF1W-itUJhm2BaA9xm5O4BrKP5nY8KaWzv7Rnz_xb88zhU8i5FJRXjEi-A1QVJcEHhf39cn58g7DKKqTATl7a5c&project=lockwire-9561c)
- [ ] Prod env configuration #App
- [ ] Forbid unused auth actions #App  #Auth
- [ ] Verify tokens #App   #Auth<br><br>[Verify ID tokens](https://www.google.com/url?q=https://firebase.google.com/docs/auth/admin/verify-id-tokens%23verify_id_tokens_using_the_firebase_admin_sdk&sa=D&source=editors&ust=1706530213495097&usg=AOvVaw0RH9o8ZV7Z9wP73RctjJ7h)
- [ ] Detect token revocation #App   #Auth<br><br>[Detect ID token revocation](https://firebase.google.com/docs/auth/admin/manage-sessions#detect_id_token_revocation)
- [ ] Implement vault adapter for andoid #App<br>[Kotpass](https://github.com/keemobile/kotpass)
- [ ] Persist devices in vault instead of expo-secure-store #App
- [ ] Registration screen #App
- [ ] Show error popup over QR scan #App
- [ ] Error mode in snackbar #App
- [ ] Semi / automatic registration #App
- [ ] Lazy load translations #App
- [ ] Language switch support #App
- [ ] App for IOS #App
- [ ] Implement vault adapter for IOS #App


## Backend

- [ ] Upgrade anonymous users on session connect #Backend #Transport<br><br>- Should not be possible to log in as a vault using upgraded user account
- [ ] Replace PUSH transport with websockets #Backend #Transport<br>- faster<br>- exclude third party<br>- no need for second encryption
- [ ] Write tests #Transport
- [ ] Implement key rotation #Transport
- [ ] Use separate key for PUSH encryption #Transport
- [ ] Extract routes from swagger or metadata #Backend
- [ ] Implement CSRF protection #Backend
- [ ] Set up CORS for functions to allow calls from known apps only #Backend #Auth


## In progress

- [ ] Make sure client can send any data to vault and back #Transport


## Done





%% kanban:settings
```
{"kanban-plugin":"basic","tag-colors":[{"tagKey":"#Browser","color":"rgba(8, 37, 17, 1)","backgroundColor":"rgba(43, 208, 48, 0.34)"},{"tagKey":"#Transport","color":"rgba(255, 255, 255, 1)","backgroundColor":"rgba(0, 0, 0, 0.6)"},{"tagKey":"#Backend","color":"rgba(65, 22, 157, 1)","backgroundColor":"rgba(93, 68, 150, 0.28)"},{"tagKey":"#App","color":"rgba(18, 42, 84, 1)","backgroundColor":"rgba(93, 195, 245, 0.67)"},{"tagKey":"#Auth","color":"rgba(152, 39, 28, 1)","backgroundColor":"rgba(245, 129, 93, 0.31)"},{"tagKey":"#CI","color":"rgba(7, 108, 52, 1)","backgroundColor":"rgba(62, 186, 123, 0.34)"}],"lane-width":380,"hide-tags-in-title":true,"new-card-insertion-method":"prepend-compact","new-note-folder":"Boards/Notes"}
```
%%