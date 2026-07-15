# IBCA – International Bank of Climate Adaptation

Premium static website for the proposed International Bank of Climate Adaptation (IBCA).

**Headquarters:** Geneva, Switzerland

## How to Deploy on GitHub Pages (Step-by-step)

1. Create a new **Public** repository on GitHub (e.g. `ibca-website`).
2. Upload **all files and folders** from this package into the root of the repository.
   - Important: include the empty file named `.nojekyll`
3. Go to the repository **Settings → Pages**.
4. Under **Source**, choose:
   - Deploy from a branch
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
5. Click **Save**.
6. Wait 1–3 minutes. Your site will be live at:
   `https://YOUR-USERNAME.github.io/REPO-NAME/`

### Custom Domain (optional)
After the site works, you can add a custom domain in Settings → Pages.  
Remember to configure the correct DNS records at your domain registrar first.

## File Structure
```
ibca-website-v2/
├── index.html
├── about.html
├── mandate.html
├── membership.html
├── governance.html
├── powers.html
├── funding.html
├── contact.html
├── .nojekyll          ← important! prevents Jekyll build errors
├── css/style.css
├── js/main.js
└── README.md
```

## Customisation Tips
- Edit any `.html` file to change text.
- Change colours in `css/style.css` (look for `:root` variables).
- Replace the logo mark by editing the `.logo-mark` div or adding an image.
