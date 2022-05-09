import { useState, useEffect } from "react";
import "./App.scss";
import data from "/src/data.js";

function App() {
  const CountDown = ({ time }) => {
    const [d, setD] = useState(0);
    const [h, setH] = useState(0);
    const [m, setM] = useState(0);
    const [s, setS] = useState(0);
    const [ms, setMs] = useState(0);
    let timer = null; // 定时器
    useEffect(() => {
      setCountDown(time);
      return () => {
        clearInterval(timer);
      };
    }, []);
    const setCountDown = (time) => {
      timer = setInterval(() => {
        let differTime = (time - Date.now()) / 1000;
        let h = 0;
        let m = 0;
        let s = 0;
        let d = 0;
        let ms = 0;
        if (differTime > 0) {
          d = Math.floor(differTime / 86400);
          d = Math.floor(differTime / 86400);
          h = Math.floor(differTime / 3600) % 24;
          m = (Math.floor(differTime % 3600) / 60).toFixed(0);
          s = Math.floor(differTime % 60).toFixed(0);
          ms = Math.floor((differTime * 10) % 6).toFixed(0);
          setD(d);
          setH(h);
          setM(m);
          setS(s);
          setMs(ms);
        } else {
          clearInterval(timer); // 清空定时器
        }
      }, 100);
    };
    return (
      <span>
        {d > 1 ? (
          <span>
            {d > 10 ? d : "0" + d}天{h > 10 ? h : "0" + h}小时
          </span>
        ) : (
          <span>
            {h > 10 ? h : "0" + h}:{m > 10 ? m : "0" + m}:{s > 10 ? s : "0" + s}
            .{ms}
          </span>
        )}
      </span>
    );
  };
  return (
    <div className="App">
      <>
        {data.map((item) => {
          return (
            <div className="main" key={item.wareId}>
              <div className="left">
                <img src={item.imageurl} alt="" />
                <div className="time">
                  {item.startTimeMills - Date.now() > 86400 ? (
                    <CountDown time={item.startTimeMills}></CountDown>
                  ) : (
                    <CountDown time={item.startTimeMills}></CountDown>
                  )}
                </div>
              </div>
              <div className="right">
                <div className="top">
                  <div className="topone">{item.hname}</div>
                  <div className="goodsName">{item.wname}</div>
                </div>
                <div className="price">
                  <div className="nowPrice">
                    当前价￥{item.miaoShaPrice}
                    <span className="oldPrice">￥{item.oldPrice}</span>
                  </div>
                  <button>
                    <a href="https://www.baidu.com/">去出价</a>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    </div>
  );
}

export default App;
