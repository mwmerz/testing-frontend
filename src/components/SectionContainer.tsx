import { ReactNode, HTMLAttributes } from "react"
import classNames from "classnames/bind"
import styles from "./SectionContainer.module.scss"

const cx = classNames.bind(styles)

interface SectionContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const SectionContainer = ({
  children,
  ...props
}: SectionContainerProps) => {
  return (
    <div className={cx("section__container")} {...props}>
      {children}
    </div>
  )
}
