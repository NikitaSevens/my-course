import {QRCodeSVG} from 'qrcode.react';
import { use, useState } from "react";

const QrCodeGenerator = () => {

  const array = useState('hello')

  const onClickHender = (event) => {
  
  }

  const onChangeHandler = (event) => {
    arr
    test = event.target.value
  }

  return (

    <div>
      <QRCodeSVG value="Привет подпишись на мой канал" />
      <input value={test} type="text" onChange={onChangeHandler} />
      <button type='submit' onClick={onClickHender}>Generate</button>
    </div>
  );
}

export default QrCodeGenerator