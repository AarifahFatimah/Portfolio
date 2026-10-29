# Personal Portfolio Website

My personal portfolio website, made for **Assignment-1** of **Full Stack Development (SPC0701CS)**.


---

## How to open it

Just open `index.html` in a browser. There is nothing to install.

---

## Files in this project

```
index.html        the whole website (all the sections)
css/style.css     my own CSS
js/main.js        my own JavaScript
assets/img/       my photo goes here

```

---

## Technologies used

| Technology | What I used it for |
|---|---|
| HTML5 | Semantic tags, lists, table, images, links, contact form |
| CSS3 | Selectors, box model, colours, typography, positioning, Flexbox, Grid, media queries |
| Bootstrap 5 | Navbar, grid, cards, buttons, forms, table, alerts |
| JavaScript ES6+ | Variables, functions, arrays, objects, loops, conditions |
| DOM & Events | Building the cards, click and submit events |
| Validation | Checking the contact form before submitting |



### About the design

I used Bootstrap for the layout but I did not want my portfolio to look like the
default Bootstrap theme. So I wrote my own CSS on top of it using thick black
borders and a hard shadow with no blur, which makes the boxes look like they are
stacked on the page. The colours are purple and lilac, and they are kept in CSS
variables at the top of `style.css` so I can change them in one place.

The fonts are **Archivo Black** for the headings and **Space Grotesk** for the
text, both from Google Fonts.

---

## Sections

1. **Home** - my name, a short introduction and my photo
2. **About** - a paragraph about me and a table of my personal details
3. **Education** - a table with my qualifications, plus a list of my subjects
4. **Skills** - cards showing the technologies I know
5. **Projects** - project cards with filter buttons
6. **Achievements** - my achievements and certificates
7. **Contact** - my details and a contact form

---

## JavaScript features

The assignment asked for at least two interactive features. I made three:

1. **Dark mode button** - the button in the navbar changes the page between light
   and dark. The choice is saved in `localStorage`, so it stays the same when the
   page is opened again.
2. **Project filter** - the All / Web / Java / Python buttons show only the projects
   of that type. If no project matches, a Bootstrap alert is shown.
3. **Contact form validation** - each field is checked and a red message appears
   under it if something is wrong. A green success alert appears when everything
   is correct.

### Validation rules

| Field | Rule |
|---|---|
| Name | Cannot be empty, at least 3 letters |
| Email | Cannot be empty, must look like `name@example.com` |
| Phone | Cannot be empty, must be exactly 10 digits |
| Subject | One option must be selected |
| Message | Cannot be empty, at least 10 characters |



---

## Accessibility

- A skip link at the top for keyboard users
- `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` semantic tags
- A `<label>` for every input in the form
- `alt` text on the image
- `scope` and `<caption>` on the education table
- `role="alert"` on the error messages so a screen reader reads them out

---

