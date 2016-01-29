/* @flow */

/*::
import type {Result} from "./result"
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

export const ok = /*::<x, a>*/
  (value/*:a*/)/*:Result<x, a>*/ =>
  new Ok(value)
