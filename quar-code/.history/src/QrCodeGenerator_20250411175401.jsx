import {QRCodeSVG} from 'qrcode.react';
import { use, useState } from "react";

const QrCodeGenerator = () => {

  const [value, setValue] = useState('hello')
  const [isShowQr, setIsShowQr] = useState('false')

  const onClickHender = (event) => {
  
  }


  const onChangeHandler = (event) => {
    setValue(event.target.value)

  }

  console.log(value)
  

  return (

    <div>
      <QRCodeSVG value="Привет подпишись на мой канал" />
      <input value={value} type="text" onChange={onChangeHandler} />
      <button type='submit' onClick={onClickHender}>Generate</button>
    </div>
  );
}

export default QrCodeGenerator