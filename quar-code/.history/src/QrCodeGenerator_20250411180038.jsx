import {QRCodeSVG} from 'qrcode.react';
import { use, useState } from "react";

const QrCodeGenerator = () => {

  const [value, setValue] = useState('hello')
  const [isShowQr, setIsShowQr] = useState(false)

  const onClickHender = (event) => {
    setIsShowQr(true)
    setValue('');
  }

  const onChangeHandler = (event) => {
    setValue(event.target.value)

  }

  console.log(isShowQr)
  

  return (

    <div>
      {isShowQr ? <QRCodeSVG value={value} /> : null}
      
      <input value={value} type="text" onChange={onChangeHandler} />
      <button type='submit' onClick={onClickHender}>Generate</button>
    </div>
  );
}

export default QrCodeGenerator