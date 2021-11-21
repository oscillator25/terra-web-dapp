import Tooltips from "../../lang/Tooltips"
import { useTotalStaked } from "../../data/gov/store"
import Summary from "../../components/Summary"
import Formatted from "../../components/Formatted"

const TotalPledged = () => {
  const totalPledged = useTotalStaked()

  return (
    <Summary
      title="Total Pledged"
      tooltip={Tooltips.Gov.TotalPledged}
      size="sm"
    >
      <Formatted symbol="KARMA" integer>
        {totalPledged}
      </Formatted>
    </Summary>
  )
}

export default TotalPledged
