import { CSSProperties } from "react"
import { NavLink } from "react-router-dom"
import classNames from "classnames/bind"
import Icon from "./Icon"
import styles from "./Menu.module.scss"

const cx = classNames.bind(styles)

interface MenuItem {
  icon: IconNames
  attrs: { to: string; children: string }
  style: CSSProperties
}

const Menu = ({ list }: { list: MenuItem[] }) => {
  return (
    <ul className={styles.menu}>
      {list.map(({ icon, attrs, style }) => {
        return (
          <li className={styles.item} style={style} key={attrs.children}>
            <NavLink
              {...attrs}
              className={({ isActive }) =>
                cx(styles.link, { active: isActive })
              }
            >
              <div className={styles.wrapper}>
                <Icon name={icon} className={styles.icon} />
                {attrs.children}
              </div>
            </NavLink>
          </li>
        )
      })}
    </ul>
  )
}

export default Menu
