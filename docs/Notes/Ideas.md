06/02/2024 16:49
Status: #note
Tags:


- Instead of storing passwords store secret algorithm of generating passwords
	- if database is stolen it's used without second part which is in your mind/qr code
	- possible to recover password outside of lockwire
- Add bank cards by scanning with camera or NFC.
	- Suggest user to stick something over the CVV for protection
- Instant access to any service
- Passwords are securely stored
- Logging everywhere
	- Where, when logged in
	- Where user cards details
	- History of password changes
- Опенсорс по запросу, для того чтобы люди могли посмотреть исходники, провести аудит. Закрыть лицензией
	- позводит видеть кто получил доступ к коду, создать обратную связь с ними, отзывать доступ

### Instant value
- Master password, registration and initial set up is delayed after installation
- installation through QR code with deep link
	- if user has no app installed - it will navigate to playmarket with registration ID
		- after user installs the app, it will automatically create an account for it, set up random master password, and process registration ID he gets from deep link
			- it may be sign up to site
	- if user has the app installed then it will be just opened by the app and processed as usual
	- QR code should be catchy so users will understand this is instant access for this app

#### Customers:
- Normal users - pay for premium
- Services and online shops which require new users - pay a subscription for qr code embedding on their site

---
### References


