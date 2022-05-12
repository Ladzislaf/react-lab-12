import React, {useEffect} from 'react'
import {useState} from 'react'
import {useSelector} from "react-redux";

const SignUpEmailInput = ({sendButtonState, setSendButtonState, userHandler}) => {
	const [pClass, setPClass] = useState('')
	const cart = useSelector(state => state.users)

	useEffect(() => {
		if (pClass === '') setSendButtonState({...sendButtonState, email: true})
		else setSendButtonState({...sendButtonState, email: false})
	}, [pClass])

	const onEmailInput = (e) => {
		userHandler(e.target.value ,'email')

		if (e.target.value.match(/\S@\S+\.\S+/i)) {
			for (let i = 0; i < cart.length; i++)
				if (cart[i].email === e.target.value) {
					console.log('REPEATED')
					setPClass('repeated')
					return
				}
			setPClass('')
		}
		else { setPClass('incorrect') }
	}

	return (
		<div className='inputPlaceholder'>
			<input
				className={'input ' + pClass}
				type='text'
				placeholder='Email'
				onChange={onEmailInput}
			/>
			{pClass === 'incorrect' && <p style={{color:'red'}}>input correct email</p>}
			{pClass === 'repeated' && <p style={{color:'red'}}>this email is already registered</p>}
		</div>
	)
}

export default SignUpEmailInput
