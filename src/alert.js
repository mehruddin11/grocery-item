import { useEffect} from 'react';
const Alert = ({type, msg, timeOutFun, lists}) => {
	useEffect (()=>{
		const timeOut = setTimeout(()=>{
			timeOutFun()
				return ()=> clearTimeout(timeOut)
			},1800)
	},[lists])
	return (
		<div>
		<p className= {`alert alert-${type}`} >{msg}</p>
		</div>

		)
}
export default Alert;