import { useRef, useEffect, useState } from "react";
import gnomeImg from './assets/gnome.png'
function App() {
  const [lightXY, setlightXY] = useState({ x: 0, y: 0 });
  const [BoxXY, setBoxXY] = useState({ x: 0, y: 0 });
  const [boxshadow, setboxshadow] = useState("0px 5px 5px 10px black");
  const [lightPos, setlightPos] = useState({ x: 50, y: 50 });
  const [ActiveDrag, setActiveDrag] = useState(false);
  const lightRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    if (lightRef.current) {
      const LightRect = lightRef.current.getBoundingClientRect();
      setlightXY({ x: LightRect.x, y: LightRect.y });
    }
    if (boxRef.current) {
      const BoxRect = boxRef.current.getBoundingClientRect();
      setBoxXY({ x: BoxRect.x, y: BoxRect.y });
    }
  }, [lightXY])
  
  useEffect(() => {
    const updatePosition = (event) => {
      if (!ActiveDrag) {
        return;
      }
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;
      setlightPos({ x: clientX - 30, y: clientY - 30 });
    };

   

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("touchmove", updatePosition);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("touchmove", updatePosition);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightXY, boxshadow]);

  useEffect(() => {
    const ShadowHandler = () => {
      let shadowX = 0;
      let shadowY = 0;
      let shadowLengthX;
      let shadowLengthY;

      if (lightXY.x >= BoxXY.x) {
        shadowLengthX = (lightXY.x - BoxXY.x) / 10;
        shadowX = -shadowLengthX;
      } else {
        shadowLengthX = (BoxXY.x - lightXY.x) / 10;
        shadowX = shadowLengthX;
      }
      if (lightXY.y > BoxXY.y) {
        shadowLengthY = (lightXY.y - BoxXY.y) / 10;
        shadowY = -shadowLengthY;
      } else {
        shadowLengthY = (BoxXY.y - lightXY.y) / 10;
        shadowY = shadowLengthY;
      }

      setboxshadow(`${shadowX}px ${shadowY}px 15px 7px black`);
    };

    ShadowHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightXY, lightPos]);

  return (
    <div className="bg-teal-800 relative flex flex-col h-screen min-h-[500px]: items-center justify-center">
      <div
        ref={lightRef}
        onMouseDown={() => {
          setActiveDrag(true);
        }}
        onMouseUp={() => {
          setActiveDrag(false);
          document.body.style.overflow = "";
        }}
        onTouchStart={() => {
          setActiveDrag(true);
          document.body.style.overflow = "hidden";
        }}
        onTouchEnd={() => {
          setActiveDrag(false);
          document.body.style.overflow = "";
        }}
        style={{
          left: `${lightPos.x}px`,
          top: `${lightPos.y}px`,
          boxShadow: "0px 0px 20px 5px white",
        }}
        className="absolute z-50 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-200 via-indigo-200 to-white select-none flex items-center justify-center  rounded-full  w-16 h-16"
      ></div>

      <div
        ref={boxRef}
        style={{ boxShadow: boxshadow }}
        className="z-40 bg-gray-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100  w-20 h-20 flex items-center justify-center  border-zinc-100/50"
      ></div>
      <span className="z-0 translate-x-[40px] w-6 h-6 ">
        <img className="w-full h-full" src={gnomeImg} alt="gnome" />
      </span>
    </div>
  );
}

export default App;
