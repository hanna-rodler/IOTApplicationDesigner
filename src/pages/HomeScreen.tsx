import "reactflow/dist/style.css";
import TopBar from "../components/TopBar";
import "../index.css";

export function HomeScreen() {
  return (
    <div className="react-flow-container">
      <TopBar />
      <div class="flex flex-row mt-4">
        <div>
          <h1>Create your Home</h1>
          <div>
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
          <div>
            <button>Start new project</button>
            <button>Upload Project</button>
          </div>
        </div>
        <div>img</div>
      </div>
    </div>
  );
}
