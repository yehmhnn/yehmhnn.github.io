import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    // Component.PageTitle(),
    // Component.DesktopOnly(Component.Spacer()),
    // Component.Darkmode(),
  ],
  afterBody: [],
  footer: Component.Footer({
    links: {
      // GitHub: "https://github.com/jackyzha0/quartz",
      // "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      condition: (page) => page.fileData.slug !== "index",
      component: Component.Breadcrumbs(),
    }),
    Component.Flex({
      components: [
        { Component: Component.ArticleTitle() },
        { Component: Component.Darkmode() },
      ],
      direction: "row",
      gap: "1rem",
    }),
    Component.ContentMeta(),
    // Component.TagList(),
    Component.TagsFile(),
  ],
  left: [
    Component.MobileOnly(Component.Spacer()),
    Component.DesktopOnly(Component.TableOfContents()),
  ],
  right: [
    // Component.Graph(),
    Component.Backlinks(),
  ],
  afterBody: [
    Component.ConditionalRender({
      condition: (page) => page.fileData.slug === "index",
      component: Component.RecentNotes({
        title: "Recent Activity",
        limit: 10,
        showTags: false,
        linkToMore: "Notes/",
        // --- ADD THE FILTER LINE BELOW ---
        filter: (f) => f.filePath?.startsWith("content/Notes/") ?? false,
      })
    }),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.MobileOnly(Component.Spacer()),
  ],
  right: [],
}
