import { useRouteMatch } from "react-router-dom"
import { useAddress } from "../../hooks"
import { useProtocol } from "../../data/contract/protocol"
import { useGovStaked } from "../../data/contract/normalize"
import { useTokenBalances } from "../../data/contract/normalize"
import Card from "../../components/Card"
import Summary from "../../components/Summary"
import LinkButton from "../../components/LinkButton"
import Formatted from "../../components/Formatted"
import { Submit } from "../../components/Button"
import styles from "./GovStakeInfo.module.scss"

const GovStakeInfo = () => {
  const { getToken } = useProtocol()
  const address = useAddress()
  const { contents: govStaked } = useGovStaked()
  const { contents: tokenBalances } = useTokenBalances()
  const { [getToken("KARMA")]: govStakable } = tokenBalances

  const contents = [
    {
      title: `Pledged KARMA`,
      children: <Formatted symbol="KARMA">{govStaked}</Formatted>,
    },
    {
      title: `Pledgable KARMA`,
      children: <Formatted symbol="KARMA">{govStakable}</Formatted>,
    },
  ]

  const { url } = useRouteMatch()

  const stake = {
    to: url + "/stake",
    className: styles.button,
    disabled: !address,
  }

  return (
    <Card>
      {contents.map((item, index) => (
        <article className={styles.item} key={index}>
          <Summary {...item} size="sm" />
        </article>
      ))}

      <Submit>
        <LinkButton {...stake}>Manage Pledge</LinkButton>
      </Submit>
    </Card>
  )
}

export default GovStakeInfo
