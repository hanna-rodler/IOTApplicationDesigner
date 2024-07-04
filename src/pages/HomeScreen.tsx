import "reactflow/dist/style.css";
import TopBar from "../components/TopBar";
import "../index.css";
import { GoPlus, GoFileDirectory } from "react-icons/go";
import UploadBtn from '../components/UploadBtn';
import {NavLink} from "react-router-dom";
import React from "react";

export function HomeScreen() {
  return (
    <div className="lg:h-screen">
      <TopBar/>
      <div className="lg:h-screen -mt-topBar flex lg:items-center lg:justify-evenly justify-center lg:w-screen lg:flex-row flex-col">
        <div className="lg:w-5/12 order-2 lg:order-first lg:mt-0 mt-12  mx-10 lg:mb-0 mb-10 sm:mx-14 lg:mx-0">
          <h1 className="text-center lg:text-left">Create your Home</h1>
          <div className="text-center lg:text-left">
              Welcome to our Internet of Things Configurator, your essential tool for setting up and managing
              IoT networks effortlessly. Our configurator utilizes JSON format to seamlessly configure nodes,
              ensuring compatibility and ease of integration across various devices and platforms. Once
              configured, you can conveniently export MQTT JSON, enabling smooth communication and data
              exchange within your IoT ecosystem. Whether you're a developer, engineer, or IoT enthusiast, our
              tool empowers you to streamline configuration processes and maximize the potential of your
              connected devices. Dive into the future of IoT configuration with us today!
          </div>
          <div className="lg:mt-14 mt-12 flex lg:justify-start justify-center max-1515:flex-wrap gap-6 max-633:gap-y-0 max-475:gap-y-3">
            <NavLink to="/setup" className="secondaryBtn min-w-14">
              <GoPlus className="iconBtn" />
              Start new project
            </NavLink>
            <NavLink to="/projects" className="secondaryBtn min-w-14">
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
