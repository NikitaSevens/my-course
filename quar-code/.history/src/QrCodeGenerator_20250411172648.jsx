import {QRCodeSVG} from 'qrcode.react';

const QrCodeGenerator = () => {
  return (
    <div>
      <QRCodeSVG value="Привет подпишись на мой канал" />
      <input type="text" />
      <button type='submit' onc>Generate</button>
    </div>
  );
}

export default QrCodeGenerator