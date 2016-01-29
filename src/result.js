/* @flow */

/*::
import type {Result} from "./result"
export type {Result}
*/
import {ok, error} from "./core"
export {map2, map3, map4, map5} from "./result.flowless"

export {ok, error}

export const withDefault = /*::<x, a>*/
  (fallback/*:a*/, result/*:Result<x, a>*/)/*:a*/ =>
  result.withDefault(fallback)

export const map = /*::<x, a, b>*/
  (f/*:(value:a) => b*/, result/*:Result<x,a>*/)/*:Result<x,b>*/ =>
  result.map(f)

export const chain = /*::<x, a, b>*/
  (result/*:Result<x, a>*/, then/*:(value:a) => Result<x, b>*/)/*:Result<x, b>*/ =>
  result.chain(then)

export const format = /*::<x, y, a>*/
  (f/*:(error:x) => y*/, result/*:Result<x, a>*/)/*:Result<y, a>*/ =>
  result.format(f)

export const capture = /*::<x, y, a>*/
  (result/*:Result<x, a>*/, handle/*:(error:x) => Result<y, a>*/)/*:Result<y, a>*/ =>
  result.capture(handle)


export const and = /*::<x, a, b>*/
  (left/*:Result<x, a>*/, right/*:Result<x, b>*/)/*:Result<x, b>*/ =>
  left.and(right)

export const or = /*::<x, y, a>*/
  (left/*:Result<x, a>*/, right/*:Result<y, a>*/)/*:Result<y, a>*/ =>
  left.or(right)
