import { useParams } from "react-router-dom"
import { useGetVoted } from "../../data/gov/vote"
import { Poll } from "../../data/gov/poll"
import { Submit } from "../../components/Button"
import LinkButton from "../../components/LinkButton"

const VoteLink = ({ id, end_time }: Poll) => {
  const params = useParams()
  const getVoted = useGetVoted()
  const voted = getVoted(id)

  const end = end_time * 1000 < Date.now()

  return params.id && !end ? (
    <Submit>
      <LinkButton to="./vote" disabled={voted}>
        {voted ? "Voted" : "Vote"}
      </LinkButton>
    </Submit>
  ) : null
}

export default VoteLink
