/* @flow */

/*::
import type {Result} from "./result"
export type {Result}
*/

class Ok <x, a> {
  /*::
  type: "Ok";
  value: a;
  isError: false;
  isOk: true;
  */
  constructor(value:a) {
    this.value = value
  }
  map /*::<b>*/(f/*:(value:a)=>b*/)/*:Result<x, b>*/ {
    return new Ok(f(this.value))
  }
  chain /*::<b>*/(then/*:(value:a) => Result<x, b>*/)/*:Result<x, b>*/ {
    return then(this.value)
  }
  withDefault(fallback/*:a*/)/*:a*/ {
    return this.value
  }
  format /*::<y>*/(f/*:(error:x) => y*/)/*:Result<y, a>*/ {
    return (this/*::, new Ok(this.value)*/)
  }
  capture /*::<y>*/ (handle/*:(error:x) => Result<y, a>*/)/*:Result<y, a>*/ {
    return (this/*::, new Ok(this.value)*/)
  }
  and /*::<b>*/(other/*:Result<x, b>*/)/*:Result<x,b>*/ {
    return other
  }
  or /*::<y>*/(other/*:Result<y, a>*/)/*:Result<y,a>*/ {
    return (this /*::, new Ok(this.value)*/)
  }
  toString()/*:string*/ {
    const string =
      ( typeof(this.value) === "string"
      ? `Ok("${this.value}")`
      : `Ok(${this.value})`
      )

    return string
  }
}
Ok.prototype.type = "Ok"
Ok.prototype.isOk  = true
Ok.prototype.isError = false

export const ok = /*::<x, a>*/
  (value/*:a*/)/*:Result<x, a>*/ =>
  new Ok(value)

class Error <x, a> {
  /*::
  type: "Error";
  error: x;
  isError: true;
  isOk: false;
  */
  constructor(error:x) {
    this.error = error
  }
  map /*::<b>*/(f/*:(value:a)=>b*/)/*:Result<x, b>*/ {
    return (this/*::, new Error(this.error)*/)
  }
  chain /*::<b>*/(then/*:(value:a) => Result<x, b>*/)/*:Result<x, b>*/ {
    return (this/*::, new Error(this.error)*/)
  }
  withDefault(fallback/*:a*/)/*:a*/ {
    return fallback
  }
  format /*::<y>*/ (f/*:(error:x) => y*/)/*:Result<y, a>*/ {
    return new Error(f(this.error))
  }
  capture /*::<y>*/ (handle/*:(error:x) => Result<y, a>*/)/*:Result<y, a>*/ {
    return handle(this.error)
  }
  and /*::<b>*/(other/*:Result<x, b>*/)/*:Result<x,b>*/ {
    return (this/*::, new Error(this.error)*/)
  }
  or /*::<y>*/(other/*:Result<y, a>*/)/*:Result<y,a>*/ {
    return other
  }
  toString()/*:string*/ {
    const string =
      ( typeof(this.error) === "string"
      ? `Error("${this.error}")`
      : `Error(${this.error})`
      )

    return string
  }
}
Error.prototype.type = "Error"
Error.prototype.isOk  = false
Error.prototype.isError = true


export const error = /*::<x, a>*/
  (error/*:x*/)/*:Result<x, a>*/ =>
  new Error(error)

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
