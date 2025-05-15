import {QRCodeSVG} from 'qrcode.react';

const QrCodeGenerator = () => {

  const onClickHender = () => {
    
  }

  return (

    <div>
      <QRCodeSVG value="Привет подпишись на мой канал" />
      <input value='sldfjl' type="text" onChange={(e) => console.log(e.target.value)} />
      <button type='submit' onClick={onClickHender}>Generate</button>
    </div>
  );
}

export default QrCodeGenerator