# Yashvardhan Yadav — Portfolio

Personal portfolio website. Static frontend — no build step.

## Hosting on GitHub Pages

1. Create a new public repo on GitHub (e.g. `yash-2306.github.io` or any name like `portfolio`)
2. Push this folder's contents to the `main` branch
3. Go to **Settings → Pages → Source** → select `main` branch, root `/`
4. Your site will be live at `https://yash-2306.github.io/<repo-name>/`

## Files

| File | Purpose |
|---|---|
| `index.html` | Main page |
| `style.css` | All styles |
| `script.js` | Upload interactions, scroll effects |

## Notes

- Profile picture and certificate uploads are stored in the browser's `localStorage` — they persist for the visitor's browser session but are not uploaded anywhere (no server needed).
- To show certificates publicly, replace the upload inputs with `<img>` tags pointing to hosted image URLs.
