import { useNetwork } from "../hooks"
import Community from "../components/Community"
import DocsLink from "./DocsLink"

const Footer = () => {
  const { name } = useNetwork()
  return (
    <>
      <DocsLink />
      <hr />
      <Community network={name} project="help-station" />
    </>
  )
}

export default Footer
