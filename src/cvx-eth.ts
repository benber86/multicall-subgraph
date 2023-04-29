import { BigInt } from "@graphprotocol/graph-ts"
import {
  CvxEth,
  TokenExchange,
  AddLiquidity,
  RemoveLiquidity,
  RemoveLiquidityOne,
  CommitNewAdmin,
  NewAdmin,
  CommitNewParameters,
  NewParameters,
  RampAgamma,
  StopRampA,
  ClaimAdminFee
} from "../generated/CvxEth/CvxEth"
import { ExampleEntity } from "../generated/schema"

export function handleTokenExchange(event: TokenExchange): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.buyer = event.params.buyer
  entity.sold_id = event.params.sold_id

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.token(...)
  // - contract.coins(...)
  // - contract.A(...)
  // - contract.gamma(...)
  // - contract.fee(...)
  // - contract.get_virtual_price(...)
  // - contract.get_dy(...)
  // - contract.calc_token_amount(...)
  // - contract.calc_withdraw_one_coin(...)
  // - contract.remove_liquidity_one_coin(...)
  // - contract.remove_liquidity_one_coin(...)
  // - contract.lp_price(...)
  // - contract.price_scale(...)
  // - contract.price_oracle(...)
  // - contract.last_prices(...)
  // - contract.last_prices_timestamp(...)
  // - contract.initial_A_gamma(...)
  // - contract.future_A_gamma(...)
  // - contract.initial_A_gamma_time(...)
  // - contract.future_A_gamma_time(...)
  // - contract.allowed_extra_profit(...)
  // - contract.future_allowed_extra_profit(...)
  // - contract.fee_gamma(...)
  // - contract.future_fee_gamma(...)
  // - contract.adjustment_step(...)
  // - contract.future_adjustment_step(...)
  // - contract.ma_half_time(...)
  // - contract.future_ma_half_time(...)
  // - contract.mid_fee(...)
  // - contract.out_fee(...)
  // - contract.admin_fee(...)
  // - contract.future_mid_fee(...)
  // - contract.future_out_fee(...)
  // - contract.future_admin_fee(...)
  // - contract.balances(...)
  // - contract.D(...)
  // - contract.owner(...)
  // - contract.future_owner(...)
  // - contract.xcp_profit(...)
  // - contract.xcp_profit_a(...)
  // - contract.virtual_price(...)
  // - contract.is_killed(...)
  // - contract.kill_deadline(...)
  // - contract.transfer_ownership_deadline(...)
  // - contract.admin_actions_deadline(...)
  // - contract.admin_fee_receiver(...)
}

export function handleAddLiquidity(event: AddLiquidity): void {}

export function handleRemoveLiquidity(event: RemoveLiquidity): void {}

export function handleRemoveLiquidityOne(event: RemoveLiquidityOne): void {}

export function handleCommitNewAdmin(event: CommitNewAdmin): void {}

export function handleNewAdmin(event: NewAdmin): void {}

export function handleCommitNewParameters(event: CommitNewParameters): void {}

export function handleNewParameters(event: NewParameters): void {}

export function handleRampAgamma(event: RampAgamma): void {}

export function handleStopRampA(event: StopRampA): void {}

export function handleClaimAdminFee(event: ClaimAdminFee): void {}
