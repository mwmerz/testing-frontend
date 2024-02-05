import { ReactNode, useState, HTMLAttributes } from "react"
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

  return (
    <div className={cx("section__wrapper")}>
      {expandable && (
        <div
          className={cx("expansion__container")}
          onClick={(e) => {
            e.preventDefault()
            setExpanded((expanded) => !expanded)
          }}
        >
          <span>
            {expanded ? "🔽" : "▶️"} {expansionTitle && expansionTitle}
          </span>
        </div>
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
