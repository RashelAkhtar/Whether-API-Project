import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

const url = "https://api.openweathermap.org/data/2.5/weather";

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    temp_data: null,
    pressure_data: null,
    humidity_data: null,
  });
});

app.post("/submit", async (req, res) => {
  const longitude = req.body["longitude"];
  const latitude = req.body["latitude"];
  const apikey = "0c2fe2558ee0b8f0b67f54c10100e58c";

  try {
    const response = await axios.get(
      `${url}?lat=${latitude}&lon=${longitude}&appid=${apikey}`
    );
    console.log(response);

    const temp = JSON.stringify(response.data.main.temp, null, 2);
    const pressure = JSON.stringify(response.data.main.pressure, null, 2);
    const humidity = JSON.stringify(response.data.main.humidity, null, 2);

    res.render("index.ejs", {
      temp_data: temp,
      pressure_data: pressure,
      humidity_data: humidity,
    });
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
