import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Formik, Form, Field } from "formik";
import "./header.css";
import "./content.css";
function App() {
  const [photos, setPhotos] = useState([]);
  return (
    <div className="App">
      <header>
        <Formik
          initialValues={{ search: "" }}
          onSubmit={async (values) => {
            // llamar a API
            const response = await fetch(
              `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
              {
                headers: {
                  Authorization:
                    "Client-ID thMEe1jLKusX-1GsTgk6mxgyso9YGga-GjGufbs3KXE",
                },
              }
            );
            const data = await response.json();
            setPhotos(data.results);
            console.log("valores de retorno submit", photos);
          }}
        >
          <Form>
            <Field name="search" />
          </Form>
        </Formik>
      </header>

      <div className="container">
        <div className="center">
          {photos.map((photo) => (
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular} />
              <p>{[photo.description, photo.alt_description].join(" - ")}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
