# A.R.M.A - Automated Requests Management Application

## A one-stop solution to all the event management needs of a college.

### W.I.P

<h1> Utility Classes </h1>
<h4> Use these as just like tailwindcss utility classes </h4>
<h4> Button </h4>

```
btn
outlineBtn
btn-green
btn-red
btn-yellow
```

<h1> Common Components </h1>

[<h4>InputField</h4>](https://github.com/coding-Studiovbit/ARMA/blob/master/client/src/components/InputField/InputField.tsx)

```
<InputField name='Email' onChange={()=>{}}/>
```

[<h4>Spinner</h4>](https://github.com/coding-Studiovbit/ARMA/blob/master/client/src/components/Spinner/Spinner.tsx)

```
<Spinner/>
```

[<h4>Dialog</h4>](https://github.com/coding-Studiovbit/ARMA/blob/master/client/src/components/Dialog/Dialog.tsx)
Only message

```
const [show,setShow] = useState(false)
<Dialog show={show} setShow={setShow} title='Welcome ARMA'/> 

```  

With Buttons

```
const [show,setShow] = useState(false)
<Dialog show={true} setShow={setShow} title="Welcome ARMA" >
            <button className="outlineBtn" >No</button>
            <button className="btn" >Yes</button>

        </Dialog>
```


[<h4>Table</h4>](https://github.com/coding-Studio-vbit/ARMA/blob/master/client/src/components/CustomTable.tsx)
```
<Table
    api="<backend data source url>"
    transformer={<optional function which is called on every object of the data>}/>
    headers={<headers of the table in the format {displayName:"", dataPath:"", sortable:true/false}>}
    rowsPerPage={<number of rows you want per page>}
    buttonsCount={<number of pagination buttons to display>}
    filter={filter object for the api (optional)}
 />
```
