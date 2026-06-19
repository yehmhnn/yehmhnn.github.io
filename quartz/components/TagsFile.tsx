import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative, FullSlug } from "../util/path"

const TagsFile = (() => {
  const Component: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
    // 1. Fetch your custom 'tags file' frontmatter array or string
    const tagsFileRaw = fileData.frontmatter?.["tags file"]

    if (!tagsFileRaw) {
      return null
    }

    // Convert to array of strings
    const tagItemsRaw = Array.isArray(tagsFileRaw) ? tagsFileRaw : [tagsFileRaw]
    const tagItems = tagItemsRaw.filter((item): item is string => typeof item === "string")

    if (tagItems.length === 0) {
      return null
    }

    const tagsFolderHref = resolveRelative(fileData.slug!, "Tags" as FullSlug)

    return (
      <div class="file-tags-container">
        <a href={tagsFolderHref} class="tags-folder-link">Tags</a>
        {": "}
        {tagItems.map((linkStr, index) => {
          // Regex to parse Obsidian [[WikiLink]] or [[WikiLink|Display Text]]
          const match = linkStr.match(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/)

          if (!match) {
            return <span key={linkStr}>{linkStr}</span> // Fallback for plain strings
          }

          const targetFile = match[1].trim()
          const displayName = match[2] ? match[2].trim() : targetFile

          // Look up matching file in allFiles to get the correct slug (e.g. content/Notes/ vs content/Tags/)
          const cleanTarget = targetFile.toLowerCase()
          const slugifiedTarget = cleanTarget.replace(/\s+/g, "-").replace(/[^\w\-]/g, "")

          const matchingFile = allFiles.find((f) => {
            const fSlug = f.slug?.toLowerCase() || ""
            const slugSegments = fSlug.split("/")
            const fSlugName = slugSegments[slugSegments.length - 1]
            if (fSlugName === slugifiedTarget) {
              return true
            }

            const fTitle = f.frontmatter?.title?.toLowerCase() || ""
            if (fTitle === cleanTarget) {
              return true
            }

            return false
          })

          let finalHref: string
          if (matchingFile) {
            finalHref = resolveRelative(fileData.slug!, matchingFile.slug!)
          } else {
            // Fallback: best effort slugification
            finalHref = resolveRelative(fileData.slug!, slugifiedTarget as FullSlug)
          }

          return (
            <span key={linkStr}>
              <a href={finalHref} class="tag-link file-tag-link">
                {displayName}
              </a>
              {index < tagItems.length - 1 ? ", " : ""}
            </span>
          )
        })}
      </div>
    )
  }

  Component.css = `
  .file-tags-container {
    font-size: 0.9rem;
    margin: 0 0 1.5rem 0;
    color: var(--darkgray);
  }
  .file-tags-container a.tags-folder-link {
    font-weight: 600;
    color: var(--secondary);
    text-decoration: none;
  }
  .file-tags-container a.tags-folder-link:hover {
    text-decoration: underline;
  }
  .file-tags-container a.file-tag-link {
    color: var(--secondary);
    text-decoration: none;
    font-weight: normal;
  }
  .file-tags-container a.file-tag-link:hover {
    text-decoration: underline;
    color: var(--tertiary);
  }
  `

  return Component
}) satisfies QuartzComponentConstructor

export default TagsFile