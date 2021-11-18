import { Routes, Route, RouteProps, Navigate } from "react-router-dom"

/* Menu */
import My from "./pages/My/My"
import Trade from "./pages/Trade/Trade"
import Borrow from "./pages/Borrow/Borrow"
import Farm from "./pages/Farm/Farm"
import Gov from "./pages/Gov/Gov"

/* Txs */
import Send from "./pages/Txs/Send"
import Mint from "./pages/Mint/Mint"
import Stake from "./pages/Stake/Stake"
import ClaimRewards from "./pages/Txs/ClaimRewards"
import ClaimUST from "./pages/Txs/ClaimUST"
import LimitOrder from "./pages/Txs/LimitOrder" // Cancel limit order

/* Informations */
import Info from "./pages/Info"
import Tool from "./pages/Tools/Tool"
import Data from "./pages/Tools/Data"
import Auth from "./pages/Auth"
import Receipt from "./pages/Tools/Receipt"

export enum MenuKey {
  MY = "My Page",
  TRADE = "Trade",
  BORROW = "Borrow",
  FARM = "Farm",
  GOV = "Govern",

  SEND = "Send",
  MINT = "Mint",
  STAKE = "Stake",
  CLAIMREWARDS = "Claim Rewards",
  CLAIMUST = "Claim UST",
  LIMIT = "Limit order",
}

export const menu: Dictionary<RouteProps> = {
  [MenuKey.MY]: { path: "/my", element: <My /> },
  [MenuKey.TRADE]: { path: "/trade", element: <Trade /> },
  [MenuKey.BORROW]: { path: "/borrow", element: <Borrow /> },
  [MenuKey.FARM]: { path: "/farm", element: <Farm /> },
  [MenuKey.GOV]: { path: "/gov", element: <Gov /> },

  [MenuKey.SEND]: { path: "/send", element: <Send /> },
  [MenuKey.MINT]: { path: "/mint", element: <Mint /> },
  [MenuKey.STAKE]: { path: "/stake", element: <Stake /> },
  [MenuKey.CLAIMREWARDS]: { path: "/claim/rewards", element: <ClaimRewards /> },
  [MenuKey.CLAIMUST]: { path: "/claim/ust", element: <ClaimUST /> },
  [MenuKey.LIMIT]: { path: "/limit", element: <LimitOrder /> },

  info: { path: "/info", element: <Info /> },
  tool: { path: "/tool", element: <Tool /> },
  data: { path: "/data", element: <Data /> },
  auth: { path: "/auth", element: <Auth /> },
  receipt: { path: "/receipt", element: <Receipt /> },
}

export const getPath = (key: MenuKey) => menu[key].path as string

export default (routes: Dictionary<RouteProps> = menu, path: string = "") => (
  <Routes>
    {Object.entries(routes).map(([key, route]) => (
      <Route {...route} path={path + route.path} key={key} />
    ))}

    <Navigate to="/trade" />
  </Routes>
)
