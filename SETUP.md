# Swayam Enterprises — deployment guide (GitHub Pages)

Everything is free. You need a laptop for Part C only.

---

## Files

Upload these to the repository:

```
index.html          the website
admin.html          the admin panel
visualiser.html     the floor finish preview
setup.html          run once, then DELETE it
content.json        all editable text and photo paths
```

Do NOT upload anything in the `logos`, `logos-se` or `brand` folders, or `SETUP.md`.
Those are yours. A client finding rejected logo concepts on his own domain looks bad.

---

## Part A — Put the site online

1. github.com → **New repository**
   - Name: `swayam-enterprises`
   - **Public** (free GitHub Pages requires this)
   - Do not tick "Add a README"
2. On the empty repo page → **uploading an existing file** → drag in the five files → Commit
3. Repo → **Settings → Pages**
   - Source: **Deploy from a branch**
   - Branch: `main`, folder: `/ (root)` → Save
4. Same page → tick **Enforce HTTPS**
5. Wait 1–2 minutes. The site is live at:

```
https://YOUR-USERNAME.github.io/swayam-enterprises/
```

Open it. Placeholder photos should appear. If they do, Part A is done.

---

## Part B — Put in the real phone number

6. In the repo, open `content.json` → pencil icon
7. Change these three lines:

```json
"phone": "+919876543210",
"phoneDisplay": "+91 98765 43210",
"whatsapp": "919876543210",
```

   - `phone` — with `+91`, no spaces
   - `phoneDisplay` — how it looks on the page
   - `whatsapp` — country code first, **no `+`**, no spaces

8. Commit. Check a call button on the live site actually dials.

---

## Part C — Create the admin login (laptop)

9. GitHub → **Settings → Developer settings → Personal access tokens → Fine-grained tokens**
10. **Generate new token**
    - Repository access: **Only select repositories** → `swayam-enterprises`
    - Permissions → Repository permissions → **Contents: Read and write**
    - Expiry: the longest GitHub allows
11. Copy the token
12. Open `https://YOUR-USERNAME.github.io/swayam-enterprises/setup.html`
13. Fill in: owner, repo, branch, the token, a username for Swapnil, and a password
    - **At least 14 characters. Four unrelated words.**
14. Press **Create the login**

    This encrypts the token with the password and writes `auth.json` into the repo.

15. **Delete `setup.html` from the repository.** Repo → click the file → bin icon → Commit.

---

## Part D — First run

16. Open `https://YOUR-USERNAME.github.io/swayam-enterprises/admin.html`
17. Sign in with the username and password from step 13
18. Check the business details, upload before/after photos
19. Press **Publish to website**
20. Wait about a minute, refresh the site

---

## Part E — Hand over

Give Swapnil:
- The admin URL
- His username and password
- One line: *"Change what you want, press Publish, wait a minute, refresh."*

Keep for yourself: the GitHub account and repo. Do not give him GitHub access.

---

## Photo rules for the client

- Before and after must be the **same spot, same angle, same height**
- Take the "before" photo **before grinding starts** — once it's done it's gone
- Landscape, roughly 4:3
- The admin resizes automatically, so straight from the phone is fine

---

## Be honest with yourself about the security

The site is public, so `auth.json` can be downloaded by anyone. It is encrypted, but
someone can try passwords against it offline for as long as they like. PBKDF2 with
310,000 rounds makes each guess slow, not impossible.

**The password is the whole defence.** Four unrelated words is fine. `swayam@123` is not.

Worst case if it is broken: the token can only write to this one repository, so an
attacker could deface the website. They cannot touch your other repos, your GitHub
account, or anything else.

If you ever suspect it leaked: delete the token on GitHub. The admin stops working
immediately. Then run setup again with a new token and a new password.

---

## When something breaks

| Symptom | Cause | Fix |
|---|---|---|
| Login page says "not set up yet" | `auth.json` missing | Run Part C again |
| "Wrong username or password" and you're sure it's right | Username is case-sensitive, stored lowercase | Type it lowercase |
| Encryption error on the login page | Opened as a file, not over https | Use the github.io URL |
| "GitHub rejected the saved token" | Token expired | New token, run setup again |
| Published but site unchanged | GitHub still rebuilding | Wait a minute, hard refresh |
| Photos upload but don't appear | Publish not pressed afterwards | Press Publish |

---

## Set one calendar reminder now

The GitHub token expires. When it does, Publish stops working and nothing on screen
will explain why. Put a reminder in your phone for **one week before the expiry date**.

---

## Still outstanding

- [ ] Real phone number
- [ ] Real logo file from whoever made the flyer — the site has my recreation
- [ ] Real before/after photos
- [ ] One real client testimonial with name and company
- [ ] Trademark check on the company name before printing anything
