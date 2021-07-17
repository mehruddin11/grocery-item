import {useState, useEffect} from 'react';
import List from './list';
import Alert from './alert';
const getItemLocalStorage = () => {
  let storeItems = localStorage.getItem('item');
  if(storeItems){
    return JSON.parse(localStorage.getItem('item'));
  }
  else{
    return [];
  }
}
function App() {
  const [name, setName] =useState('');
  const [items, setItem] =useState(getItemLocalStorage());
  const [edit,isEdit] =useState(false);
  const [editId, setEditId] =useState(null);
  const [alert , setAlert] =useState({show:false, msg:'', type:''});
  const handleSubmit = (e) => {
   
    e.preventDefault();
     if(!name){
      alertFunction(true,"success","please enter a value")
     }

     else if(name && edit){
        setItem(items.map((item)=>{
          if(item.id === editId){
              return {...item, title:name}
          }
          return item
        })
        )
        setName('')
        setEditId(null)
        isEdit(false)
        alertFunction(true,"success", "item Edited")
      }
     else{
      alertFunction(true,"success" ,"item Aded")
      const data ={id:new Date().getTime().toString(), title:name}
      setItem([...items,data]);
      setName('')
     }
  }
  const alertFunction =(show = false , type:'' ,msg:'')=>{
      setAlert({show, type, msg})
    }
  const clearItems = () => {
    setItem([])
    alertFunction(true,"danger","list Cleared")
       
  }
  const RemoveSingleItem = (id) => {
    alertFunction(true,"danger", "item Removed")
    setItem(()=>{
       const newitem = items.filter((items) => items.id!==id)
        return newitem
    })
  }
  const edititem = (id) => {
    const specificitem = items.find((item)=> item.id === id)
    isEdit(true)
    setEditId(id)
    setName(specificitem.title)

  }
  useEffect(()=>{
    localStorage.setItem("item", JSON.stringify(items))
  })
  return (
    <section className='section-center'>
    <form className='grocery-form'onSubmit= {handleSubmit} >
    {
      alert.show && <Alert {...alert} timeOutFun ={alertFunction} lists ={items} />
    }
    <h3 >Grocery Items </h3>
      <div className='form-control'>
      <input  className='grocery' type = 'text' placeholder ='e.g. eggs' value = {name} 
        onChange  = {(e) => setName(e.target.value)}/>
      <button 

        className='submit-btn' 
         >
        {edit ? 'edit' :'Add'} 
        </button>
      </div>

    </form>
    
      <div className='grocery-container'>
      <List edititem = {edititem}  items = {items} RemoveSingleItem =  {RemoveSingleItem} />
      <button className='clear-btn'onClick ={clearItems} > clear All </button>
      </div>

    </section>


    )
}

export default App;
