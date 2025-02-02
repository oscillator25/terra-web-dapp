import { Fragment, useState } from "react"
import { Link } from "react-router-dom"
import { format } from "date-fns"
import { FMT } from "../constants"
import useLocalStorage from "../libs/useLocalStorage"
import { useProtocol } from "../data/contract/protocol"
import Card from "../components/Card"
import Button, { Submit } from "../components/Button"
import ExtLink from "../components/ExtLink"
import Checkbox from "../components/Checkbox"
import AssetIcon from "../components/AssetIcon"
import Modal, { useModal } from "../containers/Modal"
import styles from "./DelistModal.module.scss"

interface Props {
  tokens: string[]
  type: DelistItem["type"]
}

const LINK =
  "https://docs.mirror.finance/protocol/mirrored-assets-massets#delisting-and-migration"

const DelistModal = ({ type, ...props }: Props) => {
  const { delist, getSymbol } = useProtocol()
  const modal = useModal(true)
  const [checked, setChecked] = useState(false)
  const state = useLocalStorage<string[]>("doNotShowAgainDelist", [])
  const [doNotShowAgain, setDoNotShowAgain] = state
  const tokens = props.tokens.filter((token) => !doNotShowAgain.includes(token))

  const submit = () => {
    checked && setDoNotShowAgain([...doNotShowAgain, ...tokens])
    modal.close()
  }

  const plural = tokens.length > 1
  const pluralAsset = plural ? "assets" : "asset"
  const pluralDate = plural ? "dates" : "date"

  const contents = {
    DELIST: {
      title: "Delisting Notification",
      action: "delisted",
      when: Object.values(delist)
        .filter((item) => "poll" in item)
        .map((item, index) => {
          const { poll } = item as DefaultDelistItem
          return (
            <Fragment key={poll}>
              {!!index && ", "}
              <Link className={styles.link} to={`/gov/poll/${poll}`}>
                Poll {poll}
              </Link>
            </Fragment>
          )
        }),
      link: "How does delisting work on Mirror Protocol?",
      details: [
        `LP staking rewards will immediately stop.`,
        `Delisted ${pluralAsset} can be burned to claim UST at the last reported price.`,
        `Delisted ${pluralAsset} can be withdrawn from liquidity pools to be burnt or be used to close existing borrowed positions.`,
        `Delisted ${pluralAsset} cannot be traded, borrowed or provided to liquidity pools.`,
        `If you want to close your borrowed position immediately, make sure that you acquire a sufficient amount of mAsset before delisting.`,
      ],
    },
    STOCKEVENT: {
      title: "Stock Split / Merge Notification",
      action: "affected by a stock split / merge",
      when: "the market closes on the last trading day before the stock split / merge.",
      link: "How does stock split/merge work on Mirror Protocol?",
      details: [
        `LP staking rewards will immediately stop.`,
        `Delisted ${pluralAsset} can be burned to claim UST at the last price before stock split / merge.`,
        `Delisted ${pluralAsset} can be withdrawn from liquidity pools to be burnt or be used to close existing borrowed positions.`,
        `Delisted ${pluralAsset} cannot be traded, borrowed or provided to liquidity pools.`,
        `If you want to close your borrowed position immediately, make sure that you acquire a sufficient amount of mAsset before delisting.`,
      ],
    },
  }[type]

  return !tokens.length ? null : (
    <Modal {...modal}>
      <Card title={contents.title}>
        <div className={styles.contents}>
          <header>
            <p className={styles.p}>
              The following {pluralAsset} will be {contents.action} on the{" "}
              {pluralDate} below:
            </p>
          </header>

          <section className={styles.info}>
            <ul>
              {tokens.map((token) => (
                <li key={token}>
                  <article className={styles.asset}>
                    <AssetIcon
                      symbol={getSymbol(token)}
                      className={styles.icon}
                    />
                    {getSymbol(token)}
                    <span className={styles.date}>
                      {format(new Date(delist[token].date), FMT.MMdd)}
                    </span>
                  </article>
                </li>
              ))}
            </ul>
          </section>

          <p className={styles.p}>
            These {pluralAsset} will be <strong>DELISTED</strong> as soon as{" "}
            {contents.when}
          </p>

          <ul className={styles.list}>
            {contents.details.map((text) => (
              <li key={text}>
                <p>{text}</p>
              </li>
            ))}
          </ul>

          <footer className={styles.footer}>
            {type === "STOCKEVENT" && (
              <p className={styles.italic}>
                New {pluralAsset} will replace delisted ones on the {pluralDate}{" "}
                mentioned above.
              </p>
            )}

            <p>
              <ExtLink href={LINK} className={styles.link}>
                {contents.link}
              </ExtLink>
            </p>

            <Submit>
              <Button onClick={submit} size="lg" block>
                I understand
              </Button>
            </Submit>

            <section className={styles.checkbox}>
              <button
                type="button"
                className={styles.label}
                onClick={() => setChecked(!checked)}
              >
                <Checkbox checked={checked}>Do not show again</Checkbox>
              </button>
            </section>
          </footer>
        </div>
      </Card>
    </Modal>
  )
}

export default DelistModal
