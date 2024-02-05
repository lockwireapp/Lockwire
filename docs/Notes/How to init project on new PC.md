05/02/2024 20:48
Status: #note
Tags: #How  

1. Install NodeJS 18 (firebase functions requirement)  
2. Install Java 11 `apt install default-jre` (firebase emulators requirement)  
3. Run `npm run init`  
5. Insert values to `packages/browser/.env`, ``, ``
6. Download from firebase console google-services.json file. Put it to: `packages/application`
7. Add values to `packages/browser/.env`, `packages/browser/.env.prod`

### How to run dev environment  
1. Install `tmux`  
2. You may need to increase max watchers numbers  
3. Run `npm run dev`  
  
### How to build android app locally  
1. Install android command line tools or Android studio
2. Configure ANDROID_HOME env variable and add it to .bashrc  
   ```  
   export ANDROID_HOME=$HOME/.android-sdk  
   export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin   
   ```
3. Run `npm run build:dev:android:local`

### How to build android app in EAS
1. Run `npm run build:dev:android:eas`

---
### References
[How to install tmux](https://github.com/tmux/tmux/wiki/Installing)
