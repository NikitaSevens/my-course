import {QRCodeSVG} from 'qrcode.react';
import { use, useState } from "react";

const QrCodeGenerator = () => {

  const [value, setValue] = useState('')
  const [result, setResult] = useState(false)

  const onClickHender = (event) => {
    setResult(true)

  }

  const onChangeHandler = (event) => {
    setValue(event.target.value)
    setresult(false)
  }

  console.log(result)
  

  return (

    <div>
      {result ? <QRCodeSVG value={value} /> : null}

      <input value={value} type="text" onChange={onChangeHandler} />
      <button type='submit' onClick={onClickHender}>Generate</button>
    </div>
  );
}

export default QrCodeGenerator