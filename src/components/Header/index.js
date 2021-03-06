import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

import utils from "../../services/utils";

const Header = ({ text = {}, compare = false }) => {
  return (
    <header className="masthead text-white text-center">
      <div className="overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-xl-9 mx-auto">
            <h1 className="mb-5">
              O que as pessoas estão dizendo sobre empresas, produtos ou
              serviços
            </h1>
          </div>
          <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
            <div className="form-row">
              {compare ? (
                <CompareButton text={text} />
              ) : (
                <SentimentButton text={text} />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const SentimentButton = ({ text }) => {
  const input = useRef(null);

  const history = useHistory();

  useEffect(() => {
    input.current.value = text.replace(/\-+/g, " ");
  }, [input]);

  const handleSubmit = () => {
    let { value } = input.current;
    if (!!value) {
      value = utils.slugify(value);
      history.push(`/sentiment-analysis/${value}`);
    }
  };

  const handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      handleSubmit();
    }
  };

  return (
    <>
      <div className="col-12 col-md-9 mb-2 mb-md-0">
        <input
          ref={input}
          onKeyUp={handleKeyUp}
          type="text"
          className="form-control form-control-lg"
          placeholder="Pesquisar por..."
          required
        />
      </div>
      <div className="col-12 col-md-3">
        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-block btn-lg btn-primary"
        >
          Buscar
        </button>
      </div>
    </>
  );
};

const CompareButton = ({ text }) => {
  const inputA = useRef(null);
  const inputB = useRef(null);

  const history = useHistory();

  useEffect(() => {
    if (!!text.a && !!text.b) {
      inputA.current.value = text.a.replace(/\-+/g, " ");
      inputB.current.value = text.b.replace(/\-+/g, " ");
    }
  }, [text.a, text.b]);

  const handleSubmit = () => {
    let valueA = utils.slugify(inputA.current.value);
    let valueB = utils.slugify(inputB.current.value);

    if (!!valueA && !!valueB) {
      history.push(`/compare/${valueA}/${valueB}`);
    }
  };

  const handleKeyUp = ({ keyCode }) => {
    if (keyCode == 13) {
      handleSubmit();
    }
  };

  return (
    <>
      <div className="col-6 col-md-5 mb-2 mb-md-0">
        <input
          ref={inputA}
          onKeyUp={handleKeyUp}
          type="text"
          className="form-control form-control-lg"
          placeholder="Pesquisar por..."
          required
        />
      </div>
      <div className="col-6 col-md-5 mb-2 mb-md-0">
        <input
          ref={inputB}
          onKeyUp={handleKeyUp}
          type="text"
          className="form-control form-control-lg"
          placeholder="Pesquisar por..."
          required
        />
      </div>
      <div className="col-12 col-md-2">
        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-block btn-lg btn-primary"
        >
          Buscar
        </button>
      </div>
    </>
  );
};

export default Header;
