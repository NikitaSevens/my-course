import {QRCodeSVG} from 'qrcode.react';

const QrCodeGenerator = () => {



  const onClickHender = (event) => {
  
  }

  const onChangeHandler = (event) => {
    console.log(event.target.value)  
  }

  return (

    <div>
      <QRCodeSVG value="Привет подпишись на мой канал" />
      <input  type="text" onChange={onChangeHandler} />
      <button type='submit' onClick={onClickHender}>Generate</button>
    </div>
  );
}

export default QrCodeGenerator