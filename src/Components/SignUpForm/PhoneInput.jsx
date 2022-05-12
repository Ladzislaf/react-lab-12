import {useState} from "react"

const PhoneInput = ({userHandler}) => {
    const [country, setCountry] = useState('')

    const checkCountry = (e) => {
        setCountry(getInputCountry(e.target))
        userHandler(e.target.value, 'phone')
    }

    return (
        <div className="inputPlaceholder">
            <input className="input" list="t" type="tel" placeholder="Phone number" onInput={onPhoneInput}
                   onChange={checkCountry}/>
            <datalist id="t">
                <option value="+375"/>
                <option value="+7"/>
                <option value="+380"/>
                <option value="+48"/>
                <option value="+370"/>
                <option value="+371"/>
            </datalist>
        </div>
    )
}

const onPhoneInput = (e) => {
	let input = e.target // e.target -> object на котором сработала функция, т.е. <input type="tel">
    let inputNumbersValue = getInputNumbersValue(input) // только числовые символы
    let country = getInputCountry(input)

    input.value = input.value.replace(/[^\d\-+() ]/, '')

    if (input.value.match(/^375$/)) input.value = '+375 '
    if (input.value.match(/^7$/)) input.value = '+7 '
    if (input.value.match(/^380$/)) input.value = '+380 '
    if (input.value.match(/^48$/)) input.value = '+48 '
    if (input.value.match(/^370$/)) input.value = '+370 '
    if (input.value.match(/^371$/)) input.value = '+371 '

    input.value = format(input, inputNumbersValue, country)

    // запрет на ввод длинной строки (для неустановленных форматов)
    if (input.value.length > 19)
        input.value = input.value.substring(0, input.value.length - 1)
}

// возвращает только введенные числа
const getInputNumbersValue = (input) => {
    return input.value.replace(/[\D]/g, '')
}

// определяет страну по первым цифрам
const getInputCountry = (input) => {
    if (input.value.match(/^\+375/)) return 'by'
    if (input.value.match(/^\+7/)) return 'ru'
    if (input.value.match(/^\+380/)) return 'ua'
    if (input.value.match(/^\+48/)) return 'pl'
    if (input.value.match(/^\+370/)) return 'lit'
    if (input.value.match(/^\+371/)) return 'lat'
    return ''
}

const format = (input, inputNumbersValue, country) => {    // форматирует введенный номер
    switch (country) {
        case 'by':
        case 'ua':
        case 'lit':
            if (inputNumbersValue.match(/^3\d\d\d\d\d\d\d\d\d\d\d/))
                input.value = "+3" + inputNumbersValue.substring(1, 3) + " (" + inputNumbersValue.substring(3, 5) +
                    ") " + inputNumbersValue.substring(5, 8) + "-" + inputNumbersValue.substring(8, 10) +
                    "-" + inputNumbersValue.substring(10, 12);
            break
        case 'ru':
            if (inputNumbersValue.match(/^7\d\d\d\d\d\d\d\d\d\d/))
                input.value = "+7 (" + inputNumbersValue.substring(1, 4) + ") " +
                    inputNumbersValue.substring(4, 7) + "-" + inputNumbersValue.substring(7, 9) +
                    "-" + inputNumbersValue.substring(9, 11);
            break
        case 'pl':
            if (inputNumbersValue.match(/^48\d\d\d\d\d\d\d\d\d/))
                input.value = "+48 " + inputNumbersValue.substring(2, 5) + "-" +
                    inputNumbersValue.substring(5, 8) + "-" + inputNumbersValue.substring(8, 11);
            break
        case 'lat':
            if (inputNumbersValue.match(/^371\d\d\d\d\d\d\d\d/))
                input.value = "+371 " + inputNumbersValue.substring(3, 7) + "-" +
                    inputNumbersValue.substring(7, 11);
            break
        default:
            break
    }
    return input.value
}

export default PhoneInput
