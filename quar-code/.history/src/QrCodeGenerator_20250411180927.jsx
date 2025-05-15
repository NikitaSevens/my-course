import {QRCodeSVG} from 'qrcode.react';
import { use, useState } from "react";

const QrCodeGenerator = () => {

  const [value, setValue] = useState('')
  const [result, setResult] = useState('')

  const onClickHender = (event) => {
    setResult(true)

  }

  const onChangeHandler = (event) => {
    setValue(event.target.value)
    setResult(false)
  }

  console.log(result)
  

  return (

    <div>
      {result !== '' && <QRCodeSVG value={value} />}

      <input value={value} type="text" onChange={onChangeHandler} />
      <button type='submit' onClick={onClickHender}>Generate</button>
    </div>
  );
}

export default QrCodeGenerator