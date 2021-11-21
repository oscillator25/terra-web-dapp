import { div, minus } from "../../libs/math"
import { format, formatAsset, lookupSymbol } from "../../libs/parse"
import { insertIf } from "../../libs/utils"
import { percent } from "../../libs/num"
import { useProtocol } from "../../data/contract/protocol"
import { TradeType } from "../../types/Types"
import { findValueFromLogs } from "./receiptHelpers"

export default (type: TradeType, simulatedPrice?: string) => (logs: TxLog[]) => {
  const { getSymbol } = useProtocol()
  const val = findValueFromLogs(logs)

  const offer = val("offer_amount")
  const offerAsset = val("offer_asset")
  const rtn = val("return_amount")
  const rtnAsset = val("ask_asset")
  const spread = val("spread_amount")
  const commission = val("commission_amount")
  const tax = val("tax_amount")

  const rtnSymbol = getSymbol(rtnAsset)
  const offerSymbol = getSymbol(offerAsset)

  const price = {
    [TradeType.PLEDGE]: div(offer, rtn),
    [TradeType.SWAP]: div(rtn, offer),
  }[type]

  const slippage = minus(div(price, simulatedPrice), 1)

  /* contents */
  const priceContents = {
    [TradeType.PLEDGE]: {
      title: `Price per ${lookupSymbol(rtnSymbol)}`,
      content: `${format(price)} ${lookupSymbol(offerSymbol)}`,
      children: [{ title: "Slippage", content: percent(slippage) }],
    },
    [TradeType.SWAP]: {
      title: `Price per ${lookupSymbol(offerSymbol)}`,
      content: `${format(price)} ${lookupSymbol(rtnSymbol)}`,
      children: [{ title: "Slippage", content: percent(slippage) }],
    },
  }[type]

  const rtnContents = {
    title: { [TradeType.PLEDGE]: "Bought", [TradeType.SWAP]: "Earned" }[type],
    content: formatAsset(rtn, rtnSymbol),
    children: [
      { title: "Spread", content: formatAsset(spread, rtnSymbol) },
      { title: "Commission", content: formatAsset(commission, rtnSymbol) },
      ...insertIf(rtnSymbol === "uusd", {
        title: "Tax",
        content: formatAsset(tax, rtnSymbol),
      }),
    ],
  }

  const offerContents = {
    title: { [TradeType.PLEDGE]: "Paid", [TradeType.SWAP]: "Sold" }[type],
    content: formatAsset(offer, offerSymbol),
  }

  return {
    [TradeType.PLEDGE]: [priceContents, rtnContents, offerContents],
    [TradeType.SWAP]: [priceContents, offerContents, rtnContents],
  }[type]
}
