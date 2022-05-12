import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";

const SignInForm = () => {
    const [userData, setUserData] = useState({email: '', pass: ''})
    // true/true - send button disabled
    const [sendButtonState, setSendButtonState] = useState({email: true, pass: true})
    const cart = useSelector(state => state.users)

    useEffect(() => {
        setSendButtonState({...sendButtonState, email: !userData.email})
    }, [userData.email])

    useEffect(() => {
        setSendButtonState({...sendButtonState, pass: !userData.pass})
    }, [userData.pass])

    const onSubmitHandler = (e) => {
        e.preventDefault()
        document.getElementById('signIn').reset()
        setSendButtonState({email: true, pass: true})

        for (let i = 0; i < cart.length; i++)
            if (cart[i].email === userData.email && cart[i].pass === userData.pass) {
                console.log(cart[i], 'найденный аккаунт')
                alert('You have successfully authorised!')
                return
            }
        alert('Incorrect email or password!')
    }

    return (
        <form id={'signIn'}>
            <h3>Sign in</h3>
            <p><input className={'inp'}
                      type="email"
                      placeholder={'enter email'}
                      onChange={(e) => setUserData({...userData, email: e.target.value})}
                      required={true}/></p>
            <p><input className={'inp'}
                      type="password"
                      placeholder={'enter password'}
                      onChange={(e) => setUserData({...userData, pass: e.target.value})}
                      required={true}/></p>
            <p><button className={'btn'}
                       onClick={onSubmitHandler}
                       disabled={sendButtonState.email || sendButtonState.pass}
            >submit</button></p>
        </form>
    );
};

export default SignInForm;