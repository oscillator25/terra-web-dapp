import { RouteProps } from "react-router-dom"
import routes from "../../routes"
import Poll from "../Poll/Poll"
import CreatePoll from "../Poll/CreatePoll"
import Vote from "../Poll/Vote"
import ClaimVotingReward from "../Poll/ClaimVotingReward"
import GovHome from "./GovHome"
import GovStake from "./GovStake"

export enum MenuKey {
  INDEX = "Gov",
  STAKE = "Stake",
  CREATE = "Create Poll",
  POLL = "Poll details",
  VOTE = "Vote",
  CLAIM = "Claim",
}

export const menu: Record<MenuKey, RouteProps> = {
  [MenuKey.INDEX]: { path: "/", element: <GovHome /> },
  [MenuKey.STAKE]: { path: "/stake", element: <GovStake /> },
  [MenuKey.CREATE]: { path: "/poll/create", element: <CreatePoll /> },
  [MenuKey.VOTE]: { path: "/poll/:id/vote", element: <Vote /> },
  [MenuKey.CLAIM]: { path: "/poll/:id/claim", element: <ClaimVotingReward /> },
  [MenuKey.POLL]: { path: "/poll/:id", element: <Poll /> },
}

const Gov = () => {
  return <>{routes(menu)}</>
}

export default Gov
