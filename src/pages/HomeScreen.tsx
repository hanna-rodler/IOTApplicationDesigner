import "reactflow/dist/style.css";
import TopBar from "../components/TopBar";
import "../index.css";
import { GoPlus, GoFileDirectory } from "react-icons/go";
import UploadBtn from '../components/UploadBtn'; 
import {NavLink} from "react-router-dom";

export function HomeScreen() {
  return (
    <div className="lg:h-screen">
      <TopBar/>
      <div className="lg:h-screen -mt-topBar flex lg:items-center lg:justify-evenly justify-center lg:w-screen lg:flex-row flex-col">
        <div className="lg:w-5/12 order-2 lg:order-first lg:mt-0 mt-12  mx-10 lg:mb-0 mb-10 sm:mx-14 lg:mx-0">
          <h1 className="text-center lg:text-left">Create your Home</h1>
          <div className="text-center lg:text-left">
            Lorem ipsum ... ein möglicher Erklärtext zu IoT Configurator. Built
            with SNode. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
            sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
            aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
            duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
            ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
            eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
            gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </div>
          <div className="lg:mt-14 mt-12 flex lg:justify-start justify-center">
            <NavLink to="/setup" className="secondaryBtn sm:mr-6 min-w-14">
              <GoPlus className="iconBtn" />
              Start new project
            </NavLink>
            <NavLink to="/projects" className="secondaryBtn sm:mr-6 min-w-14">
              <GoFileDirectory className="iconBtn" />
              Open project
            </NavLink>
            <UploadBtn />
          </div>
        </div>
        <div className="lg:w-1/3 lg:order-2 order-first w-full">
          <img
            src="/HomeScreenPic.jfif"
            alt=""
            className="lg:rounded-2xl hidden lg:flex md:max-h-128 max-h-96 object-cover"
          />
          <img
            src="/HomeScreenSmall.jpg"
            alt=""
            className="lg:rounded-2xl lg:hidden object-cover max-h-112 w-full"
          />
        </div>
      </div>
    </div>
  );
}
