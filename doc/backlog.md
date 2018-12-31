## priority before submit

- cleared

## after summer

### priority
- redirect from not existing post leads to undefined category, redirect to error page so bug is never encountered
- view count for forumpost
- prettify forumpostlink
- backend validator for number type params (getters mostly)
- answer to feedback by cleaning code style
### optional
- update libraries
- paging for comments
- likes for forumpost
- deal with desync coming from changing category
- update node (requires updating bcrypt)
- follow posts by adding bookmark section to profile page
- save settings for user in db to carry settings, custom paging, theme, profile
- make logo in forumpost listing an image link
- change color when mouse hovering over linkable shit
- mobile view
- deploy via docker
- insert pictures, gifs to comments
- db init into script
- edit category (low prio due to little editable things)
- lint
- update forumdb.png. not so important since \d in psql describes well relations
- convert viewed posttime to local time
- have categories visible/writable only for mods
- find nicer form components to make validation more clear and simpler
- sort by views/popularity
- improve personal page (exact way to be defined, partially done with other tasks)
- make background fancier
- tests, proptypes
- PART1 mod lock accounts...have to re-model registration as well for this to be of any value. Right now password only exists to prevent impersonation for common users
- PART2 edit currently only changes params according to rights, should add reporting for attempting to change values that are not allowed to be changed.