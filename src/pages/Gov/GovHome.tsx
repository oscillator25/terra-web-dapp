import { MenuKey } from "../../routes"
import Page from "../../components/Page"
import LinkButton from "../../components/LinkButton"
import ExtLinkButton from "../../components/ExtLinkButton"
import { bound } from "../../components/Boundary"
import Polls from "../Poll/Polls"
import { menu, MenuKey as GovMenuKey } from "./Gov"
import GovHomeHeader from "./GovHomeHeader"

const GovHome = () => {
  const forumLink = {
    href: "https://forum.mirror.finance",
    children: "Join Forum",
    size: "xs" as const,
    outline: true,
  }

  const createLink = {
    to: `./${menu[GovMenuKey.CREATE].path}`,
    children: GovMenuKey.CREATE,
    size: "xs" as const,
    outline: true,
  }

  return (
    <Page
      title={MenuKey.GOV}
      doc="/user-guide/getting-started/governance"
      action={
        <>
          <ExtLinkButton {...forumLink} />
          <LinkButton {...createLink} />
        </>
      }
    >
      <GovHomeHeader />
      {bound(<Polls title="Polls" />)}
    </Page>
  )
}

export default GovHome
