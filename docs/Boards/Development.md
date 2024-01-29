---

kanban-plugin: basic

---

## Business

- [ ] Documentation<br><br>- Describe protocol<br>- Copy schematics images to repo
- [ ] Landing
- [ ] Patreon
- [ ] Product description


## Product

- [ ] Deployment actions #CI<br><br>- Deploy functions<br>- Deploy hosting<br>- Deploy application<br>- Deploy browser<br>- Deploy lib to NPM<br><br>[Progress bar with ORA](https://www.google.com/url?q=https://www.npmjs.com/package/ora&sa=D&source=editors&ust=1706530099466256&usg=AOvVaw0xxqa99Lu0ogMzrOev20eM) ^r15ico
- [ ] Automatic versioning #CI
- [ ] Address TODOs in code #Common
- [ ] Verify tokens #Auth<br><br>[Verify ID tokens](https://www.google.com/url?q=https://firebase.google.com/docs/auth/admin/verify-id-tokens%23verify_id_tokens_using_the_firebase_admin_sdk&sa=D&source=editors&ust=1706530213495097&usg=AOvVaw0RH9o8ZV7Z9wP73RctjJ7h)
- [ ] Detect token revocation #Auth<br><br>[Detect ID token revocation](https://firebase.google.com/docs/auth/admin/manage-sessions#detect_id_token_revocation)
- [ ] Set up CORS for functions to allow calls from known apps only #Auth
- [ ] Implement key rotation #Transport
- [ ] Write tests #Transport
- [ ] Improve error handling #Browser
- [ ] Pass store review #Browser
- [ ] Remove firebase, auth manually #Browser<br><br>[Firebase REST API](https://firebase.google.com/docs/reference/rest/auth#section-sign-in-anonymously)
- [ ] Login autofill #Browser
- [ ] Semi / automatic registration #Browser
- [ ] Internationalization #Browser
- [ ] Retry qr code, error handling #Browser
- [ ] Implement incognito session mode #Browser
- [ ] Use separate key for PUSH encryption #Backend
- [ ] Extract routes from swagger or metadata #Backend
- [ ] Implement CSRF protection #Backend
- [ ] App #App #Android
- [ ] App #App  #IOS
- [ ] Semi / automatic registration #App
- [ ] Persist devices in vault instead of expo-secure-store #App
- [ ] Vault adapter #App
- [ ] Language switch support #App
- [ ] Lazy load translations #App


## In progress

- [ ] Make sure client can send any data to vault and back #Transport


## Done





%% kanban:settings
```
{"kanban-plugin":"basic","tag-colors":[{"tagKey":"#Browser","color":"rgba(8, 37, 17, 1)","backgroundColor":"rgba(43, 208, 48, 0.34)"},{"tagKey":"#Transport","color":"rgba(255, 255, 255, 1)","backgroundColor":"rgba(0, 0, 0, 0.6)"},{"tagKey":"#Backend","color":"rgba(65, 22, 157, 1)","backgroundColor":"rgba(93, 68, 150, 0.28)"},{"tagKey":"#App","color":"rgba(18, 42, 84, 1)","backgroundColor":"rgba(93, 195, 245, 0.67)"},{"tagKey":"#Auth","color":"rgba(152, 39, 28, 1)","backgroundColor":"rgba(245, 129, 93, 0.31)"},{"tagKey":"#CI","color":"rgba(7, 108, 52, 1)","backgroundColor":"rgba(62, 186, 123, 0.34)"}],"lane-width":380,"hide-tags-in-title":true,"new-card-insertion-method":"prepend-compact","new-note-folder":"Boards/Notes"}
```
%%