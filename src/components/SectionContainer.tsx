import { ReactNode, useState, HTMLAttributes, MouseEvent } from "react"
import classNames from "classnames/bind"
import styles from "./SectionContainer.module.scss"

const cx = classNames.bind(styles)

interface SectionContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  expansionTitle?: string
  background?: boolean
  expandable?: boolean
}

export const SectionContainer = ({
  children,
  background = false,
  expandable = true,
  expansionTitle,
  ...props
}: SectionContainerProps) => {
  const [expanded, setExpanded] = useState(true)

  const toggleExpansion = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setExpanded((expanded) => !expanded)
  }

  return (
    <div className={cx("section__wrapper")}>
      {expandable && (
        <button
          className={cx("expansion__container")}
          onClick={toggleExpansion}
          aria-expanded={expanded}
        >
          <span>
            {expanded ? "🔽" : "▶️"} {expansionTitle}
          </span>
        </button>
      )}
      <div
        className={cx(
          "section__container",
          background && "section__page",
          !expanded && "section_hidden"
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}
