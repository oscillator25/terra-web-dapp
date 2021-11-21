import { div, minus, sum, times } from "../../libs/math"
import { PriceKey } from "../../hooks/contractKeys"
import { useProtocol } from "../contract/protocol"
import { useFindPrice } from "../contract/normalize"
import { useLimitOrders } from "../contract/orders"
import { TradeType } from "../../types/Types"

export const useMyLimitOrder = () => {
  const priceKey = PriceKey.PAIR

  const { parseToken, getIsDelisted } = useProtocol()
  const { contents: orders, isLoading } = useLimitOrders()
  const findPrice = useFindPrice()

  const dataSource = orders.map((order) => {
    const { filled_offer_amount, filled_ask_amount } = order
    const { offer_asset, ask_asset } = order

    const offerToken = parseToken(offer_asset)
    const askToken = parseToken(ask_asset)

    const offerAsset = {
      ...offerToken,
      amount: minus(offerToken.amount, filled_offer_amount),
    }

    const askAsset = {
      ...askToken,
      amount: minus(askToken.amount, filled_ask_amount),
    }

    const type = offerAsset.token === "uusd" ? TradeType.PLEDGE : TradeType.SWAP

    const asset = {
      [TradeType.PLEDGE]: askAsset,
      [TradeType.SWAP]: offerAsset,
    }[type]
    const uusd = {
      [TradeType.PLEDGE]: offerAsset,
      [TradeType.SWAP]: askAsset,
    }[type]

    const limitPrice = {
      [TradeType.PLEDGE]: div(offerToken.amount, askToken.amount),
      [TradeType.SWAP]: div(askToken.amount, offerToken.amount),
    }[type]

    const terraswapPrice = {
      [TradeType.PLEDGE]: findPrice(priceKey, askAsset.token),
      [TradeType.SWAP]: findPrice(priceKey, offerAsset.token),
    }[type]

    const offerPrice = findPrice(priceKey, offerAsset.token)
    const offerValue = times(offerPrice, offerAsset.amount)

    return {
      ...order,
      token: asset.token,
      delisted: getIsDelisted(asset.token),
      type,
      asset,
      uusd,
      limitPrice,
      terraswapPrice,
      offerValue,
    }
  })

  const totalValue = sum(dataSource.map(({ offerValue }) => offerValue))

  return { totalValue, dataSource, isLoading }
}
