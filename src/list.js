import {FaEdit, FaTrash} from 'react-icons/fa';
const List = ({items, RemoveSingleItem,edititem}) => {
	return (
		<div className='grocery-list'>
		{
			items.map((item)=>{
				const {title, id} = item;
;				return <article key ={id} className='grocery-item' >
				<p className='title'> {title} </p>
				<div className='btn-container'>
					<button 
						className='edit-btn' 
						type ="button"onClick = {() => edititem(id)} ><FaEdit/>
					</button>
					<button 
						className='delete-btn'
						 type ="button" onClick= {()=>RemoveSingleItem(id)} >
						 <FaTrash/> 
					</button>
				</div>
				 
				 
				</article>
			})
		}
		
		</div>

		)
}
export default List;