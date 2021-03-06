import FixtureAPI from '../../App/Services/FixtureApi'
import { put } from 'redux-saga/effects'
import { getAccount, updateAccount } from '../../App/Sagas/AccountSagas'
import AccountActions from '../../App/Redux/AccountRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getAccount(1)
  const step = stepper(getAccount(FixtureAPI))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  const account = require('../../App/Fixtures/getAccount.json')
  expect(step(response)).toEqual(put(AccountActions.accountSuccess(account)))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getAccount(FixtureAPI))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AccountActions.accountFailure('WRONG')))
})

test('update success path', () => {
  const response = FixtureAPI.updateAccount({id: 1})
  const step = stepper(updateAccount(FixtureAPI, {id: 1}))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AccountActions.accountUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateAccount(FixtureAPI, {id: 1}))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AccountActions.accountFailure('WRONG')))
})
