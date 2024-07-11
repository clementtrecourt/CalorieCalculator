import { RxAvatar } from "react-icons/rx";

const Nav = () => {
  return (
    <div className="flex justify-between items-center mr-5 ml-5">
      <div>
        <h1>Calculateur de Calories</h1>
      </div>
      <div className="flex items-center space-x-4">
        <a href="" className="">
          Accueil
        </a>
        <a href="" className="">
          Tracker de Calorie
        </a>
        <a href="" className="">
          Connexion
        </a>
        <div className="flex items-center">
          <RxAvatar className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default Nav;
