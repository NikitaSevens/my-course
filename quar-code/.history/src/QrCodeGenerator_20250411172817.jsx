import {QRCodeSVG} from 'qrcode.react';

const QrCodeGenerator = () => {

  const onClickHender = () => {
    
  }

  return (

    <div>
      <QRCodeSVG value="Привет подпишись на мой канал" />
      <input type="text" />
      <button type='submit' onClick={onClickHender}>Generate</button>
    </div>
  );
}

export default QrCodeGenerator