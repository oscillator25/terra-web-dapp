import Card, { CardMain } from "../../components/Card"
import AssetItem from "../../components/AssetItem"
import { useProtocol } from "../../data/contract/protocol"
import CommunityBalance from "./CommunityBalance"
import TotalPledged from "./TotalPledged"
import styles from "./GovInfo.module.scss"

const GovInfo = () => {
  const { getToken } = useProtocol()
  const token = getToken("KARMA")

  const footer = (
    <CardMain>
      <div className={styles.grid}>
        <section className={styles.wrapper}>
          <CommunityBalance />
          <TotalPledged />
        </section>
      </div>
    </CardMain>
  )

  return (
    <Card footer={footer}>
      <AssetItem token={token} size="lg" />
    </Card>
  )
}

export default GovInfo
