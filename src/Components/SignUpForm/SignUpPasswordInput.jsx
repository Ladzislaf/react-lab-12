import React, { useEffect } from 'react'
import { useState } from 'react'

const SignUpPasswordInput = ({sendButtonState, setSendButtonState, userHandler}) => {
	const [match, setMatch] = useState({ style: '', value: '' })
	const [passValues, setPassValues] = useState({ first: '', second: '' })
	const [security, setSecurity] = useState(1)

	const onPass1Input = (e) => {
		setPassValues({ ...passValues, first: e.target.value })
	}

	const onPass2Input = (e) => {
		setPassValues({ ...passValues, second: e.target.value })
	}

	// activate send button on form
	useEffect(() => {
		if(match.value === 'match') {
			setSendButtonState({...sendButtonState, pass: true})
			userHandler(passValues.first, 'pass')
		}
		else
			setSendButtonState({...sendButtonState, pass: false})
	}, [match])

	useEffect(() => {
		if (passValues.first === '') setMatch({ style: '', value: '' })
		else if (passValues.first === passValues.second) setMatch({ style: 'match', value: 'match' })
		else setMatch({ style: 'no_match', value: 'no match' })

		let protectionLevel = 0, text = ''

		if(passValues.first.match(/\d/)) protectionLevel++
		if(passValues.first.match(/[a-z]/)) protectionLevel++
		if(passValues.first.match(/[A-Z]/)) protectionLevel++
		if(passValues.first.match(/[@!~#$%^&*()\-_=+':";?<>/\\]/)) protectionLevel++

		switch(protectionLevel) {
			case 1: text = 'protection level: low'
				break
			case 2: text = 'protection level: normal'
				break
			case 3: text = 'protection level: high'
				break
			case 4: text = 'protection level: ultra high'
				break
			default:
		}

		setSecurity(protectionLevel)
	}, [passValues])

	return (
		<div className='inputPlaceholder'>
			<input
				className='input'
				type='Password'
				placeholder='password'
				onChange={onPass1Input}
			/>
			<input
				className='input'
				type='Password'
				placeholder='confirm password'
				onChange={onPass2Input}
			/>
			{match.value !== 'match' &&
				<p className={match.style}>{match.value}</p>
			}
			<progress max='4' value={security}></progress>
		</div>
	)
}

export default SignUpPasswordInput
