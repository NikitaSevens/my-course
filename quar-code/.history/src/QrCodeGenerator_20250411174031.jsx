import {QRCodeSVG} from 'qrcode.react';

const QrCodeGenerator = () => {

  let test = 'test'

  const onClickHender = (event) => {
  
  }

  const onChangeHandler = (event) => {
    test 
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