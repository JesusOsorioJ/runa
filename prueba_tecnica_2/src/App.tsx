import { useState } from "react";
import "./App.css";

type ImageData = {
  no: number;
  color: string;
  text: string;
};

function App() {
  const [image1, setImage1] = useState<ImageData>({
    no: 1,
    color: "#ca3c3c",
    text: "consectetur vehicula fermentum, ipsum justo elit. sapien ut quam sit Pellentesque pharetra fringilla. a nisl adipiscing Fusce Lorem varius, vulputate facilisis. vel,entesque ipsum sapien fe ",
  });
  const [image2, setImage2] = useState<ImageData>({
    no: 1,
    color: "#ca3c3c",
    text: "consectetur vehicula fermentum, ipsum justo elit. sapien ut quam sit Pellentesque pharetra fringilla. a nisl adipiscing Fusce Lorem varius, vulputate facilisis. vel,entesque ipsum sapien fe ",
  });

  const pic1: ImageData[] = [
    {no: 1, color: "#ca3c3c", text: "consectetur vehicula fermentum, ipsum justo elit. sapien ut quam sit Pellentesque pharetra fringilla. a nisl adipiscing Fusce Lorem varius, vulputate facilisis. vel,entesque ipsum sapien fe ",},
    {no: 2, color: "#c0ca3c", text: "varius, facilisis. elit. Pellentesque adipiscing quam fringilla. Lorem ipsum vulputate a justo nisl ac fermentum, ex vehicula sit dictum dolor sapien justo amet, pharetra consectetur vel Fusce",},
    {no: 3, color: "#3cca3e", text: "amet, consectetur vehicula fermentum, ipsum justo elit. sapien ut quam sit Pellentesque pharetra fringilla. a nisl adipiscing Fusce Lorem varius, vulputate facilisis. vel ex dictum dolor ac",},
    {no: 4, color: "#3ccac5", text: "Lorem ac vehicula ex elit. amet, justo Fusce varius, vel ut vulputate dictum fringilla. a justo adipiscing consectetur sit Pellentesque ipsum sapien fermentum, pharetra facilisis. nisl quam dolor",},
    {no: 5, color: "#3c45ca", text: "varius, pharetra facilisis. a ipsum consectetur adipiscing ac sit ex Fusce vehicula amet, vulputate quam sapien Pellentesque ut Lorem fermentum, justo fringilla.",},
  ];

  const pic2: ImageData[] = [
    {no: 21, color: "#ca3c3c", text: "agregar aca un lorem iprun randon de 20 a 40 a cada elemento",},
    {no: 22, color: "#c0ca3c", text: "ac nisl Pellentesque consectetur ipsum vulputate justo dictum fermentum, sapien ut vel quam varius, ex amet, Lorem pharetra Fusce adipiscing justo fringilla. sit dolor facilisis. elit. a vehicula",},
    {no: 23, color: "#3cca3e", text: "Fusce vulputate adipiscing vehicula quam dictum facilisis. nisl Pellentesque fermentum, ut amet, a justo Lorem ipsum ex vel dolor fringilla. justo sapien varius,",},
    {no: 24, color: "#3ccac5", text: "sapien justo Pellentesque Fusce sit ipsum amet, vulputate elit. ex vehicula dictum ac ut pharetra Lorem a varius, adipiscing vel consectetur justo quam",},
    {no: 25, color: "#3c45ca", text: "ac justo ut vel Fusce fringilla. vehicula Pellentesque ex pharetra dictum sapien sit vulputate a facilisis. consectetur elit. varius, fermentum, ipsum nisl",},
    {no: 26, color: "#a93cca", text: "Fusce a Lorem adipiscing nisl pharetra vulputate consectetur sapien dolor fringilla. Pellentesque fermentum, amet, dictum vehicula quam ex ut facilisis. vel sit justo ipsum justo varius,",},
    {no: 27, color: "#1b6e22", text: "ex justo nisl pharetra vulputate Fusce vel fermentum, dictum sit sapien Pellentesque ipsum Lorem fringilla. ac amet, varius, quam justo facilisis. ut dolor consectetur a vehicula elit.",},
    {no: 28, color: "#6e271b", text: "vehicula elit. nisl sit ac vel pharetra amet, ut adipiscing justo Pellentesque quam ipsum vulputate Fusce sapien a dictum facilisis. justo fringilla. fermentum,",},
  ];

  return (
    <div className="flex flex-col gap-3 items-start">
      <Target
        title="Gallery 1: Bog snorkelling"
        pic={pic1}
        setImage={setImage1}
        image={image1}
      />
      <Target
        title="Gallery 2: Your perspective on the world"
        pic={pic2}
        setImage={setImage2}
        image={image2}
      />
    </div>
  );
}

type TargetProps = {
  title: string;
  pic: ImageData[];
  setImage: (image: ImageData) => void;
  image: ImageData;
};

const Target = ({ title, pic, setImage, image }: TargetProps) => {
  return (
    <div className="flex flex-col gap-3 items-start">
      <p className="text-xl font-bold">{title}</p>
      <div>
        <div className="flex justify-start w-full gap-1">
          {pic.map((d, i) => (
            <button
              key={i}
              onClick={() => setImage(d)}
              className="w-10"
              style={{ backgroundColor: d.color }}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div
          className="flex flex-col gap-2 items-center p-4 h-[400px] w-[400px]"
          style={{ backgroundColor: image.color }}
        >
          <img src={`./image/pic${image.no}.jpg`} alt="" className="h-60" />
          <p className="p-4 bg-slate-300 h-full text-justify text-sm">
            {image.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
