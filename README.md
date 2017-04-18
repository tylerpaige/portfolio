## HOWTO
**Editing:**
Writing a new project is as simple as creating a new markdown file in the `./source/_posts/` folder, keeping in mind that the filename will be used for the URL.

Writing a new page entails writing a markdown file in a new named folder in `./source/`. The folder and filename will be the path in the URL, so for clean URLs, use `pageName/index.md`.

**Scripting**
JavaScript (annoyingly) has to be written in the theme's source folder at `./themes/default/source/js`.

Likewise, SCSS is written in `./themes/default/source/scss`.

**Build:**
`hexo generate`
`compass watch`

**Run local server:**
`hexo serve`
> https://localhost:4000

_annoyingly_ the Hexo serve command has a cache that I do not know the length of, and it is not configurable.

**Deploy with dokku** (dokku@45.55.144.111:portfolio)
`git push origin master`

## NOTES
Deployment with Dokku works because of the [Heroku static site buildpack](https://github.com/heroku/heroku-buildpack-static.git) defined in `.env`

## PLANS
- A portfolio that would work better for me would allow arbitrary insets to demonstrate code samples.
- Redesign pagination so it accounts for multiple lines of text on smaller viewports
- This page runs practically no JavaScript, but I would like if I were to demonstrate more code experiments, I would like to be able to write in ES2015+. This would require Babel or the like, which I would probably run with Gulp or Webpack. If I choose go about these technologies, I start to think that Hexo may not be worth maintaining. It is worth the energy to audit my use of Hexo to take stock of what problems it is solving.
- Introducing gulp into this system may be useful if for no other reason than having a `gulp watch` task.
- There is no image minification here, which is lame for a portfolio
- and there is no lazy loading
- Adding arbitrary HTML is really annoying in this markdown world, and frankly I frequently use arbitrary HTML. 
