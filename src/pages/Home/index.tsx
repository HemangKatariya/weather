import React, { useEffect, useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import axios, { AxiosResponse } from "axios";
import Button from "@mui/material/Button";

interface WeatherData {
  name: string;
  weather: { description: string }[];
  wind: { speed: number };
}
const Home: React.FC = () => {
  const [data, setData] = useState<WeatherData>();
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const HandleSubmit = () => {
    axios
      .get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=d022ad0ebfc92ab78aec2593b1607fc8`
      )
      .then((response: AxiosResponse<WeatherData>) => {
        console.log(response);
        setData(response.data);
        setError(null);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError("City not found. Please enter correct City name.");
      });
  };

  // console.log(data);
  return (
    <>
      <div className="container-fluid" style={{ height: "100vh" }}>
        <NavigationBar />
        <div className="container card p-3 mt-5">
          <div className="row d-flex justify-content-center text-center align-items-center mt-5 mb-5">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="glass2 d-flex justify-content-center align-items-center text-center mt-5">
                <div
                  className="bord d-flex"
                  style={{ display: "flex", gap: "10px" }}
                >
                  <input
                    className="effect-2"
                    type="text"
                    placeholder="Search City"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <span className="focus-border"></span>
                  <Button
                    variant="contained"
                    onClick={HandleSubmit}
                    className="mb-2"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="card p-5">
                {name === "" ? (
                  <div>Please enter a city to check the weather</div>
                ) : error ? (
                  <div>{error}</div>
                ) : (
                  data && (
                    <div>
                      <div>City : {data.name}</div>
                      <div>Weather : {data.weather[0].description}</div>
                      <div>Wind Speed : {data.wind.speed}</div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
