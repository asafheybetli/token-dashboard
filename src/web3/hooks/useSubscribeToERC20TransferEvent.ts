import { useWeb3React } from "@web3-react/core"
import { BigNumber } from "@ethersproject/bignumber"
import { Token } from "../../enums/token"
import { useSubscribeToContractEvent } from "./useSubscribeToContractEvent"
import { useTokenBalance } from "../../hooks/useTokenBalance"
import { isSameETHAddress } from "../../utils/isSameETHAddress"
import { useTokenState } from "../../hooks/useTokenState"
import { useToken } from "../../hooks/useToken"
import { useCallback } from "react"

export const useSubscribeToERC20TransferEvent = (token: Token) => {
  const { account } = useWeb3React()
  const { contract } = useToken(token)
  const currentTokenBalance = useTokenBalance(token)

  const { setTokenBalance } = useTokenState()

  const balanceUpdater = useCallback(
    (from, to, amount) => {
      console.log(`Received ${token}.Transfer event`, {
        from,
        to,
        amount: amount.toString(),
      })

      // transfer in - increase token balance
      if (isSameETHAddress(to, account!)) {
        setTokenBalance(
          token,
          BigNumber.from(currentTokenBalance)
            .add(BigNumber.from(amount))
            .toString()
        )

        // transfer out - decrease token balance
      } else if (isSameETHAddress(from, account!)) {
        setTokenBalance(
          token,
          BigNumber.from(currentTokenBalance)
            .sub(BigNumber.from(amount))
            .toString()
        )
      }
    },
    [account, currentTokenBalance, setTokenBalance]
  )

  // @ts-ignore
  useSubscribeToContractEvent(contract, "Transfer", balanceUpdater)
}
