/* @noflow */

/*::
import type {Result} from "./result"
*/
import {ok, error} from "./core"

// Unfortunately flow fails to narrow down the Result union type to Error or Ok
// in as consequence of checking `result.type`. In order to workaround this
// these functions are factored out into separate file that flow isn't going to
// type check. See facebook/flow#1333 for more details on the flow bug.

export const map2 = /*::<error, a, b, value>*/
  ( make/*:(a:a, b:b) => value*/
  , a/*:Result<error, a>*/
  , b/*:Result<error, b>*/
  )/*:Result<error, value>*/ =>
  ( a.type === "Error"
  ? (a/*::, error(a.error)*/)
  : b.type === "Error"
  ? (b/*::, error(b.error)*/)
  : ok(make(a.value, b.value))
  )

export const map3 = /*::<error, a, b, c, value>*/
  ( make/*:(a:a, b:b, c:c) => value*/
  , a/*:Result<error, a>*/
  , b/*:Result<error, b>*/
  , c/*:Result<error, c>*/
  )/*:Result<error, value>*/ =>
  ( a.type === "Error"
  ? (a/*::, error(a.error)*/)
  : b.type === "Error"
  ? (b/*::, error(b.error)*/)
  : c.type === "Error"
  ? (c/*::, error(c.error)*/)
  : ok(make(a.value, b.value, c.value))
  )

export const map4 = /*::<error, a, b, c, d, value>*/
  ( make/*:(a:a, b:b, c:c, d:d) => value*/
  , a/*:Result<error, a>*/
  , b/*:Result<error, b>*/
  , c/*:Result<error, c>*/
  , d/*:Result<error, d>*/
  )/*:Result<error, value>*/ =>
  ( a.type === "Error"
  ? (a/*::, error(a.error)*/)
  : b.type === "Error"
  ? (b/*::, error(b.error)*/)
  : c.type === "Error"
  ? (c/*::, error(c.error)*/)
  : d.type === "Error"
  ? (d/*::, error(d.error)*/)
  : ok(make(a.value, b.value, c.value, d.value))
  )

export const map5 = /*::<error, a, b, c, d, e, value>*/
  ( make/*:(a:a, b:b, c:c, d:d, e:e) => value*/
  , a/*:Result<error, a>*/
  , b/*:Result<error, b>*/
  , c/*:Result<error, c>*/
  , d/*:Result<error, d>*/
  , e/*:Result<error, e>*/
  )/*:Result<error, value>*/ =>
  ( a.type === "Error"
  ? (a/*::, error(a.error)*/)
  : b.type === "Error"
  ? (b/*::, error(b.error)*/)
  : c.type === "Error"
  ? (c/*::, error(c.error)*/)
  : d.type === "Error"
  ? (d/*::, error(d.error)*/)
  : e.type === "Error"
  ? (e/*::, error(e.error)*/)
  : ok(make(a.value, b.value, c.value, d.value, e.value))
  )
