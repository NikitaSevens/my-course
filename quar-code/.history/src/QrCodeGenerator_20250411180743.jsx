import {QRCodeSVG} from 'qrcode.react';
import { use, useState } from "react";

const QrCodeGenerator = () => {

  const [value, setValue] = useState('')
  const [re, setre] = useState(false)

  const onClickHender = (event) => {
    setre(true)

  }

  const onChangeHandler = (event) => {
    setValue(event.target.value)
    setre(false)
  }

  console.log(re)
  

  return (

    <div>
      {re ? <QRCodeSVG value={value} /> : null}

      <input value={value} type="text" onChange={onChangeHandler} />
      <button type='submit' onClick={onClickHender}>Generate</button>
    </div>
  );
}

export default QrCodeGenerator