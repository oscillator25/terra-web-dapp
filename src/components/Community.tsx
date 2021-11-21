import medium from "./Community/medium.png"
//import discord from "./Community/discord.png"
//import telegram from "./Community/telegram.png"
import twitter from "./Community/twitter.png"
import github from "./Community/github.png"

import ExtLink from "./ExtLink"
import styles from "./Community.module.scss"

interface Props {
  network?: string
  project: string
}

const Community = ({ network, project }: Props) => {
  const community = [
    {
      href: `https://github.com/Help-Protocol`,
      src: github,
      alt: "Github",
    },
    {
      href: "https://medium.com/@onchainengineer",
      src: medium,
      alt: "Medium",
    },
    {
      href: "https://twitter.com/onchainengineer",
      src: twitter,
      alt: "Twitter",
    },
  ]

  return (
    <footer className={styles.footer}>
      <section className={styles.community}>
        {community.map(
          ({ href, src, alt }) =>
            href && (
              <ExtLink href={href} className={styles.link} key={alt}>
                <img src={src} alt={alt} width={18} height={18} />
              </ExtLink>
            )
        )}
      </section>
    </footer>
  )
}

export default Community
