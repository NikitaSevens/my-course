import {QRCodeSVG} from 'qrcode.react';
import { useState } from "react";

const QrCodeGenerator = () => {

  const [value, setValue] = useState('')
  const [result, setResult] = useState('')

  const onClickHender = (event) => {
    setResult(value)
    setValue('')

  }

  const onChangeHandler = (event) => {
    setValue(event.target.value)
    setResult('')
  }

  console.log(result)
  

  return (

    <div>
      {result !== '' && <QRCodeSVG value={result} />}

      <input value={value} type="text" onChange={onChangeHandler} />
      <button type='submit' onClick={onClickHender}>Generate</button>
    </div>
  );
}

export default QrCodeGenerator