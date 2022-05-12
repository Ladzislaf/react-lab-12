import React, {useEffect, useState} from 'react'
import PhoneInput from './PhoneInput'
import SignUpEmailInput from './SignUpEmailInput'
import SignUpPasswordInput from './SignUpPasswordInput'

import './style/SignUpForm.css'
import {useDispatch} from "react-redux";

const SignUpForm = () => {
    const [sendButtonState, setSendButtonState] = useState({email: false, pass: false})
    const [userInfo, setUserInfo] = useState({})

    const dispatch = useDispatch()

    const days = [], years = []
    for (let i = 1; i < 32; i++) days.push(i)
    for (let i = 2022; i > 1950; i--) years.push(i)

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ]

    const allDays = days.map((day) => {
        return <option key={day}>{day}</option>
    })

    const allYears = years.map((year) => {
        return <option key={year}>{year}</option>
    })

    const allMonths = months.map((month, index) => {
        return <option key={index}>{month}</option>
    })

    const userHandler = (value, field) => {
        switch (field) {
            case 'pass': setUserInfo({...userInfo, pass: value}); break;
            case 'email': setUserInfo({...userInfo, email: value}); break;
            case 'name': setUserInfo({...userInfo, name: value}); break;
            case 'surname': setUserInfo({...userInfo, surname: value}); break;
            case 'lastname': setUserInfo({...userInfo, lastname: value}); break;
            case 'day': setUserInfo({...userInfo, day: value}); break;
            case 'month': setUserInfo({...userInfo, month: value}); break;
            case 'year': setUserInfo({...userInfo, year: value}); break;
            case 'phone': setUserInfo({...userInfo, phone: value}); break;
            default: break;
        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        document.getElementById('signUp').reset()
        dispatch({type: 'ADD_USER', payload: userInfo})
        alert('you have successfully registered!')
    }

    return (
        <>
            <form id={'signUp'}>
                <h2>Registration form</h2>
                <SignUpEmailInput userHandler={userHandler} sendButtonState={sendButtonState} setSendButtonState={setSendButtonState}/>
                <SignUpPasswordInput userHandler={userHandler} sendButtonState={sendButtonState} setSendButtonState={setSendButtonState}/>
                <input className={'input'} placeholder={'name'} onChange={(e) => userHandler(e.target.value, 'name')}/><br/>
                <input className={'input'} placeholder={'surname'} onChange={(e) => userHandler(e.target.value, 'surname')}/><br/>
                <input className={'input'} placeholder={'second name'} onChange={(e) => userHandler(e.target.value, 'lastname')}/><br/>
                <select className={'sel'} onChange={(e) => userHandler(e.target.value, 'day')}>{allDays}</select>
                <select className={'sel'} onChange={(e) => userHandler(e.target.value, 'month')}>{allMonths}</select>
                <select className={'sel'} onChange={(e) => userHandler(e.target.value, 'year')}>{allYears}</select>
                <PhoneInput userHandler={userHandler}/>
                <input type={'submit'} className={'send'} onClick={onSubmitHandler} value={'send'} disabled={!sendButtonState.email || !sendButtonState.pass}/>
            </form>
        </>
    )
}

export default SignUpForm