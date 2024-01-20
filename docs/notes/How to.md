# How to init project on new PC
1. Install NodeJS 18 (firebase functions requirement)
2. Install Java 11 `apt install default-jre` (firebase emulators requirement)
3. Run `npm run init`
5. Create `packages/browser/.env` with contents:
   ```
   PLASMO_CRX_ID=lcammplmplolhkbmdijpfodeflpldbaa
   PLASMO_PUBLIC_SERVER_URL=http://127.0.0.1:5001/lockwire-9561c/us-central1
   PLASMO_FIREBASE_API_KEY=<lockwire-9561c api key>
   ```
5. Install EAS CLI `npm install -g eas-cli` then login with EAS build account credentials
6. Install docker

# How to run dev environment
1. Install tmux
2. You may need to increase max watchers numbers
3. Run `npm run dev`

# How to build android app locally
1. Install android commandline tools
2. Configure ANDROID_HOME env variable and add it to .bashrc
   ```
   export ANDROID_HOME=$HOME/.android-sdk
   export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
   ```
3. Run `npm run build:dev:android:local`

# Dependencies principles
1. Always use exact package number to prevent silent minor/patch updates (No ~ and ^)
