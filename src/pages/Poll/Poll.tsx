import { useParams } from "react-router-dom"
import Page from "../../components/Page"
import { usePoll } from "../../data/gov/poll"
import { MenuKey } from "../Gov/Gov"
import PollDetails from "./PollDetails"

export enum Type {
  END = "end",
  EXECUTE = "execute",
}

const Poll = () => {
  const params = useParams()
  const id = Number(params.id)

  const poll = usePoll(id)

  return !poll ? null : (
    <Page title={MenuKey.POLL}>
      <PollDetails poll={poll} />
    </Page>
  )
}

export default Poll
