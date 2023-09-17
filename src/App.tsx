import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ImageBox from './components/ImageBox';

function App() {
  const inpRef = useRef<HTMLInputElement>(null);
  const [imageList, setImageList] = useState<string[]>([]);
  console.log(imageList);
  return (
    <div className="App">
      <div className='container'>
        <div className={'gallery-box ' + (imageList.length > 0 && 'row')}>
          {
            imageList.length === 0 &&
            <div className='text-center'>
              이미지가 없습니다.<br/>
              이미지를 추가해주세요.          
            </div>
          }
          <input type='file' ref={inpRef} onChange={(event) => {
            const file = event.currentTarget.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onloadend = (event) => {
                setImageList(prev => [...prev, event.target?.result as string]);
              };
            }
          }} />
          {
            imageList.map((path, index) => <ImageBox key={path + index} src={path}/>)
          }
          <div className='plus-box' onClick={() => {
            inpRef.current?.click()
          }}>
            +
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
