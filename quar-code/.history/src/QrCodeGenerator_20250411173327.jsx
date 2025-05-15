import {QRCodeSVG} from 'qrcode.react';

const QrCodeGenerator = () => {

  const onClickHender = () => {
    
  }

  const onChangeHandler = () => {
    console.log('lsd')
  }

  return (

    <div>
      <QRCodeSVG value="Привет подпишись на мой канал" />
      <input value={} type="text" onChange={onChangeHandler} />
      <button type='submit' onClick={onClickHender}>Generate</button>
    </div>
  );
}

export default QrCodeGenerator