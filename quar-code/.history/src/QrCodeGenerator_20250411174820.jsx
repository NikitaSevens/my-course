import {QRCodeSVG} from 'qrcode.react';
import { use, useState } from "react";

const QrCodeGenerator = () => {

  const [ar] = useState('hello')

  const onClickHender = (event) => {
  
  }

  const onChangeHandler = (event) => {
    array[1](event.target.value)

  }

  return (

    <div>
      <QRCodeSVG value="Привет подпишись на мой канал" />
      <input value={array[0]} type="text" onChange={onChangeHandler} />
      <button type='submit' onClick={onClickHender}>Generate</button>
    </div>
  );
}

export default QrCodeGenerator