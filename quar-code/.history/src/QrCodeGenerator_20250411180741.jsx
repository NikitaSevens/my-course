import {QRCodeSVG} from 'qrcode.react';
import { use, useState } from "react";

const QrCodeGenerator = () => {

  const [value, setValue] = useState('')
  const [, set] = useState(false)

  const onClickHender = (event) => {
    set(true)

  }

  const onChangeHandler = (event) => {
    setValue(event.target.value)
    set(false)
  }

  console.log()
  

  return (

    <div>
      { ? <QRCodeSVG value={value} /> : null}

      <input value={value} type="text" onChange={onChangeHandler} />
      <button type='submit' onClick={onClickHender}>Generate</button>
    </div>
  );
}

export default QrCodeGenerator