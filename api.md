## Functions

<dl>
<dt><a href="#logError">logError(error, [logType])</a></dt>
<dd><p>Logs an error to the console</p>
</dd>
<dt><a href="#catchAsync">catchAsync(asyncFunction, params)</a> ⇒ <code>function</code></dt>
<dd><p>Returns an async function wrapped in a try catch function. It
will by default log any error thrown in the async function unless
a handleError function is provided. In that case it will instead
call handleError</p>
</dd>
</dl>

<a name="logError"></a>

## logError(error, [logType])
Logs an error to the console

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| error | <code>any</code> |  | The error to log |
| [logType] | <code>string</code> | <code>&quot;&#x27;error&#x27;&quot;</code> | Determines what kind of logging method should be used to log the error |

<a name="catchAsync"></a>

## catchAsync(asyncFunction, params) ⇒ <code>function</code>
Returns an async function wrapped in a try catch function. It
will by default log any error thrown in the async function unless
a handleError function is provided. In that case it will instead
call handleError

**Kind**: global function  
**Returns**: <code>function</code> - wrapped async function  
**Export**:   

| Param | Type |
| --- | --- |
| asyncFunction | <code>any</code> | 
| params | <code>any</code> | 

