import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const ArticleTitle: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const title = fileData.frontmatter?.title
  if (title) {
    return <h1 class={classNames(displayClass, "article-title")}>{title}</h1>
  } else {
    return null
  }
}

ArticleTitle.css = `
.article-title {
  margin: 2rem 0 0 0;
}
.flex-component:has(.article-title) {
  margin-top: 2rem;
}
.flex-component:has(.article-title) .article-title {
  margin-top: 0;
}
`

export default (() => ArticleTitle) satisfies QuartzComponentConstructor
