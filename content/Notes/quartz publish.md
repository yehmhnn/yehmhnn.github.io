---
title: "quartz publish"
created: "2026-06-07 12:52"
tags file:
---
### New Workflow (20260607)

1. **Edit & Preview (In iCloud):** 
	- Open iCloud Quartz folder
	- run `npx quartz build --serve`
	- Look at `localhost:8080`
    
2. **Publish (On Local Laptop):** 
	- instead `npx quartz sync`
	- Open local laptop Quartz folder
	- run `./deploy.sh`.

### Metadata Normalization (20260607)

update the content metadata across `content/**/*.md`:
- Renamed all `create:` properties to `created:`
- Added YAML frontmatter to files that had none
- For files whose first line was a timestamp, set `created:` to that time
- For files whose second line contained `Tags:`, converted those tags into `tags file:` entries
- Used the default template property shape (`title`, `created`, `tags file:`) for files that had no frontmatter