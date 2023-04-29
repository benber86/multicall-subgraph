import {BigInt, Address, ethereum, Bytes} from "@graphprotocol/graph-ts"
import { log } from '@graphprotocol/graph-ts'
import {Multicall, Multicall__aggregateInputCallsStruct} from "../generated/CvxEth/Multicall";
import {AddLiquidity} from "../generated/CvxEth/CvxEth";

export function handleChange(event: AddLiquidity): void {

  const multicall = Multicall.bind(Address.fromString('0xeefba1e63905ef1d7acba5a8513c70307c1ce441'))
  const callingAddress = ethereum.Value.fromAddress(Address.fromString("0xb576491f1e6e5e62f1d8f26062ee822b40b0e0d4"))

  const signatures = [
    "0x72d4f0e2", // gamma
    "0x92526c0c", // mid_fee
    "0xee8de675", // out_fee
    "0x49fe9e77", // allowed_extra_profit
    "0x72d4f0e2", // fee_gamma
    "0x083812e5", // adjustment_step
    "0x662b6274", // ma_half_time
    "0xb9e8c9fd", // price_scale
    "0x86fc88d3", // price_oracle
    "0xc146bf94", // last_prices
    "0x6112c747" // last_prices_timestamp
  ]

  let params: Array<ethereum.Tuple> = []
  for (let i=0; i<signatures.length; i++) {
    params.push(changetype<ethereum.Tuple>([callingAddress, ethereum.Value.fromBytes(Bytes.fromHexString(signatures[i]))]))
  }
  // need a low level call, can't call aggregate due to typing issues
  const callResult =
      multicall.tryCall(
          "aggregate",
          "aggregate((address,bytes)[]):(uint256,bytes[])",
          [ethereum.Value.fromTupleArray(params)]
      )
  if (callResult.reverted) {
    log.error("Multicall failed", [])
    return
  }
  const multiResults = callResult.value[1].toBytesArray()
  let intResults: Array<BigInt> = []
  for (let i=0; i<multiResults.length; i++) {
    intResults.push(ethereum.decode('uint256', multiResults[i])!.toBigInt())
  }
  log.warning("gamma: {}", [intResults[0].toString()])
  log.warning("mid_fee: {}", [intResults[1].toString()])
  log.warning("out_fee: {}", [intResults[2].toString()])
  log.warning("allowed_extra_profit: {}", [intResults[3].toString()])
  log.warning("fee_gamma: {}", [intResults[4].toString()])
  log.warning("adjustment_step: {}", [intResults[5].toString()])
  log.warning("ma_half_time: {}", [intResults[6].toString()])
  log.warning("price_scale: {}", [intResults[7].toString()])
  log.warning("price_oracle: {}", [intResults[8].toString()])
  log.warning("last_prices: {}", [intResults[9].toString()])
  log.warning("last_prices_timestamp: {}", [intResults[10].toString()])
}
