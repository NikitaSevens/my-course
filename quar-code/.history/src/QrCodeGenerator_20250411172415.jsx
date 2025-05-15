import {QRCodeSVG} from 'qrcode.react';

const QrCodeGenerator = () => {
  return (
    <div>
      <QRCodeSVG value="Привет подпишись " />,
    </div>
  );
}

export default QrCodeGenerator