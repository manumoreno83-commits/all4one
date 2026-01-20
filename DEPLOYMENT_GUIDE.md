# All4One Fitness App - Deployment Guide

## 🚀 How to Deploy Your Fitness App

### Option 1: Netlify (Recommended - Easiest & Free)

#### Method A: Drag & Drop (No Commands)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `fitness-app` folder into the browser window
3. Wait for upload (30 seconds)
4. You'll get a URL like: `random-name-12345.netlify.app`
5. Click "Site settings" > "Change site name" to customize it (e.g., `all4one-fitness.netlify.app`)
6. Share the URL with your team!

#### Method B: Netlify CLI
```bash
# Install Netlify CLI (one time)
npm install -g netlify-cli

# Navigate to your app folder
cd c:/Users/manum/.gemini/antigravity/scratch/fitness-app

# Deploy
netlify deploy --prod

# Follow the prompts (press Enter for defaults)
```

---

### Opt 2: Vercel (Fast & Professional)

```bash
# Install Vercel CLI (one time)
npm install -g vercel

# Navigate to your app
cd c:/Users/manum/.gemini/antigravity/scratch/fitness-app

# Deploy
vercel

# Follow prompts (press Enter for defaults)
# You'll get a URL like: fitness-app.vercel.app
```

---

### Option 3: GitHub Pages (If you use Git)

1. Create a new repo on GitHub
2. Upload all files to the repo
3. Go to **Settings** > **Pages**
4. Select branch `main`, folder `root`
5. Click Save
6. Your app will be live at: `yourusername.github.io/fitness-app`

---

### Option 4: Local Network (Testing Only)

For testing on your local WiFi network:

```bash
# Navigate to the app
cd c:/Users/manum/.gemini/antigravity/scratch/fitness-app

# Start a local server
npx serve .

# Or with Python
python -m http.server 8000
```

Then share the local IP with your team (e.g., `192.168.1.100:3000`)

---

## 📱 Installing as Mobile App (PWA)

Once deployed, your app can be installed like a native app!

### On iPhone:
1. Open the app URL in **Safari**
2. Tap the **Share** button (square with arrow)
3. Scroll and tap **"Add to Home Screen"**
4. Tap "Add"
5. The app icon will appear on your home screen!

### On Android:
1. Open the app URL in **Chrome**
2. Tap the **menu** (3 dots)
3. Tap **"Install app"** or "Add to Home Screen"
4. Tap "Install"
5. Done! The app is now on your home screen

---

## ✅ What's Included

- ✅ Full offline support (Service Worker)
- ✅ Mobile-optimized interface
- ✅ PWA manifest for home screen installation
- ✅ Fixed drag & drop for routine builder
- ✅ Professional calendar view (7 days + hours)
- ✅ Touch-friendly buttons and inputs
- ✅ All features working on mobile and desktop

---

## 🐛 Troubleshooting

### PWA not installing?
- Make sure you're using **HTTPS** (all deployment platforms use HTTPS by default)
- Clear browser cache and try again
- On iPhone, MUST use Safari (not Chrome)

### Drag & drop not working?
- Click to add exercises works always
- Drag & drop works on desktop browsers
- On mobile, use the click to add feature

### App not loading?
- Check internet connection
- Clear browser cache
- Try incognito/private mode

---

## 🔑 Login Credentials (Remind your trainers)

**Director Login:**
- Miguel Angel Díaz: `197373`
- Marta Caparrós: `1111`

**Student Login:**
- Click "Google Login" button
- Select any student from the list

---

## 🎯 Next Steps After Deployment

1. **Share the URL** with your trainers via WhatsApp/Email
2. **Ask them to install** the app on their phones (follow PWA instructions above)
3. **Test all features** with real data
4. **Bookmark the deployment URL** for future updates

---

## 🔄 Updating the App

To update after making changes:

### If using Netlify Drag & Drop:
- Just drag the updated folder again to the same site

### If using Netlify/Vercel CLI:
```bash
cd c:/Users/manum/.gemini/antigravity/scratch/fitness-app
netlify deploy --prod
# or
vercel --prod
```

### If using GitHub Pages:
- Commit and push changes to GitHub
- The site will auto-update in 1-2 minutes

---

## 📞 Support

If you encounter any issues:
1. Check the browser console (F12 > Console tab)
2. Take a screenshot of any error
3. Share the error message for help

**Happy training! 🏋️‍♂️**
