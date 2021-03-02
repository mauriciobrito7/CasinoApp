import { useState } from "react";
import Header from "./components/Header/Header";
import Layout from "./components/AppLayout/AppLayout";
import Footer from "./components/Footer/Footer";
import UserState from "./context/User/UserState";
import "./App.scss";
import Button from "@material-ui/core/Button";
import Banner from "./assets/img/casino.jpg";
import Modal from "@material-ui/core/Modal";
import ContentModal from "./components/ContentModal/ContentModal";
import Table from "./components/Table/Table";

function App() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      <UserState>
        <Header />
        <Layout>
          <main className="main">
            <section className="banner">
              <div
                style={{ backgroundImage: `url('${Banner}')` }}
                className="banner-img"
              ></div>
              <div className="banner-img__gradient" />
              <h1 className="banner-title">Virtual Game</h1>
              <Button onClick={handleOpen} className="banner-button">
                Try it
              </Button>
            </section>
            <h1 className="main-title">Results</h1>
            <Table />
            <Modal open={open} onClose={handleClose}>
              {<ContentModal handleClose={handleClose} />}
            </Modal>
          </main>
        </Layout>
        <Footer />
      </UserState>
    </div>
  );
}

export default App;
