import DOMPurify from 'dompurify'
import markdownit from 'markdown-it'

type MarkdownProps = { content: string }

const Markdown: React.FC<MarkdownProps> = ({ content }) => (
  <div
    dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(markdownit().render(content))
    }}
  />
)

export default Markdown
