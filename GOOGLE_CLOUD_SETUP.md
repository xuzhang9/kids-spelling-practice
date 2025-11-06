# Google Cloud Vision API Setup

## How to Get Your API Key

Follow these steps to set up Google Cloud Vision API for handwriting recognition:

### Step 1: Create a Google Cloud Account
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account (or create one)
3. Google offers **$300 free credit** for new users (credit card required but you won't be charged)

### Step 2: Create a New Project
1. Click on the project dropdown at the top of the page
2. Click "NEW PROJECT"
3. Name it something like "Phonics Spelling App"
4. Click "CREATE"

### Step 3: Enable Cloud Vision API
1. Go to [Cloud Vision API page](https://console.cloud.google.com/apis/library/vision.googleapis.com)
2. Make sure your project is selected
3. Click "ENABLE"

### Step 4: Create an API Key
1. Go to [Credentials page](https://console.cloud.google.com/apis/credentials)
2. Click "CREATE CREDENTIALS" at the top
3. Select "API key"
4. Copy the API key that appears (it looks like: `AIzaSyD...`)

### Step 5: (Optional) Restrict API Key
For security, you should restrict the API key:
1. Click on your newly created API key
2. Under "API restrictions":
   - Select "Restrict key"
   - Check "Cloud Vision API"
3. Under "Application restrictions" (optional):
   - Select "HTTP referrers (web sites)"
   - Add: `http://localhost:*` and `http://192.168.1.25:*`
4. Click "SAVE"

### Step 6: Add API Key to Your App
1. Open the file `.env` in your project folder
2. Replace `YOUR_API_KEY_HERE` with your actual API key:
   ```
   VITE_GOOGLE_CLOUD_API_KEY=AIzaSyD...YourActualKey...
   ```
3. Save the file
4. Restart the dev server: Stop it (Ctrl+C) and run `npm run dev` again

## Pricing Information

**Free Tier:**
- First 1,000 requests per month: FREE
- After that: $1.50 per 1,000 requests

**Estimate for your usage:**
- If your kid uses it 20 times a day = 600 requests/month = FREE
- Even at 50 times a day = 1,500 requests/month = Only $0.75/month

## Troubleshooting

**"Please set up your Google Cloud Vision API key"**
- Make sure you've added the key to the `.env` file
- Restart the dev server after adding the key

**"Failed to recognize handwriting"**
- Check your internet connection
- Verify the API is enabled in Google Cloud Console
- Check the browser console for error details

**API key not working**
- Make sure you enabled Cloud Vision API in Step 3
- Check if there are any restrictions on your API key that might be blocking requests
- Wait a few minutes after creating the key for it to activate

## Security Note

⚠️ **IMPORTANT**: The `.env` file should NOT be committed to Git (it's already in .gitignore). Your API key should remain private!

For a production app, you'd use a backend server to keep the API key secure. For personal use on your home network, this setup is fine.
