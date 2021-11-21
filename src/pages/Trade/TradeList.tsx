//import Tooltips from "../../lang/Tooltips"
import { gt } from "../../libs/math"
import { PriceKey } from "../../hooks/contractKeys"
import { useProtocol } from "../../data/contract/protocol"
import { useTerraAssetList } from "../../data/list"

import Table from "../../components/Table"
import Formatted from "../../components/Formatted"
//import Percent from "../../components/Percent"
import AssetItem from "../../components/AssetItem"
//import { TooltipIcon } from "../../components/Tooltip"
import useListFilter from "../../components/useListFilter"
import AssetsIdleTable from "../../containers/AssetsIdleTable"
import { TradeType } from "../../types/Types"

const TradeList = () => {
  const { getSymbol } = useProtocol()
  const list = useTerraAssetList()
  const { filter, compare, renderSearch } = useListFilter()

  const dataSource = list
    .filter(({ name, symbol }) => [name, symbol].some(filter))
    .sort(compare)
    .sort((a, b) => Number(b.symbol === "KARMA") - Number(a.symbol === "KARMA"))

  return (
    <>
      {renderSearch()}
      {!list.length ? (
        <AssetsIdleTable />
      ) : (
        <Table
          rowKey="token"
          rows={({ token }) =>
            Object.assign(
              { to: { hash: TradeType.PLEDGE, state: { token } } },
              getSymbol(token) === "KARMA" && { background: "darker" }
            )
          }
          columns={[
            {
              key: "token",
              title: "Ticker",
              render: (token) => <AssetItem token={token} />,
              width: "25%",
              bold: true,
            },
            {
              key: PriceKey.PAIR,
              title: "Terraswap Amount",
              render: (price) =>
                gt(price, 0) && <Formatted unit="UST">{price}</Formatted>,
              align: "right",
            },
          ]}
          dataSource={dataSource}
        />
      )}
    </>
  )
}

export default TradeList
