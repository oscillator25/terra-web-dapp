import { RouteProps, useParams } from "react-router-dom"
import Page from "../../components/Page"
import CancelOrderForm from "../../forms/CancelOrderForm"
import { useLimitOrder } from "../../data/contract/order"
import routes from "../../routes"

export enum MenuKey {
  CANCEL = "Cancel order",
}

const CancelOrder = () => {
  const { id } = useParams()

  const parsed = useLimitOrder(Number(id))

  return !parsed ? null : (
    <Page>
      <CancelOrderForm order={parsed} />
    </Page>
  )
}

export const menu: Record<MenuKey, RouteProps> = {
  [MenuKey.CANCEL]: { path: "/:id", element: <CancelOrder /> },
}

const LimitOrder = () => {
  return routes(menu)
}

export default LimitOrder
