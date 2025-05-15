import {QRCodeSVG} from 'qrcode.react';

const QrCodeGenerator = () => {
  return (
    <div>
      <QRCodeSVG value="https://reactjs.org/" />,
    </div>
  );
}

export default QrCodeGenerator