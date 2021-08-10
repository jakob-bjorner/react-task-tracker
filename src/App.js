
import Header from "./components/Header"
// functions with hooks tend to be the default now
function App() {
  // cannot use class, must use className
  // cannot use for, must use htmlFor
  // can use empty brackets for no root <> </>

  return (
    <div className="container">
      <Header title="Task Tracker" />
    </div>
  );
}


export default App;
