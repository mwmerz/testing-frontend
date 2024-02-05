import { ReactNode, HTMLAttributes } from "react"
import classNames from "classnames/bind"
import styles from "./Button.module.scss"

const cx = classNames.bind(styles)

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button className={cx("button__container", className)} {...props}>
      {children}
    </button>
  )
}
