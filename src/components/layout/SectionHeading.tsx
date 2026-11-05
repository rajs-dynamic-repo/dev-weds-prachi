type SectionHeadingProps = {
  eyebrow?: string
  title: string
  lede?: string
  tone?: 'cream' | 'wine'
}

export function SectionHeading({ eyebrow, title, lede, tone = 'cream' }: SectionHeadingProps) {
  return (
    <header className={`heading heading--${tone}`} data-reveal="">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {lede ? <p className="lede">{lede}</p> : null}
    </header>
  )
}
